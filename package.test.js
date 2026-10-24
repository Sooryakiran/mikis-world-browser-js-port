import { test } from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { copyFile, mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

const exec = promisify(execFile);
const sources = {
  "index.html": "<!doctype html>",
  "style.css": "canvas { image-rendering: pixelated; }",
  "app.js": 'import "./browser-platform.js";',
  "browser-platform.js": 'import "./ott.js";',
  "ott.js": "export const decodeOtt = () => {};",
  "licence.txt": "Original game license",
  "TEAVM-LICENSE.txt": "Compiler license",
  "THIRD-PARTY-NOTICES.txt": "Third-party notices",
  "public/generated/game.js": "export const main = () => {};",
  "public/generated/game.js.map": "{}",
  "public/original/manifest.json": '{"resources": {}}',
  "public/original/en": Buffer.from([0, 255, 13, 10]),
  "public/original/coin.ott": Buffer.from([2, 74, 0, 255]),
  "public/original/nested/image.png": Buffer.from([137, 80, 78, 71]),
};

async function fixture(t) {
  const root = await mkdtemp(path.join(tmpdir(), "mikis-world-package-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await copyFile(new URL("./package.mjs", import.meta.url), path.join(root, "package.mjs"));
  await Promise.all(Object.entries(sources).map(async ([name, contents]) => {
    const target = path.join(root, name);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, contents);
  }));
  return root;
}

test("packaging copies only static runtime files, resources and licenses without changing bytes", async t => {
  const root = await fixture(t);
  await writeFile(path.join(root, "server.mjs"), "Not for deployment");
  await exec(process.execPath, ["package.mjs"], { cwd: root });
  const dist = path.join(root, "dist");
  const expected = Object.keys(sources).map(name => name.replace(/^public\//, "")).sort();
  const entries = await readdir(dist, { recursive: true });
  const actual = (await Promise.all(entries.map(async name =>
    (await stat(path.join(dist, name))).isFile() ? name.split(path.sep).join("/") : null)))
    .filter(name => name !== null).sort();
  assert.deepEqual(actual, expected);
  for (const [source, contents] of Object.entries(sources)) {
    assert.deepEqual(await readFile(path.join(dist, source.replace(/^public\//, ""))), Buffer.from(contents));
  }
});

test("repackaging removes stale output and preserves unrelated source files", async t => {
  const root = await fixture(t);
  await mkdir(path.join(root, "dist"));
  await writeFile(path.join(root, "dist", "stale.js"), "Old output");
  await writeFile(path.join(root, "unrelated.txt"), "Keep me");
  await exec(process.execPath, ["package.mjs"], { cwd: root });
  assert.equal((await readdir(path.join(root, "dist"))).includes("stale.js"), false);
  assert.equal(await readFile(path.join(root, "unrelated.txt"), "utf8"), "Keep me");
});

test("missing required inputs fail packaging without deleting the previous output", async t => {
  const root = await fixture(t);
  await mkdir(path.join(root, "dist"));
  await writeFile(path.join(root, "dist", "previous.txt"), "Previous package");
  await rm(path.join(root, "licence.txt"));
  await assert.rejects(exec(process.execPath, ["package.mjs"], { cwd: root }), /licence\.txt/);
  assert.equal(await readFile(path.join(root, "dist", "previous.txt"), "utf8"), "Previous package");
});
