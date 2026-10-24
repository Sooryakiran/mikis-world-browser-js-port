package web;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSFunctor;
import org.teavm.jso.JSObject;

public final class Browser {
    @JSFunctor public interface Tick extends JSObject { void run(); }
    @JSFunctor public interface Key extends JSObject { void run(int code, boolean down); }
    @JSFunctor public interface Action extends JSObject { void run(int index); }
    @JSFunctor public interface Text extends JSObject { void run(int index, String value); }
    @JSFunctor public interface Inspect extends JSObject { String get(); }

    @JSBody(params = {"tick", "key", "action", "select", "text", "pause", "resume", "inspect"},
        script = "mikiPlatform.bind(tick,key,action,select,text,pause,resume,inspect);")
    public static native void bind(Tick tick, Key key, Action action, Action select, Text text, Tick pause, Tick resume, Inspect inspect);

    @JSBody(script = "return mikiPlatform.clock;")
    private static native double milliseconds();
    public static long now() { return (long) milliseconds(); }

    @JSBody(params = "name", script = "return mikiPlatform.resourceLength(name);")
    public static native int resourceLength(String name);
    @JSBody(params = {"name", "index"}, script = "return mikiPlatform.resourceByte(name,index);")
    public static native int resourceByte(String name, int index);

    @JSBody(params = "name", script = "return mikiPlatform.image(name);")
    public static native int image(String name);
    @JSBody(params = {"width", "height"}, script = "return mikiPlatform.surface(width,height);")
    public static native int surface(int width, int height);
    @JSBody(params = "handle", script = "return mikiPlatform.surfaces[handle].width;")
    public static native int width(int handle);
    @JSBody(params = "handle", script = "return mikiPlatform.surfaces[handle].height;")
    public static native int height(int handle);
    @JSBody(params = {"target", "source", "x", "y", "cx", "cy", "cw", "ch"},
        script = "mikiPlatform.drawImage(target,source,x,y,cx,cy,cw,ch);")
    public static native void drawImage(int target, int source, int x, int y, int cx, int cy, int cw, int ch);
    @JSBody(params = {"target", "x", "y", "w", "h", "color", "fill", "cx", "cy", "cw", "ch"},
        script = "mikiPlatform.rect(target,x,y,w,h,color,fill,cx,cy,cw,ch);")
    public static native void rect(int target, int x, int y, int w, int h, int color, boolean fill, int cx, int cy, int cw, int ch);
    @JSBody(params = {"target", "text", "x", "y", "anchor", "font", "color", "cx", "cy", "cw", "ch"},
        script = "mikiPlatform.text(target,text,x,y,anchor,font,color,cx,cy,cw,ch);")
    public static native void text(int target, String text, int x, int y, int anchor, int font, int color, int cx, int cy, int cw, int ch);
    @JSBody(params = {"text", "font"}, script = "return mikiPlatform.measure(text,font);")
    public static native int measure(String text, int font);

    @JSBody(params = {"title", "kind"}, script = "mikiPlatform.beginScreen(title,kind);")
    public static native void beginScreen(String title, int kind);
    @JSBody(params = {"label", "index"}, script = "mikiPlatform.command(label,index);")
    public static native void command(String label, int index);
    @JSBody(params = {"label", "index"}, script = "mikiPlatform.listItem(label,index);")
    public static native void listItem(String label, int index);
    @JSBody(params = "text", script = "mikiPlatform.paragraph(text);")
    public static native void paragraph(String text);
    @JSBody(params = {"label", "text", "max", "index"}, script = "mikiPlatform.textField(label,text,max,index);")
    public static native void textField(String label, String text, int max, int index);

    @JSBody(params = "name", script = "return mikiPlatform.storeExists(name);")
    public static native boolean storeExists(String name);
    @JSBody(params = "name", script = "mikiPlatform.storeCreate(name);")
    public static native void storeCreate(String name);
    @JSBody(params = "name", script = "return mikiPlatform.storeCount(name);")
    public static native int storeCount(String name);
    @JSBody(params = {"name", "id"}, script = "return mikiPlatform.storeRead(name,id);")
    public static native String storeRead(String name, int id);
    @JSBody(params = {"name", "id", "data"}, script = "mikiPlatform.storeWrite(name,id,data);")
    public static native void storeWrite(String name, int id, String data);
    @JSBody(params = "name", script = "mikiPlatform.storeDelete(name);")
    public static native void storeDelete(String name);

    @JSBody(params = "length", script = "return mikiPlatform.newSound(length);")
    public static native int newSound(int length);
    @JSBody(params = {"sound", "index", "value"}, script = "mikiPlatform.sounds[sound][index]=value;")
    public static native void soundByte(int sound, int index, int value);
    @JSBody(params = {"sound", "count"}, script = "mikiPlatform.playSound(sound,count);")
    public static native void playSound(int sound, int count);
    @JSBody(params = "sound", script = "mikiPlatform.stopSound(sound);")
    public static native void stopSound(int sound);
    @JSBody(params = "duration", script = "mikiPlatform.vibrate(duration);")
    public static native void vibrate(int duration);
    @JSBody(script = "mikiPlatform.destroyed();")
    public static native void destroyed();
}
