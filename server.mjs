import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const preview = process.argv.includes("--preview");
const root = fileURLToPath(new URL(preview ? "dist/" : ".", import.meta.url));
if (preview) {
  for (const file of ["index.html", "generated/game.js", "original/manifest.json"]) {
    try {
      if (!(await stat(path.join(root, file))).isFile()) throw new Error(`${file} is not a regular file`);
    } catch (error) {
      throw new Error("Cannot preview dist/. Run npm run package first.", { cause: error });
    }
  }
}
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".png": "image/png", ".txt": "text/plain", ".json": "application/json" };
const pages = new Set(["/index.html", "/style.css", "/app.js", "/browser-platform.js", "/ott.js", "/licence.txt", "/THIRD-PARTY-NOTICES.txt", "/TEAVM-LICENSE.txt"]);
const server = createServer(async (req, res) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  } catch {
    res.writeHead(400).end("Invalid URL");
    return;
  }
  if (pathname === "/") pathname = "/index.html";
  const asset = /^\/assets\/[a-z0-9_-]+\.png$/.test(pathname) ||
    /^\/original\/[a-z0-9_-]+(?:\.(?:png|bin|ott|hlp|json))?$/.test(pathname) ||
    pathname === "/generated/game.js";
  if (!pages.has(pathname) && !asset) {
    res.writeHead(404).end("Not found");
    return;
  }
  try {
    const file = path.join(root, asset && !preview ? "public" : ".", pathname);
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream", "X-Content-Type-Options": "nosniff" });
    res.end(body);
  } catch (error) {
    if (error.code === "ENOENT") res.writeHead(404).end("Not found");
    else {
      console.error("Unable to serve request:", error);
      res.writeHead(500).end("Unable to read file");
    }
  }
});
server.listen(Number(process.env.PORT || (preview ? 4175 : 4173)), "127.0.0.1", () => {
  console.log(`Miki's World${preview ? " preview (dist/)" : ""}: http://127.0.0.1:${server.address().port}`);
});
