import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { BrowserPlatform, PLAYBACK_RATE, SOUND_PITCH_SEMITONES, STORE_PREFIX, TICK_MS } from "./browser-platform.js";
import { decodeOtt } from "./ott.js";

const stored = new Map();
Object.defineProperty(globalThis, "localStorage", { value: {
  getItem: key => stored.get(key) ?? null,
  setItem: (key, value) => stored.set(key, value),
  removeItem: key => stored.delete(key),
}, configurable: true });

class HeadlessPlatform extends BrowserPlatform {
  constructor() {
    super({ width: 176, height: 144 }, null, null, {}, error => { throw error; });
    this.clock = 100000;
    this.commandLabels = [];
    this.paragraphs = [];
    this.listItems = [];
    this.draws = [];
    this.tunes = [];
  }
  async load() {
    for (const name of await readdir("public/original")) {
      if (name === "manifest.json") continue;
      const data = await readFile(`public/original/${name}`);
      this.resources.set(`/${name}`, data);
      if (name.endsWith(".png")) {
        this.imageHandles.set(`/${name}`, this.surfaces.push({
          width: data.readUInt32BE(16), height: data.readUInt32BE(20),
        }) - 1);
      }
    }
  }
  surface(width, height) { return this.surfaces.push({ width, height }) - 1; }
  drawImage(target, source, ...coordinates) { this.draws.push({ target, source, coordinates }); }
  rect() {}
  text(target, text) { this.paragraphs.push(text); }
  measure(text, font) { return Math.ceil(text.length * font * .55); }
  beginScreen(title, kind) {
    this.title = title;
    this.kind = kind;
    this.commandLabels = [];
    this.listItems = [];
    this.paragraphs = [];
  }
  command(label) { this.commandLabels.push(label); }
  paragraph(text) { this.paragraphs.push(text); }
  listItem(label) { this.listItems.push(label); }
  textField() {}
  playSound(handle) { this.tunes.push(decodeOtt(this.sounds[handle]).title); }
  stopSound() {}
  vibrate() {}
  step() {
    this.draws = [];
    super.step();
  }
  state() {
    const values = JSON.parse(this.callbacks.inspect());
    const names = ["phase", "x", "y", "lives", "coins", "room", "birds", "dx", "jump", "frame", "timer", "mapWidth", "mapHeight", "mapHash"];
    return Object.fromEntries(names.map((name, index) => [name, values[index]]));
  }
  action(label) {
    const index = this.commandLabels.indexOf(label);
    assert.notEqual(index, -1, `Original command must exist: ${label}`);
    this.callbacks.action(index);
    this.step();
  }
}

let serial = 0;
async function boot() {
  stored.clear();
  const platform = new HeadlessPlatform();
  await platform.load();
  globalThis.mikiPlatform = platform;
  const { main } = await import(`./public/generated/game.js?test=${serial++}`);
  main([]);
  assert.ok(platform.callbacks, "Original MIDlet must initialize its browser bridge");
  assert.equal(platform.exited, false);
  platform.step();
  return platform;
}

test("all original assets and scripts are byte-identical to the supplied JAR", async () => {
  const manifest = JSON.parse(await readFile("public/original/manifest.json", "utf8"));
  const hash = data => createHash("sha256").update(data).digest("hex");
  assert.equal(hash(await readFile("jar/Mikis_World_1.jar")), manifest.jarSha256);
  assert.equal(Object.keys(manifest.resources).length, 34);
  for (const [name, expected] of Object.entries(manifest.resources)) {
    const original = execFileSync("unzip", ["-p", "jar/Mikis_World_1.jar", name]);
    assert.equal(hash(original), expected, `${name} must match the original JAR`);
    assert.equal(hash(await readFile(`public/original/${name}`)), expected);
  }
});

