import { copyFile, cp, mkdir, rm, stat } from "node:fs/promises";

const root = new URL(".", import.meta.url);
const dist = new URL("dist/", root);
const files = [
  "index.html",
  "style.css",
  "app.js",
  "browser-platform.js",
  "ott.js",
  "licence.txt",
  "TEAVM-LICENSE.txt",
  "THIRD-PARTY-NOTICES.txt",
];

await Promise.all([...files, "public/generated/game.js", "public/original/manifest.json"].map(async file => {
  if (!(await stat(new URL(file, root))).isFile()) {
    throw new Error(`Cannot package: ${file} must be a regular file.`);
  }
}));

await rm(dist, { recursive: true, force: true });
await mkdir(dist);
await Promise.all([
  ...files.map(file => copyFile(new URL(file, root), new URL(file, dist))),
  ...["generated", "original"].map(directory =>
    cp(new URL(`public/${directory}/`, root), new URL(`${directory}/`, dist), { recursive: true })),
]);

console.log("Static website packaged in dist/. Deploy its contents at your HTTPS site's root.");
