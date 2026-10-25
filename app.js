import { BrowserPlatform } from "./browser-platform.js";

const canvas = document.querySelector("#game");
const overlay = document.querySelector("#overlay");
const play = document.querySelector("#play");
const pause = document.querySelector("#pause");
const restart = document.querySelector("#restart");
const status = document.querySelector("#status");
const stage = document.querySelector("#stage");
const menu = document.querySelector("#game-menu");
const menuToggle = document.querySelector("#menu-toggle");
const fullscreen = document.querySelector("#fullscreen");
const pauseIndicator = document.querySelector("#pause-indicator");
const notice = document.querySelector("#notice");
const pressed = new Map();
let platform;
let started = false;
let atTitle = true;
let paused = false;
let failed = false;
let last = 0;
let resumeAfterMenu = false;

function fail(error) {
  console.error("Original game platform error:", error);
  failed = true;
  releaseKeys();
  if (platform) for (const handle of platform.playing.keys()) platform.stopSound(handle);
  document.querySelector("#overlay-title").textContent = "Unable to run the original game";
  document.querySelector("#overlay-title").classList.remove("sr-only");
  document.querySelector("#overlay-copy").textContent = error instanceof Error ? error.message : String(error);
  overlay.classList.add("is-error");
  overlay.hidden = false;
  pauseIndicator.hidden = true;
  play.disabled = true;
  pause.disabled = true;
  status.textContent = "Game stopped. See the error above; reload after resolving it.";
}

function releaseKeys() {
  if (platform?.callbacks) for (const code of new Set(pressed.values())) platform.callbacks.key(code, false);
  pressed.clear();
}

function sendKey(source, code, down) {
  if (!started || paused || failed || platform.exited || platform.kind !== 0) return;
  if (down) {
    if (pressed.has(source)) return;
    const held = [...pressed.values()].includes(code);
    pressed.set(source, code);
    if (!held) platform.callbacks.key(code, true);
  } else {
    pressed.delete(source);
    if (![...pressed.values()].includes(code)) {
      // The original game clears both axes on release; restore keys still held.
      platform.callbacks.key(code, false);
      for (const held of new Set(pressed.values())) platform.callbacks.key(held, true);
    }
  }
}

function setPaused(value) {
  if (!started || failed || platform.exited) return;
  if (paused === value) return;
  releaseKeys();
  paused = value;
  platform.resetTiming();
  last = 0;
  if (paused) {
    platform.callbacks.pause();
    if (platform.audio) platform.audio.suspend().catch(fail);
  } else {
    platform.callbacks.resume();
    if (platform.audio) platform.audio.resume().catch(fail);
  }
  pause.textContent = paused ? "Resume" : "Pause";
  pauseIndicator.hidden = !paused;
  status.textContent = paused ? "Paused. Resume to continue the original game." : "Original game resumed.";
  canvas.focus({ preventScroll: true });
}

function setMenu(open) {
  if (open === !menu.hidden) return;
  menu.hidden = !open;
  menuToggle.setAttribute("aria-expanded", String(open));
  if (open) {
    resumeAfterMenu = started && !paused && !failed && !platform.exited;
    if (resumeAfterMenu) setPaused(true);
    menu.querySelector("button:not(:disabled)")?.focus({ preventScroll: true });
  } else {
    const resume = resumeAfterMenu;
    resumeAfterMenu = false;
    if (resume) setPaused(false);
    canvas.focus({ preventScroll: true });
  }
}

function togglePause() {
  if (!started || failed || platform.exited) return;
  const next = !paused;
  resumeAfterMenu = false;
  setMenu(false);
  setPaused(next);
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await stage.requestFullscreen();
    notice.hidden = true;
    canvas.focus({ preventScroll: true });
  } catch (error) {
    console.warn("Fullscreen request failed:", error);
    notice.textContent = `Fullscreen is unavailable: ${error.message}. The game still fills this window.`;
    notice.hidden = false;
  }
}

