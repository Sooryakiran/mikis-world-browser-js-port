import { test, expect } from "@playwright/test";
import { PLAYBACK_RATE, SOUND_PITCH_SEMITONES } from "../browser-platform.js";

async function enterTitle(page) {
  await page.goto("/");
  await page.getByRole("button", { name: "Enable audio", exact: true }).click();
  await expect(page.getByRole("button", { name: "Start game", exact: true })).toBeEnabled();
  await expect(page.locator("#pause")).toBeEnabled();
}

async function start(page) {
  await enterTitle(page);
  await page.getByRole("button", { name: "Start game", exact: true }).click();
  await expect.poll(() => page.evaluate(() => JSON.parse(mikiPlatform.callbacks.inspect())[0])).toBe(20);
}

async function openMenu(page) {
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page.locator("#game-menu")).toBeVisible();
}

async function expectViewportGame(page) {
  const layout = await page.evaluate(() => {
    const stage = document.querySelector("#stage").getBoundingClientRect();
    const canvas = document.querySelector("#game").getBoundingClientRect();
    const toolbar = document.querySelector("#toolbar").getBoundingClientRect();
    return {
      stage: { x: stage.x, y: stage.y, width: stage.width, height: stage.height },
      canvas: { x: canvas.x, y: canvas.y, width: canvas.width, height: canvas.height },
      viewport: { width: innerWidth, height: innerHeight },
      scroll: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
      fit: getComputedStyle(document.querySelector("#game")).objectFit,
      controlsTop: toolbar.top, controlsRight: innerWidth - toolbar.right,
    };
  });
  expect(layout.stage).toEqual({ x: 0, y: 0, ...layout.viewport });
  expect(layout.canvas).toEqual(layout.stage);
  expect(layout.scroll).toEqual(layout.viewport);
  expect(layout.fit).toBe("contain");
  expect(layout.controlsTop).toBeLessThanOrEqual(16);
  expect(layout.controlsRight).toBeLessThanOrEqual(16);
}

test("the title fills the viewport immediately, with only top-right controls", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Enable audio", exact: true })).toBeEnabled();
  await expectViewportGame(page);
  await expect(page.locator("#game-menu")).toBeHidden();
  await expect(page.locator("header, footer, .intro, .console")).toHaveCount(0);
  await expect(page.locator(".touch-controls")).toBeHidden();
  await openMenu(page);
  await page.getByText("Credits & licenses", { exact: true }).click();
  await expect(page.getByRole("link", { name: "Game license", exact: true })).toBeVisible();
});

test("enabling audio plays the original title melody until Start game is selected", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Enable audio", exact: true })).toBeEnabled();
  expect(await page.evaluate(() => mikiPlatform.audio)).toBeNull();
  await page.getByRole("button", { name: "Enable audio", exact: true }).click();
  await expect(page.getByRole("button", { name: "Start game", exact: true })).toBeEnabled();
  await expect(page.locator("#overlay")).toBeVisible();
  await expect(page.locator(".touch-controls")).toBeHidden();
  const title = await page.evaluate(async () => {
    const { decodeOtt } = await import("/ott.js");
    const active = [...mikiPlatform.playing].find(([handle]) => decodeOtt(mikiPlatform.sounds[handle]).title === "title");
    if (!active) throw new Error("Original title melody was not started");
    globalThis.titleAudioAnalyser = mikiPlatform.audio.createAnalyser();
    titleAudioAnalyser.fftSize = 256;
    for (const { gain } of active[1].nodes) gain.connect(titleAudioAnalyser);
    return { title: decodeOtt(mikiPlatform.sounds[active[0]]).title, audio: mikiPlatform.audio.state };
  });
  expect(title).toEqual({ title: "title", audio: "running" });
  await expect.poll(() => page.evaluate(() => {
    const samples = new Float32Array(titleAudioAnalyser.fftSize);
    titleAudioAnalyser.getFloatTimeDomainData(samples);
    return samples.some(value => Math.abs(value) > 0.0001);
  })).toBe(true);
  await page.waitForTimeout(250);
  await expect(page.locator("#overlay")).toBeVisible();
  await page.getByRole("button", { name: "Start game", exact: true }).click();
  await expect(page.locator("#overlay")).toBeHidden();
  await expect.poll(() => page.evaluate(() => JSON.parse(mikiPlatform.callbacks.inspect())[0])).toBe(20);
  await expect(page.getByRole("button", { name: "Jump", exact: true })).toBeVisible();
  expect(await page.evaluate(async () => {
    const { decodeOtt } = await import("/ott.js");
    return [...mikiPlatform.playing.keys()].some(handle => decodeOtt(mikiPlatform.sounds[handle]).title === "title");
  })).toBe(false);
});

