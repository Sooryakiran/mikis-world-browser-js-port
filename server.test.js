import { test } from "node:test";
import assert from "node:assert/strict";
import { execFile, spawn } from "node:child_process";
import { once } from "node:events";
import { copyFile, mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

async function fixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), "mikis-world-server-"));
  const children = [];
  t.after(async () => {
    for (const child of children) {
      if (child.exitCode === null && child.signalCode === null) {
        const exited = once(child, "exit");
        child.kill();
        await exited;
      }
    }
    await rm(root, { recursive: true, force: true });
  });
  await copyFile(new URL("./server.mjs", import.meta.url), path.join(root, "server.mjs"));
  const files = {
    "index.html": "Source title",
    "app.js": "Source app",
    "public/generated/game.js": "Source game",
    "public/original/manifest.json": '{"source":true}',
    "public/original/en": "Source dialogue",
    "public/original/missing.bin": "Do not fall back to this",
    "dist/index.html": "Packaged title",
    "dist/app.js": "Packaged app",
    "dist/generated/game.js": "Packaged game",
    "dist/original/manifest.json": '{"packaged":true}',
    "dist/original/en": "Packaged dialogue",
    "dist/original/coin.ott": Buffer.from([2, 74, 0, 255]),
    "dist/licence.txt": "Packaged license",
  };
  await Promise.all(Object.entries(files).map(async ([name, contents]) => {
    const file = path.join(root, name);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, contents);
  }));
  return {
    root,
    start(preview) {
      const child = spawn(process.execPath, ["server.mjs", ...(preview ? ["--preview"] : [])], {
        cwd: root, env: { ...process.env, PORT: "0" }, stdio: ["ignore", "pipe", "pipe"],
      });
      children.push(child);
      return new Promise((resolve, reject) => {
        let output = "", errors = "";
        child.once("error", reject);
        child.stderr.on("data", data => { errors += data; });
        child.once("exit", code => reject(new Error(`Server exited (${code}): ${errors}`)));
        child.stdout.on("data", data => {
          output += data;
          const match = output.match(/http:\/\/127\.0\.0\.1:\d+/);
          if (match) resolve(match[0]);
        });
      });
    },
  };
}

test("preview serves packaged files and never falls back to source files", { timeout: 10000 }, async t => {
  const site = await fixture(t);
  const origin = await site.start(true);
  for (const [url, expected] of [
    ["/", "Packaged title"], ["/app.js", "Packaged app"],
    ["/generated/game.js", "Packaged game"], ["/original/en", "Packaged dialogue"],
    ["/licence.txt", "Packaged license"],
  ]) {
    const response = await fetch(origin + url);
    assert.equal(response.status, 200, url);
    assert.equal(await response.text(), expected, url);
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  }
  assert.deepEqual(await (await fetch(origin + "/original/manifest.json")).json(), { packaged: true });
  assert.match((await fetch(origin + "/generated/game.js")).headers.get("content-type"), /javascript/);
  const tone = await fetch(origin + "/original/coin.ott");
  assert.equal(tone.headers.get("content-type"), "application/octet-stream");
  assert.deepEqual(Buffer.from(await tone.arrayBuffer()), Buffer.from([2, 74, 0, 255]));
  for (const url of ["/original/missing.bin", "/server.mjs", "/public/generated/game.js"]) {
    assert.equal((await fetch(origin + url)).status, 404, url);
  }
  assert.equal((await fetch(origin + "/%ZZ")).status, 400);
});

test("development serving retains the original source/public routing", { timeout: 10000 }, async t => {
  const site = await fixture(t);
  const origin = await site.start(false);
  for (const [url, expected] of [
    ["/", "Source title"], ["/app.js", "Source app"],
    ["/generated/game.js", "Source game"], ["/original/en", "Source dialogue"],
  ]) {
    assert.equal(await (await fetch(origin + url)).text(), expected, url);
  }
});

test("preview without a package fails with instructions instead of serving source", async t => {
  const site = await fixture(t);
  await rm(path.join(site.root, "dist"), { recursive: true });
  await assert.rejects(promisify(execFile)(process.execPath, ["server.mjs", "--preview"], {
    cwd: site.root, env: { ...process.env, PORT: "0" },
  }), /Run npm run package first/);
});
