import java.nio.file.Files;
import java.nio.file.Path;
import java.security.MessageDigest;
import java.util.HexFormat;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.jar.JarFile;
import org.objectweb.asm.ClassReader;
import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.Opcodes;
import org.objectweb.asm.tree.*;

public final class PrepareOriginal implements Opcodes {
    public static void main(String[] args) throws Exception {
        Path input = Path.of(args[0]), classes = Path.of(args[1]), assets = Path.of(args[2]);
        Files.createDirectories(classes);
        Files.createDirectories(assets);
        Map<String, String> hashes = new LinkedHashMap<>();
        int loops = 0, threads = 0, resources = 0;
        try (JarFile jar = new JarFile(input.toFile())) {
            var entries = jar.entries();
            while (entries.hasMoreElements()) {
                var entry = entries.nextElement();
                if (entry.isDirectory() || entry.getName().contains("/")) continue;
                byte[] bytes = jar.getInputStream(entry).readAllBytes();
                String name = entry.getName();
                if (!name.endsWith(".class")) {
                    Files.write(assets.resolve(name), bytes);
                    hashes.put(name, HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(bytes)));
                    continue;
                }
                ClassNode node = new ClassNode();
                new ClassReader(bytes).accept(node, 0);
                for (MethodNode method : node.methods) {
                    if (node.name.equals("GameMIDlet") && method.name.equals("run") && method.desc.equals("()V")) {
                        AbstractInsnNode first = method.instructions.getFirst();
                        while (first.getOpcode() < 0) first = first.getNext();
                        if (!(first instanceof JumpInsnNode) || first.getOpcode() != GOTO) {
                            throw new IllegalStateException("Original MIDlet loop entry changed");
                        }
                        method.instructions.remove(first);
                        for (AbstractInsnNode instruction : method.instructions.toArray()) {
                            if (instruction instanceof JumpInsnNode jump && jump.getOpcode() == IFEQ &&
                                method.instructions.indexOf(jump.label) < method.instructions.indexOf(jump)) {
                                LabelNode cleanup = new LabelNode();
                                InsnList once = new InsnList();
                                once.add(new JumpInsnNode(IFNE, cleanup));
                                once.add(new InsnNode(RETURN));
                                once.add(cleanup);
                                method.instructions.insertBefore(jump, once);
                                method.instructions.remove(jump);
                                loops++;
                            }
                        }
                    }
                    for (AbstractInsnNode instruction : method.instructions.toArray()) {
                        if (!(instruction instanceof MethodInsnNode call)) continue;
                        if (call.owner.equals("java/lang/Thread") && call.name.equals("start")) {
                            method.instructions.set(call, new InsnNode(POP));
                            threads++;
                        } else if (call.owner.equals("java/lang/Thread") && call.name.equals("sleep") && call.desc.equals("(J)V")) {
                            method.instructions.set(call, new InsnNode(POP2));
                        } else if (call.owner.equals("java/lang/Thread") && call.name.equals("yield")) {
                            method.instructions.remove(call);
                        } else if (call.owner.equals("java/lang/Class") && call.name.equals("getResourceAsStream")) {
                            method.instructions.set(call, new MethodInsnNode(INVOKESTATIC, "web/Resources", "open",
                                "(Ljava/lang/Class;Ljava/lang/String;)Ljava/io/InputStream;", false));
                            resources++;
                        } else if (call.owner.equals("java/lang/System") && call.name.equals("currentTimeMillis")) {
                            method.instructions.set(call, new MethodInsnNode(INVOKESTATIC, "web/Browser", "now", "()J", false));
                        }
                    }
                }
                if (node.name.equals("GameMIDlet")) {
                    MethodNode getter = new MethodNode(ACC_PUBLIC, "webGame", "()Ld;", null, null);
                    getter.visitVarInsn(ALOAD, 0);
                    getter.visitFieldInsn(GETFIELD, "GameMIDlet", "new", "Ld;");
                    getter.visitInsn(ARETURN);
                    node.methods.add(getter);
                } else if (node.name.equals("d")) {
                    addDiagnostics(node);
                }
                ClassWriter writer = new ClassWriter(ClassWriter.COMPUTE_MAXS);
                node.accept(writer);
                Files.write(classes.resolve(name), writer.toByteArray());
            }
        }
        if (loops != 1 || threads != 1 || resources != 7) {
            throw new IllegalStateException("Unexpected original platform call counts: " + loops + "/" + threads + "/" + resources);
        }
        StringBuilder manifest = new StringBuilder("{\n  \"jarSha256\": \"")
            .append(HexFormat.of().formatHex(MessageDigest.getInstance("SHA-256").digest(Files.readAllBytes(input))))
            .append("\",\n  \"resources\": {\n");
        int index = 0;
        for (var entry : hashes.entrySet()) {
            if (index++ > 0) manifest.append(",\n");
            manifest.append("    \"").append(entry.getKey()).append("\": \"").append(entry.getValue()).append("\"");
        }
        Files.writeString(assets.resolve("manifest.json"), manifest.append("\n  }\n}\n").toString());
        System.out.println("Prepared original game: " + hashes.size() + " byte-identical resources; platform-only bytecode adaptations.");
    }

    private static void addDiagnostics(ClassNode node) {
        String[] fields = {"cK", "aO", "aM", "a8", "a1", "c0", "H", "bS", "bR", "b1", "cQ"};
        MethodNode state = new MethodNode(ACC_PUBLIC, "webState", "()[I", null, null);
        state.visitLdcInsn(fields.length + 3);
        state.visitIntInsn(NEWARRAY, T_INT);
        for (int i = 0; i < fields.length + 3; i++) {
            state.visitInsn(DUP);
            state.visitLdcInsn(i);
            state.visitVarInsn(ALOAD, 0);
            if (i < fields.length) state.visitFieldInsn(GETFIELD, "d", fields[i], "I");
            else {
                state.visitFieldInsn(GETFIELD, "d", "bd", "La;");
                if (i == fields.length) state.visitMethodInsn(INVOKEVIRTUAL, "a", "do", "()I", false);
                else if (i == fields.length + 1) state.visitMethodInsn(INVOKEVIRTUAL, "a", "if", "()I", false);
                else {
                    state.visitMethodInsn(INVOKEVIRTUAL, "a", "for", "()[B", false);
                    state.visitMethodInsn(INVOKESTATIC, "java/util/Arrays", "hashCode", "([B)I", false);
                }
            }
            state.visitInsn(IASTORE);
        }
        state.visitInsn(ARETURN);
        node.methods.add(state);
    }
}