test("title-screen forms return to Start game without skipping the title", async ({ page }) => {
  await enterTitle(page);
  await openMenu(page);
  await page.getByRole("button", { name: "Instructions", exact: true }).click();
  await expect(page.locator("#native-menu")).toBeVisible();
  await expect(page.locator("#overlay")).toBeHidden();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.locator("#native-menu")).toBeHidden();
  await expect(page.getByRole("button", { name: "Start game", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Start game", exact: true }).click();
  await expect.poll(() => page.evaluate(() => JSON.parse(mikiPlatform.callbacks.inspect())[0])).toBe(20);
});

test("the original New game menu command also leaves the title overlay", async ({ page }) => {
  await enterTitle(page);
  await openMenu(page);
  await page.getByRole("button", { name: "New game", exact: true }).click();
  await expect(page.locator("#overlay")).toBeHidden();
  await expect(page.locator("#game-menu")).toBeHidden();
  await expect.poll(() => page.evaluate(() => JSON.parse(mikiPlatform.callbacks.inspect())[0])).toBe(20);
});

test("Start game begins the original story, and controls and original menus still work", async ({ page }) => {
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await start(page);
  await expect(page.locator("#game-menu")).toBeHidden();
  expect(await page.evaluate(() => mikiPlatform.audio.state)).toBe("running");
  const pacing = await page.evaluate(async () => {
    const before = { clock: mikiPlatform.clock, wall: performance.now() };
    await new Promise(resolve => setTimeout(resolve, 1200));
    return { game: mikiPlatform.clock - before.clock, wall: performance.now() - before.wall };
  });
  expect(Math.abs(pacing.game - pacing.wall * PLAYBACK_RATE)).toBeLessThan(60);
  await page.evaluate(() => { for (let i = 0; i < 1200; i++) mikiPlatform.step(); });
  const original = await page.evaluate(() => JSON.parse(mikiPlatform.callbacks.inspect()));
  expect(original[0]).toBe(0);
  expect(original.slice(11, 13)).toEqual([16, 205]);
  await page.locator("canvas").focus();
  await page.keyboard.down("ArrowRight");
  await expect.poll(() => page.evaluate(() => JSON.parse(mikiPlatform.callbacks.inspect())[1])).toBeGreaterThan(original[1]);
  await page.keyboard.up("ArrowRight");
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  const paused = await page.evaluate(() => mikiPlatform.callbacks.inspect());
  await page.waitForTimeout(100);
  expect(await page.evaluate(() => mikiPlatform.callbacks.inspect())).toBe(paused);
  await expect(page.locator("#pause-indicator")).toBeVisible();
  await page.getByRole("button", { name: "Resume", exact: true }).click();
  await openMenu(page);
  await page.getByRole("button", { name: "Instructions", exact: true }).click();
  await expect(page.locator("#native-menu")).toContainText("Princess Amie has lost her tiara!");
  await expect(page.locator("#game-menu")).toBeHidden();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.locator("#native-menu")).toBeHidden();
  expect(errors).toEqual([]);
});

test("every original melody uses the configured pitch in real Web Audio oscillators", async ({ page }) => {
  await start(page);
  const melodies = await page.evaluate(async () => {
    const { decodeOtt } = await import("/ott.js");
    return [...mikiPlatform.resources].filter(([name]) => name.endsWith(".ott")).map(([name, bytes]) => {
      const handle = mikiPlatform.sounds.push(bytes) - 1;
      try {
        mikiPlatform.playSound(handle, 1);
        return {
          name,
          original: decodeOtt(bytes).notes.filter(note => note.frequency > 0 && note.volume > 0).map(note => note.frequency),
          played: [...mikiPlatform.playing.get(handle).nodes].map(node => node.oscillator.frequency.value),
        };
      } finally {
        mikiPlatform.stopSound(handle);
      }
    });
  });
  expect(melodies).toHaveLength(12);
  for (const melody of melodies) {
    expect(melody.played.length, melody.name).toBeGreaterThan(0);
    expect(melody.played, melody.name).toHaveLength(melody.original.length);
    for (let i = 0; i < melody.original.length; i++) {
      expect(melody.played[i], melody.name).toBeCloseTo(melody.original[i] * 2 ** (SOUND_PITCH_SEMITONES / 12), 3);
    }
  }
});

test("opening the menu pauses and closing it preserves the previous pause state", async ({ page }) => {
  await start(page);
  await openMenu(page);
  await expect(page.getByRole("button", { name: "Resume", exact: true })).toBeVisible();
  const paused = await page.evaluate(() => mikiPlatform.callbacks.inspect());
  await page.waitForTimeout(100);
  expect(await page.evaluate(() => mikiPlatform.callbacks.inspect())).toBe(paused);
  await page.keyboard.press("Escape");
  await expect(page.locator("#game-menu")).toBeHidden();
  await expect(page.getByRole("button", { name: "Pause", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Pause", exact: true }).click();
  await openMenu(page);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Resume", exact: true })).toBeVisible();
  await expect(page.locator("#pause-indicator")).toBeVisible();
});

test("settings survive reload and touch controls fit portrait and landscape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await start(page);
  await expectViewportGame(page);
  await expect(page.getByRole("button", { name: "Jump", exact: true })).toBeVisible();
  await openMenu(page);
  await page.getByRole("button", { name: "Sound: on", exact: true }).click();
  await enterTitle(page);
  expect(await page.evaluate(() => mikiPlatform.playing.size)).toBe(0);
  await openMenu(page);
  await expect(page.getByRole("button", { name: "Sound: off", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "Start game", exact: true }).click();
  await expect.poll(() => page.evaluate(() => JSON.parse(mikiPlatform.callbacks.inspect())[0])).toBe(20);
  await page.getByRole("button", { name: "Skip animation", exact: true }).click();
  await expect.poll(() => page.evaluate(() => JSON.parse(mikiPlatform.callbacks.inspect())[0])).toBe(0);
  await page.setViewportSize({ width: 844, height: 390 });
  await expectViewportGame(page);
  const controlsFit = await page.locator(".touch-controls button").evaluateAll(buttons =>
    buttons.every(button => {
      const rect = button.getBoundingClientRect();
      return rect.left >= 0 && rect.right <= innerWidth && rect.top >= 0 && rect.bottom <= innerHeight;
    }));
  expect(controlsFit).toBe(true);
});

test("native fullscreen can be entered and exited without leaving the game", async ({ page }) => {
  await start(page);
  await page.getByRole("button", { name: "Fullscreen", exact: true }).click();
  await expect.poll(() => page.evaluate(() => document.fullscreenElement?.id)).toBe("stage");
  await expectViewportGame(page);
  await page.getByRole("button", { name: "Exit fullscreen", exact: true }).click();
  await expect.poll(() => page.evaluate(() => document.fullscreenElement)).toBeNull();
  await expect(page.locator("#overlay")).toBeHidden();
});

test("a rejected fullscreen request is reported without preventing play", async ({ page }) => {
  await page.addInitScript(() => {
    HTMLElement.prototype.requestFullscreen = () => Promise.reject(new DOMException("Fullscreen blocked by browser", "NotAllowedError"));
  });
  await start(page);
  await page.getByRole("button", { name: "Fullscreen", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("Fullscreen is unavailable");
  await expect(page.locator("#overlay")).toBeHidden();
  await expect(page.locator("#pause")).toBeEnabled();
});

test("the original Exit command provides a way back to the immersive title", async ({ page }) => {
  await start(page);
  await openMenu(page);
  await page.getByRole("button", { name: "Exit", exact: true }).click();
  await expect(page.locator("#overlay")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Thanks for playing", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Return to title", exact: true }).click();
  await expect(page.getByRole("button", { name: "Enable audio", exact: true })).toBeEnabled();
  await expectViewportGame(page);
});
