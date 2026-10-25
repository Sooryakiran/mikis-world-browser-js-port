import { decodeOtt } from "./ott.js";

export const TICK_MS = 20;
export const PLAYBACK_RATE = 0.64;
export const SOUND_PITCH_SEMITONES = -3;
export const STORE_PREFIX = "mikis-world-original:";

export class BrowserPlatform {
  constructor(canvas, menu, commands, status, reportError) {
    this.canvas = canvas;
    this.menu = menu;
    this.commands = commands;
    this.status = status;
    this.reportError = reportError;
    this.clock = Date.now();
    this.pendingTime = 0;
    this.surfaces = [canvas];
    this.resources = new Map();
    this.imageHandles = new Map();
    this.sounds = [];
    this.audio = null;
    this.playing = new Map();
    this.callbacks = null;
    this.exited = false;
    this.resourceManifest = null;
    this.kind = 0;
  }

  async load() {
    if (!globalThis.crypto?.subtle) throw new Error("Original resource verification requires HTTPS or a localhost server.");
    const response = await fetch("/original/manifest.json");
    if (!response.ok) throw new Error(`Original resource manifest: HTTP ${response.status}. Run npm run build.`);
    const manifest = await response.json();
    await Promise.all(Object.entries(manifest.resources).map(async ([name, expected]) => {
      const file = await fetch(`/original/${encodeURIComponent(name)}`);
      if (!file.ok) throw new Error(`Cannot load original ${name}: HTTP ${file.status}`);
      const data = new Uint8Array(await file.arrayBuffer());
      const digest = await crypto.subtle.digest("SHA-256", data);
      const actual = [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, "0")).join("");
      if (actual !== expected) throw new Error(`Original resource checksum mismatch: ${name}`);
      this.resources.set(`/${name}`, data);
      if (name.endsWith(".png")) {
        const image = await createImageBitmap(new Blob([data], { type: "image/png" }));
        this.imageHandles.set(`/${name}`, this.surfaces.push(image) - 1);
      }
      if (name.endsWith(".ott")) decodeOtt(data);
    }));
    this.resourceManifest = manifest;
  }

  bind(tick, key, action, select, text, pause, resume, inspect) {
    this.callbacks = { tick, key, action, select, text, pause, resume, inspect };
  }

  step() {
    if (!this.callbacks || this.exited) return;
    this.clock += TICK_MS;
    this.callbacks.tick();
  }

  advance(elapsedMs) {
    this.pendingTime += Math.min(elapsedMs, 100) * PLAYBACK_RATE;
    while (this.pendingTime >= TICK_MS) {
      this.step();
      this.pendingTime -= TICK_MS;
    }
  }

  resetTiming() {
    this.pendingTime = 0;
  }

  resourceLength(name) { return this.resources.get(name)?.length ?? -1; }
  resourceByte(name, index) {
    const data = this.resources.get(name);
    if (!data || index < 0 || index >= data.length) throw new Error(`Invalid resource read: ${name}[${index}]`);
    return data[index];
  }

  image(name) {
    const handle = this.imageHandles.get(name);
    if (handle === undefined) throw new Error(`Missing original image: ${name}`);
    return handle;
  }

  surface(width, height) {
    if (width <= 0 || height <= 0) throw new Error(`Invalid image dimensions ${width}x${height}`);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, width, height);
    return this.surfaces.push(canvas) - 1;
  }

  clipped(target, x, y, width, height, draw) {
    if (width <= 0 || height <= 0) return;
    const ctx = this.surfaces[target].getContext("2d");
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.clip();
    draw(ctx);
    ctx.restore();
  }

  drawImage(target, source, x, y, cx, cy, cw, ch) {
    this.clipped(target, cx, cy, cw, ch, ctx => ctx.drawImage(this.surfaces[source], x, y));
  }

  rect(target, x, y, width, height, color, fill, cx, cy, cw, ch) {
    if (width < 0 || height < 0) return;
    const css = `#${color.toString(16).padStart(6, "0")}`;
    this.clipped(target, cx, cy, cw, ch, ctx => {
      if (fill) {
        ctx.fillStyle = css;
        ctx.fillRect(x, y, width, height);
      } else {
        ctx.strokeStyle = css;
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, width, height);
      }
    });
  }

  text(target, text, x, y, anchor, font, color, cx, cy, cw, ch) {
    this.clipped(target, cx, cy, cw, ch, ctx => {
      ctx.font = `${font}px Arial, sans-serif`;
      ctx.fillStyle = `#${color.toString(16).padStart(6, "0")}`;
      ctx.textAlign = anchor & 8 ? "right" : anchor & 1 ? "center" : "left";
      ctx.textBaseline = anchor & 64 ? "alphabetic" : anchor & 32 ? "bottom" : "top";
      ctx.fillText(text, x, y);
    });
  }

  measure(text, font) {
    const ctx = this.canvas.getContext("2d");
    ctx.save();
    ctx.font = `${font}px Arial, sans-serif`;
    const width = Math.ceil(ctx.measureText(text).width);
    ctx.restore();
    return width;
  }

  beginScreen(title, kind) {
    this.kind = kind;
    this.commands.replaceChildren();
    this.menu.replaceChildren();
    this.menu.hidden = kind === 0;
    if (title) {
      const heading = document.createElement("h2");
      heading.textContent = title;
      this.menu.append(heading);
    }
    this.status.textContent = kind === 0 ? "Original game running. Press 5 / Enter to skip animations; 8 / Down enters passages." : title;
    this.canvas.dispatchEvent(new CustomEvent("game-screen-change", { detail: { kind } }));
  }

  command(label, index) {
    const button = document.createElement("button");
    button.textContent = label;
    button.dataset.command = index;
    button.addEventListener("click", () => this.invoke(() => this.callbacks.action(index)));
    (this.kind === 0 ? this.commands : this.menu).append(button);
  }

  listItem(label, index) {
    const button = document.createElement("button");
    button.textContent = label;
    button.addEventListener("click", () => this.invoke(() => this.callbacks.select(index)));
    this.menu.append(button);
  }

  paragraph(text) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    this.menu.append(paragraph);
  }

  textField(label, text, max, index) {
    const element = document.createElement("label");
    element.textContent = label;
    const field = document.createElement("input");
    field.value = text;
    field.maxLength = max;
    field.addEventListener("input", () => this.invoke(() => this.callbacks.text(index, field.value)));
    element.append(field);
    this.menu.append(element);
  }

  invoke(callback) {
    try {
      callback();
      if (!this.menu.contains(document.activeElement)) this.canvas.focus({ preventScroll: true });
    } catch (error) {
      this.reportError(error);
    }
  }

  storeKey(name) { return STORE_PREFIX + name; }
  storage(operation) {
    try { return operation(); }
    catch (error) {
      this.reportError(new Error(`Original game save storage failed: ${error.message}`, { cause: error }));
      throw error;
    }
  }
  readStore(name) {
    return this.storage(() => {
      const value = localStorage.getItem(this.storeKey(name));
      if (value === null) throw new Error(`Record store not found: ${name}`);
      const store = JSON.parse(value);
      if (!Array.isArray(store) || store.some(record => typeof record !== "string")) throw new Error(`Corrupt record store: ${name}`);
      return store;
    });
  }
  storeExists(name) { return this.storage(() => localStorage.getItem(this.storeKey(name)) !== null); }
  storeCreate(name) { this.storage(() => localStorage.setItem(this.storeKey(name), "[]")); }
  storeCount(name) { return this.readStore(name).length; }
  storeRead(name, id) {
    const store = this.readStore(name);
    if (!Number.isInteger(id) || id < 1 || id > store.length) throw new Error(`Invalid record ID ${name}:${id}`);
    return store[id - 1];
  }
  storeWrite(name, id, value) {
    const store = this.readStore(name);
    if (!Number.isInteger(id) || id < 1 || id > store.length + 1) throw new Error(`Invalid record ID ${name}:${id}`);
    store[id - 1] = value;
    this.storage(() => localStorage.setItem(this.storeKey(name), JSON.stringify(store)));
  }
  storeDelete(name) { this.storage(() => localStorage.removeItem(this.storeKey(name))); }

  newSound(length) { return this.sounds.push(new Uint8Array(length)) - 1; }

  async unlockAudio() {
    const Audio = globalThis.AudioContext || globalThis.webkitAudioContext;
    if (!Audio) throw new Error("This browser does not support Web Audio. Original sound cannot be played.");
    if (!this.audio) this.audio = new Audio();
    await this.audio.resume();
  }

  playSound(handle, count) {
    const tune = decodeOtt(this.sounds[handle]);
    this.stopSound(handle);
    if (!this.audio || this.audio.state !== "running") throw new Error("Audio is locked. Use Enable audio to enable sound.");
    for (const other of this.playing.keys()) this.stopSound(other);
    const playing = { nodes: new Set(), timer: null };
    this.playing.set(handle, playing);
    const schedule = () => {
      let time = this.audio.currentTime + 0.01;
      for (let loop = 0; loop < (count === 0 ? 1 : count); loop++) {
        for (const note of tune.notes) {
          const duration = note.duration / PLAYBACK_RATE;
          if (note.frequency > 0 && note.volume > 0) {
            const oscillator = this.audio.createOscillator();
            const gain = this.audio.createGain();
            oscillator.type = "square";
            oscillator.frequency.value = note.frequency * 2 ** (SOUND_PITCH_SEMITONES / 12);
            const end = time + duration * note.gate;
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(note.volume * 0.045, time + Math.min(.003, duration / 4));
            gain.gain.setValueAtTime(note.volume * 0.045, Math.max(time + .003, end - .003));
            gain.gain.linearRampToValueAtTime(0, end);
            oscillator.connect(gain).connect(this.audio.destination);
            oscillator.start(time);
            oscillator.stop(end + .001);
            const node = { oscillator, gain };
            oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); playing.nodes.delete(node); };
            playing.nodes.add(node);
          }
          time += duration;
        }
      }
      if (count === 0 || tune.forever) playing.timer = setTimeout(() => {
        schedule();
      }, Math.max(0, (time - this.audio.currentTime - .01) * 1000));
    };
    schedule();
  }

  stopSound(handle) {
    const playing = this.playing.get(handle);
    if (!playing) return;
    clearTimeout(playing.timer);
    for (const { oscillator, gain } of playing.nodes) {
      oscillator.onended = null;
      oscillator.stop();
      oscillator.disconnect();
      gain.disconnect();
    }
    this.playing.delete(handle);
  }

  vibrate(duration) {
    if (typeof navigator.vibrate === "function") navigator.vibrate(duration);
  }

  destroyed() {
    this.exited = true;
    for (const handle of this.playing.keys()) this.stopSound(handle);
    this.status.textContent = "Original game exited. Reload to start again.";
    this.canvas.dispatchEvent(new Event("game-exited"));
  }
}
