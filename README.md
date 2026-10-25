# Miki's World 1: The Lost Tiara / browser port

The **original game**, compiled ahead of time to JavaScript from the supplied
`jar/Mikis_World_1.jar` (Sumea, v1.1.2). The earlier invented prototype level and
replacement physics have been removed.

The original bytecode still implements the map, movement, collision, enemies,
coins, birds, secret rooms, boss battle, story sequences and bonus game.
`level.bin`, `begin.bin`, `end.bin`, dialogue, sprite sheets and all twelve Nokia
OTT melodies are extracted unchanged. No Java plugin, Java runtime, emulator,
external CDN or game upload is needed to play.

For the architecture and a reusable workflow for porting other J2ME games, see
[the detailed porting guide](detailed.md).

## Build and run

Building requires a JDK 17+ and network access to download the pinned Gradle,
TeaVM and ASM build dependencies. Serving/testing requires Node.js 20+ and
`unzip` for resource verification.

```sh
npm run build
npm test
npm run check
npm start
```

Open <http://127.0.0.1:4173>. The original title fills the window immediately;
press **Enable audio** to hear the original title/splash melody. The title stays
on screen until you press **Start game** (or choose Menu > New game), which begins
the original story. This separate audio-unlock step is required by browser
autoplay rules; it no longer skips the title music. If the original Sound setting
was saved as off, turn it on in Menu to hear the music.
There is no surrounding website layout. The original aspect ratio is preserved
with letterboxing rather than stretching or cropping.
`PORT` changes the server port. The server binds to localhost.
Once built, `npm start` does not require a JDK or network access.

For development, run `npm run dev`. It serves the same page and automatically
restarts when server code changes. Refresh the browser after editing JavaScript,
HTML or CSS; browser hot reload is not enabled. Java bridge or preparation-tool
changes still require `npm run build`. If port 4173 is already in use, run
`PORT=4175 npm run dev` and open <http://127.0.0.1:4175>.

For browser regression tests (including real Web Audio startup and mobile
controls), install the development-only test dependency and Chromium:

```sh
npm ci
npx playwright install chromium
npm run test:browser
```

These tests start and stop their own server on port 4174.

The Gradle wrapper is included; a separate Gradle installation is unnecessary.
Build output persists in `public/generated` and `public/original`.

## Package a static website

```sh
npm run package
```

This builds the original game and creates a ready-to-upload `dist/` directory.
It includes the HTML, CSS, browser JavaScript, compiled game in `generated/`,
original resources in `original/`, and required licenses/notices. The original
JAR, Java sources, Node server, tests and development dependencies are not included.
Each successful package replaces the previous `dist/`, removing stale files;
do not store hand-maintained files there. A failed build or missing required input
does not replace the previous package.

Preview the existing package locally:

```sh
npm run preview
```

Open <http://127.0.0.1:4175>. Preview serves only `dist/`; it does not rebuild,
watch files, or fall back to development files. Run `npm run package` again to
include source changes. If no package exists, preview exits with instructions.
Use `PORT=4176 npm run preview` to choose another port.

For authorized static deployment, upload **the contents of `dist/`** to your
site's root. No Node.js or Java server is needed in production. URLs assume
hosting at `/`; subdirectory hosting needs URL adjustments. Public hosting must
use HTTPS for browser resource-checksum verification. Open the deployed site
through HTTP(S), not directly via `file://`.

## Original controls

| Original keypad | Browser | Action |
| --- | --- | --- |
| 4 / 6 | Left / Right or A / D | Run |
| 2 | Up, W, Space | Jump |
| 1 / 3 | 1 / 3 or simultaneous move + jump | Diagonal jump |
| 8 | Down or S | Enter passages |
| 5 | Enter | Skip animations / select in bonus game |

Pause, Fullscreen and Menu are overlaid in the top-right corner. The game fills
the browser viewport from the beginning; the Fullscreen button (or F) additionally
hides browser chrome when supported. Native fullscreen requires a user gesture.
A rejected request is reported without stopping the window-filling game.