play.addEventListener("click", async () => {
  if (platform.exited) {
    location.reload();
    return;
  }
  play.disabled = true;
  try {
    if (!started) {
      await platform.unlockAudio();
      const { main } = await import("/generated/game.js");
      main([]);
      if (failed) return;
      if (!platform.callbacks || platform.exited) throw new Error("Original game failed during initialization.");
      platform.step();
      if (failed) return;
      platform.resetTiming();
      last = 0;
      started = true;
      pause.disabled = restart.disabled = false;
      document.querySelector("#overlay-copy").textContent = "The original adventure. Start when you're ready.";
      play.textContent = "Start game";
      play.disabled = false;
      play.focus({ preventScroll: true });
      return;
    }
    const newGame = [...document.querySelectorAll("#commands button")].find(button => button.textContent === "New game");
    if (!newGame) throw new Error("The original New game command is unavailable.");
    newGame.click();
    canvas.focus({ preventScroll: true });
  } catch (error) { fail(error); }
});
pause.addEventListener("click", togglePause);
restart.addEventListener("click", () => location.reload());
menuToggle.addEventListener("click", () => setMenu(menu.hidden));
document.querySelector("#commands").addEventListener("click", event => {
  const button = event.target.closest("button");
  if (!button) return;
  if (!failed && !platform.exited && ["New game", "Continue game"].includes(button.textContent)) {
    atTitle = false;
    overlay.hidden = true;
    stage.dataset.started = "true";
    platform.resetTiming();
    last = 0;
  }
  setMenu(false);
});
document.addEventListener("pointerdown", event => {
  if (!menu.hidden && !menu.contains(event.target) && !document.querySelector("#toolbar").contains(event.target)) setMenu(false);
});
canvas.addEventListener("game-screen-change", event => {
  stage.dataset.screen = event.detail.kind === 0 ? "game" : "form";
  if (started && atTitle && !failed) overlay.hidden = event.detail.kind !== 0;
  if (event.detail.kind !== 0) setMenu(false);
});
canvas.addEventListener("game-exited", () => {
  setMenu(false);
  started = false;
  atTitle = false;
  stage.dataset.started = "false";
  pause.disabled = true;
  pauseIndicator.hidden = true;
  document.querySelector("#overlay-title").classList.remove("sr-only");
  document.querySelector("#overlay-title").textContent = "Thanks for playing";
  document.querySelector("#overlay-copy").textContent = "Return to the title to begin another adventure.";
  play.textContent = "Return to title";
  play.disabled = false;
  overlay.hidden = false;
});
fullscreen.hidden = !document.fullscreenEnabled || typeof stage.requestFullscreen !== "function";
fullscreen.addEventListener("click", toggleFullscreen);
document.addEventListener("fullscreenchange", () => {
  fullscreen.textContent = document.fullscreenElement ? "Exit fullscreen" : "Fullscreen";
});

const keys = new Map([
  ["ArrowLeft", 52], ["a", 52], ["ArrowRight", 54], ["d", 54],
  ["ArrowUp", 50], ["w", 50], [" ", 50],
  ["ArrowDown", 56], ["s", 56], ["Enter", 53],
  ...Array.from({ length: 10 }, (_, i) => [String(i), 48 + i]),
]);
document.addEventListener("keydown", event => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  if (key === "Escape" && !menu.hidden) {
    event.preventDefault();
    setMenu(false);
    return;
  }
  if (event.target instanceof HTMLElement && event.target.closest("input, textarea, button, a, summary")) return;
  if (key === "f" && !fullscreen.hidden) {
    event.preventDefault();
    if (!event.repeat) toggleFullscreen();
  } else if (key === "p" || key === "Escape") {
    event.preventDefault();
    if (!event.repeat) togglePause();
  } else if (keys.has(key) && started && !event.repeat) {
    event.preventDefault();
    try { sendKey(`keyboard:${key}`, keys.get(key), true); }
    catch (error) { fail(error); }
  }
});
document.addEventListener("keyup", event => {
  const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
  if (keys.has(key)) {
    try { sendKey(`keyboard:${key}`, keys.get(key), false); }
    catch (error) { fail(error); }
  }
});
window.addEventListener("blur", () => { if (started && !paused && !failed) setPaused(true); });
document.addEventListener("visibilitychange", () => {
  if (document.hidden && started && !paused && !failed) setPaused(true);
});
document.querySelectorAll("[data-key]").forEach(button => {
  button.addEventListener("pointerdown", event => {
    event.preventDefault();
    if (!started || paused || failed) return;
    button.setPointerCapture(event.pointerId);
    try { sendKey(`pointer:${event.pointerId}`, Number(button.dataset.key), true); }
    catch (error) { fail(error); }
  });
  for (const type of ["pointerup", "pointercancel", "lostpointercapture"]) {
    button.addEventListener(type, event => {
      const source = `pointer:${event.pointerId}`;
      if (!pressed.has(source)) return;
      try { sendKey(source, Number(button.dataset.key), false); }
      catch (error) { fail(error); }
    });
  }
});

function frame(time) {
  if (started && !paused && !failed && !platform.exited) {
    try {
      platform.advance(time - (last || time));
    } catch (error) { fail(error); }
  } else platform.resetTiming();
  last = time;
  requestAnimationFrame(frame);
}

async function load() {
  platform = new BrowserPlatform(canvas, document.querySelector("#native-menu"), document.querySelector("#commands"), status, fail);
  globalThis.mikiPlatform = platform;
  try {
    await platform.load();
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(platform.surfaces[platform.image("/title.png")], 0, 0);
    play.textContent = "Enable audio";
    play.disabled = false;
    if (document.activeElement === document.body) play.focus({ preventScroll: true });
    status.textContent = "Original JAR resources verified. Ready to play.";
    requestAnimationFrame(frame);
  } catch (error) { fail(error); }
}
load();