test("every original Nokia OTT melody decodes without substitutions", async () => {
  const names = (await readdir("public/original")).filter(name => name.endsWith(".ott"));
  assert.equal(names.length, 12);
  for (const name of names) {
    const song = decodeOtt(await readFile(`public/original/${name}`));
    assert.ok(song.notes.length > 0, name);
    assert.ok(song.duration > 0 && Number.isFinite(song.duration), name);
    assert.ok(song.notes.every(note => Number.isFinite(note.frequency) && note.gate > 0 && note.duration > 0), name);
  }
  assert.throws(() => decodeOtt(new Uint8Array([2, 74])), /Truncated/);
});

test("pacing follows the configured playback rate without changing the simulation step", () => {
  assert.ok(Number.isFinite(PLAYBACK_RATE) && PLAYBACK_RATE > 0);
  for (const frameMs of [4, 10, 20, 40, 100]) {
    const platform = new HeadlessPlatform();
    let ticks = 0;
    platform.callbacks = { tick: () => ticks++ };
    const start = platform.clock;
    for (let elapsed = 0; elapsed < 1000; elapsed += frameMs) platform.advance(frameMs);
    const expectedTicks = Math.floor(1000 * PLAYBACK_RATE / TICK_MS);
    assert.equal(platform.clock - start, expectedTicks * TICK_MS, `${frameMs} ms browser frames`);
    assert.equal(ticks, expectedTicks);
    assert.equal(TICK_MS, 20, "Original simulation step must stay unchanged");
  }
});

test("fractional refresh rates preserve configured pacing without a catch-up burst", () => {
  for (const hz of [60, 120, 144]) {
    const platform = new HeadlessPlatform();
    platform.callbacks = { tick() {} };
    const start = platform.clock;
    for (let frame = 0; frame < hz * 10; frame++) platform.advance(1000 / hz);
    assert.ok(Math.abs(platform.clock - start - 10000 * PLAYBACK_RATE) <= TICK_MS, `${hz} Hz`);
  }
  const platform = new HeadlessPlatform();
  platform.callbacks = { tick() {} };
  const start = platform.clock;
  platform.advance(30);
  const afterWarmup = platform.clock;
  platform.resetTiming();
  platform.advance(TICK_MS / PLAYBACK_RATE / 4);
  assert.equal(platform.clock, afterWarmup, "Paused frame remainder must not leak into resume");
  platform.advance(TICK_MS / PLAYBACK_RATE * 3 / 4);
  assert.equal(platform.clock - afterWarmup, TICK_MS);
  const beforeStall = platform.clock;
  const pending = platform.pendingTime;
  platform.advance(5000);
  assert.equal(platform.clock - beforeStall, Math.floor((pending + 100 * PLAYBACK_RATE) / TICK_MS) * TICK_MS,
    "A long stall must not trigger seconds of catch-up updates");
  assert.ok(platform.clock > start);
});

test("original melody timing follows configured speed with independent pitch transposition", async () => {
  const platform = new HeadlessPlatform();
  const bytes = await readFile("public/original/coin.ott");
  const tune = decodeOtt(bytes);
  const notes = [];
  platform.sounds.push(bytes);
  platform.audio = {
    state: "running", currentTime: 0, destination: {},
    createOscillator() {
      const note = {
        frequency: { value: 0 }, connect: gain => gain,
        start(time) { this.startTime = time; },
        stop(time) { this.endTime = time; },
      };
      notes.push(note);
      return note;
    },
    createGain: () => ({
      gain: { setValueAtTime() {}, linearRampToValueAtTime() {} },
      connect() {},
    }),
  };
  BrowserPlatform.prototype.playSound.call(platform, 0, 1);
  let time = 0.01, index = 0;
  for (const note of tune.notes) {
    const duration = note.duration / PLAYBACK_RATE;
    if (note.frequency > 0 && note.volume > 0) {
      const actual = notes[index++];
      assert.ok(Math.abs(actual.frequency.value - note.frequency * 2 ** (SOUND_PITCH_SEMITONES / 12)) < 1e-9);
      assert.ok(Math.abs(actual.startTime - time) < 1e-9);
      assert.ok(Math.abs(actual.endTime - (time + duration * note.gate + .001)) < 1e-9);
    }
    time += duration;
  }
  assert.ok(index > 0);
  assert.equal(index, notes.length);
});