P / Escape pauses; losing focus pauses automatically. Opening Menu pauses the
game and closing it resumes only if it was running before. Escape closes an open
menu first. The menu contains original New game, Continue game, Instructions,
High scores, Sound, Vibrator, About and Exit commands, plus controls and licenses.
Original forms retain their Back/Save controls inside the form.
Touch controls appear along the bottom on small or touch screens, support
simultaneous keys and stay hidden on the title and in forms.
Return to title reloads the game; it does not erase high scores or settings.

Playback speed is set by `PLAYBACK_RATE` near the top of `browser-platform.js`
(for example, `0.67` is 67% of the original port's speed). This is user-adjustable
pacing, not a measured claim about Nokia hardware. The original 20 ms simulation
step is unchanged. Movement, animations, story timing and countdowns share that
clock. Melody tempo follows the setting without affecting pitch.
Save and refresh the page after changing it; no Java rebuild is needed.

Audio pitch is set separately by `SOUND_PITCH_SEMITONES` in the same file.
The current listening preference is `-3` (three semitones lower, about 84% of
the encoded frequencies). Use `0` for the original decoded pitches or `-12`
for one octave lower. This affects all melodies and sound effects without
changing their durations or the game speed. Save and refresh; no rebuild is needed.

Original RMS records are saved under the `mikis-world-original:` localStorage
prefix, separately from the obsolete prototype's best-score key.
As in the JAR, Continue game is session state, not a new persistent save system.
Storage failures are reported rather than silently discarding saves.

## How fidelity is preserved

TeaVM compiles the original classes, not a hand-reimplemented game engine.
The browser bridge implements only the J2ME/Nokia APIs used by this JAR:
Canvas drawing/clipping/anchors, image buffers, font measurements, menus/forms,
key events, RMS storage, vibration and OTT sound playback.

The reproducible preparation tool makes only these platform adaptations:

- Convert the MIDlet's busy loop into one iteration per browser tick.
- Remove native thread start, sleeps and yields; preserve the original
  20 ms simulation step, paced at the configured speed without blocking the browser.
- Route resource reads to preloaded, checksum-verified original files.
- Route the clock to simulation time, excluding browser pauses.
- Add read-only diagnostic accessors for automated regression tests.

Game rules, map data, scripts and story text are not rewritten.
Preparation asserts the expected loop/thread/resource call counts to reject
unexpected input versions. A generated SHA-256 manifest records the source JAR
and all 34 resources; the browser verifies each resource before starting.

Tests run the compiled original game under a headless platform adapter. They
check byte-identical resources, all original melodies, original menus, natural
opening-story completion, the 16-by-205-tile map, movement/jump controls,
pause/resume, settings persistence and the original hidden bonus-game unlock
and AI. They do **not** constitute a complete manual playthrough of every route
or a pixel-by-pixel comparison with a physical Nokia.

### Remaining platform differences

- Browser fonts replace the phone's built-in fonts. Story text is unchanged;
  glyph shapes and text measurement can differ.
- Original menu commands use accessible HTML controls instead of a Nokia
  soft-key menu.
- Original monophonic melodies are decoded from OTT and synthesized with
  Web Audio, not a physical Nokia speaker. Output is transposed down three
  semitones as a listening preference; the original resources are unchanged.
- Backlight commands have no browser equivalent. Vibration depends on device
  and browser support. Canvas is scaled to fit the page.

## Rights and attribution

Original JAR notice: **Miki's World 1: The Lost Tiara v1.1.2,
Copyright 2002 Sumea**.

Original game Miki's World (c) 2005 80beyond Technologies, per the supplied
licence. Browser port and modifications by Sooryakiran P, used under a
non-commercial licence.

The JAR identifies Sumea as vendor and has 2002 timestamps; the supplied
license describes a 2005 original work. The licensee confirmed that the grant
covers this specific Sumea JAR. This project does not independently establish
that chain of title.

See [the supplied license](licence.txt). Its grant is personal, non-transferable,
revocable and non-commercial. This project is **not** offered under an
open-source license. Do not monetize it or assume third-party redistribution
rights. Keep the attribution and license accessible in authorized hosting.
The license still has a jurisdiction placeholder; clarify it with the licensor
before public release.

Compiler/runtime and build-tool notices are in
[THIRD-PARTY-NOTICES.txt](THIRD-PARTY-NOTICES.txt).