test("original title menu, instructions, About and high-score screens run", async () => {
  const platform = await boot();
  assert.deepEqual(platform.commandLabels, ["New game", "Instructions", "High scores", "Sound: on", "Vibrator: on", "About", "Exit"]);
  assert.ok(platform.tunes.includes("title"));
  platform.action("Instructions");
  assert.ok(platform.paragraphs.join("\n").includes("Princess Amie has lost her tiara"));
  assert.ok(platform.paragraphs.join("\n").includes("two secret rooms"));
  platform.action("Back");
  platform.action("About");
  assert.ok(platform.paragraphs.join("\n").includes("Copyright 2002 Sumea"));
  platform.action("Back");
  platform.action("High scores");
  assert.equal(platform.title, "High scores");
  platform.action("Back");
  assert.equal(platform.kind, 0);
});

test("new game uses the original map, opening story, spawn and movement", async () => {
  const platform = await boot();
  platform.action("New game");
  const intro = platform.state();
  assert.equal(intro.phase, 20, "Original opening cutscene, not replacement gameplay");
  assert.equal(intro.lives, 3);
  assert.equal(intro.mapWidth, 16);
  assert.equal(intro.mapHeight, 205);
  assert.notEqual(intro.mapHash, 0);
  for (let tick = 0; tick < 1600 && platform.state().phase === 20; tick++) platform.step();
  const spawn = platform.state();
  assert.equal(spawn.phase, 0, "Original intro must finish and enter the original map");
  assert.equal(spawn.coins, 0);
  assert.ok(platform.paragraphs.includes("Let me tell you a story.."));
  assert.ok(platform.paragraphs.includes('"Look at my new tiara!"'));
  platform.callbacks.key(54, true);
  for (let tick = 0; tick < 10; tick++) platform.step();
  assert.ok(platform.state().x > spawn.x, "Original 6/right control must move Miki");
  platform.callbacks.key(54, false);
  assert.equal(platform.state().dx, 0);
  const before = platform.state();
  platform.callbacks.pause();
  for (let tick = 0; tick < 20; tick++) platform.step();
  assert.deepEqual(platform.state(), before);
  platform.callbacks.resume();
  const grounded = platform.state();
  platform.callbacks.key(50, true);
  for (let tick = 0; tick < 5; tick++) platform.step();
  platform.callbacks.key(50, false);
  assert.ok(platform.state().y < grounded.y, "Original 2/up control must jump");
});

test("original sound/vibration settings persist through the RMS bridge", async () => {
  const platform = await boot();
  platform.action("Sound: on");
  assert.ok(platform.commandLabels.includes("Sound: off"));
  platform.action("Vibrator: on");
  assert.ok(platform.commandLabels.includes("Vibrator: off"));
  const records = JSON.parse(stored.get(`${STORE_PREFIX}AppData`));
  assert.deepEqual([...Buffer.from(records[0], "base64")], [1, 0, 0]);
});

test("the original hidden unlock and bonus-game AI remain reachable", async () => {
  const platform = await boot();
  platform.action("New game");
  platform.callbacks.key(53, true);
  for (let tick = 0; tick < 10 && platform.state().phase === 20; tick++) platform.step();
  platform.callbacks.key(53, false);
  assert.equal(platform.state().phase, 0);
  for (const code of [55, 55, 55, 55, 51, 51, 50, 50, 50, 55, 55, 55, 51, 51, 56]) {
    platform.callbacks.key(code, true);
    platform.callbacks.key(code, false);
  }
  platform.action("New game");
  platform.step();
  assert.deepEqual(platform.listItems, ["Main game", "Bonus game"]);
  platform.callbacks.select(1);
  platform.step();
  assert.equal(platform.state().phase, 22);
  platform.callbacks.key(53, true);
  platform.callbacks.key(53, false);
  for (let tick = 0; tick < 200; tick++) platform.step();
  assert.ok([22, 23, 24, 25].includes(platform.state().phase));
  assert.ok(platform.draws.length > 0, "Original bonus game must continue rendering");
});
