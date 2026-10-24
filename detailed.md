# Porting a J2ME game to the web using its original bytecode

A practical guide based on the Miki's World port in this workspace.

## Contents

1. [What this approach is called](#1-what-this-approach-is-called)
2. [Architecture and execution model](#2-architecture-and-execution-model)
3. [When to choose this approach](#3-when-to-choose-this-approach)
4. [Rights, provenance, and reference behavior](#4-rights-provenance-and-reference-behavior)
5. [Inspecting a new game](#5-inspecting-a-new-game)
6. [Building the compatibility layer](#6-building-the-compatibility-layer)
7. [Adapting bytecode for the browser](#7-adapting-bytecode-for-the-browser)
8. [Compiling with TeaVM](#8-compiling-with-teavm)
9. [Resources and integrity](#9-resources-and-integrity)
10. [Graphics, forms, and controls](#10-graphics-forms-and-controls)
11. [Timing and lifecycle](#11-timing-and-lifecycle)
12. [Audio](#12-audio)
13. [Saved data](#13-saved-data)
14. [Browser presentation and deployment](#14-browser-presentation-and-deployment)
15. [Testing fidelity](#15-testing-fidelity)
16. [A workflow for the next game](#16-a-workflow-for-the-next-game)
17. [Troubleshooting](#17-troubleshooting)
18. [What can become a reusable framework](#18-what-can-become-a-reusable-framework)
19. [Completion checklist](#19-completion-checklist)

## 1. What this approach is called

The most precise description is:

> Ahead-of-time Java bytecode-to-JavaScript compilation, with a browser-backed
> J2ME/Nokia API compatibility layer.

Useful shorter names include **AOT-compiled browser port**, **bytecode
transpilation**, and **static recompilation with API adaptation**.

These terms describe slightly different parts of the solution:

| Term | Meaning here |
| --- | --- |
| Ahead-of-time compilation | Compilation happens during the build, before someone plays. |
| Bytecode-to-JavaScript compilation | The input is the original `.class` files, not rewritten game source. |
| Transpilation | A broad description of translating executable logic to another language. |
| Compatibility layer / API shim | Replacement implementations of the phone APIs the original game calls. |
| Bytecode transformation | Small, explicit edits to platform-dependent instructions before compilation. |

This is **not** a hand-written JavaScript recreation of the game. It is also
**not a Java VM interpreting the JAR in the browser**, and it does not emulate
the phone's CPU or operating system.

There is still platform emulation in the broad sense: we reproduce selected
phone API behavior. Saying "there is no emulator" should not imply that the
original hardware environment magically exists in JavaScript. The distinction
is that the game logic is compiled, while the platform services are replaced.

TeaVM also supplies runtime support for compiled Java, such as relevant Java
library behavior and object/exception machinery. "No JVM required" does not mean
"no runtime support code."

The output is generated JavaScript, not necessarily readable, idiomatic game
source. Do not maintain the game by editing the generated output.

## 2. Architecture and execution model

### Build time

```text
Authorized original JAR
    |
    +--> original resources --------------------> public/original/
    |                                               + SHA-256 manifest
    |
    +--> original .class files
             |
             v
       per-game ASM transformations
             |
             v
       adapted original .class files
             +
       Java compatibility classes
             +
       Java browser entry point
             |
             v
           TeaVM
             |
             v
       public/generated/game.js
```

### Browser runtime

```text
app.js: preload resources, unlock audio, import compiled module
    |
    v
compiled original game logic
    |
    v
Java classes with the original platform API names
    |
    v
web.Browser interop
    |
    v
browser-platform.js
    |
    +--> Canvas 2D / decoded images
    +--> HTML commands, lists, and forms
    +--> Web Audio
    +--> localStorage-backed RMS
    +--> keyboard and pointer input
```

The original game still decides collisions, enemy behavior, map traversal,
story progression, and win/lose conditions. The bridge handles drawing, input,
storage, sound, and browser lifecycle.

### Where those pieces live in this project

| Responsibility | Implementation |
| --- | --- |
| Original artifact | [jar/Mikis_World_1.jar](jar/Mikis_World_1.jar) |
| Bytecode adaptation and resource extraction | [tools/PrepareOriginal.java](tools/PrepareOriginal.java) |
| Build configuration | [build.gradle](build.gradle) |
| Java entry point and callbacks | [java/BrowserGame.java](java/BrowserGame.java) |
| Java-to-JavaScript interop | [java/web/Browser.java](java/web/Browser.java) |
| Resource stream adaptation | [java/web/Resources.java](java/web/Resources.java) |
| Phone API compatibility classes | [java/javax/microedition/](java/javax/microedition/) and [java/com/nokia/](java/com/nokia/) |
| Browser-side services | [browser-platform.js](browser-platform.js) |
| Nokia ringtone decoder | [ott.js](ott.js) |
| Startup, input, pause, and browser UI | [app.js](app.js) |
| Runtime regression tests | [original.test.js](original.test.js) |
| Real-browser regression tests | [e2e/original.spec.js](e2e/original.spec.js) |

## 3. When to choose this approach

It is a good candidate when:

- You have authorized access to a J2ME JAR.
- Most gameplay is implemented in ordinary Java bytecode.
- The platform API surface is reasonably small.
- Preserving the original game logic matters more than obtaining clean,
  hand-maintainable JavaScript game code.
- The threading and rendering model can be adapted without changing game rules.

It needs substantially more work when a game depends on:

- MIDP 2 `GameCanvas`, `Sprite`, `TiledLayer`, or other APIs absent from this bridge.
- Java ME multimedia APIs, MIDI, AMR, proprietary sound banks, or streaming audio.
- M3G/JSR-184 3D graphics or other hardware-oriented APIs.
- Vendor extensions from Siemens, Motorola, Samsung, Sony Ericsson, or another vendor.
- Networking, Bluetooth, payment services, DRM, native code, or unavailable servers.
- Multiple interacting threads, blocking I/O, or timing-sensitive synchronization.
- Dynamic class loading or reflection patterns that need special compiler handling.

These are investigation points, not blanket claims about what TeaVM can never
support. Evaluate the specific dependency, compiler configuration, and browser
constraints.

For a large collection of unrelated JARs, an existing browser-capable Java/J2ME
runtime or emulator may require less per-game engineering. It trades away this
port's narrow, compiled integration for broader platform coverage.

If authorized Java source is available, compiling that source with a suitable
platform layer may be easier than transforming bytecode. A full rewrite is a
different approach and requires separately reimplementing and validating gameplay.

**This repository is a working port of one game, not a universal JAR converter.**

## 4. Rights, provenance, and reference behavior

Before implementation:

1. Establish permission to inspect, adapt, and use the game and its assets.
2. Establish separately whether you may redistribute the JAR, extracted assets,
   and compiled derivative. Permission to play is not necessarily permission to host.
3. Preserve the original artifact and record its SHA-256 hash.
4. Record the exact vendor, version, language, target handset, and screen size.
5. Retain applicable game, compiler/runtime, and third-party notices.
6. Do not upload private game files to external analysis or conversion services.

For this game, the user confirmed that the supplied license covers the specific
Sumea JAR. The license has restrictions; it is not a general grant for other
games. See [README.md](README.md#rights-and-attribution) and [licence.txt](licence.txt).

Treat unfamiliar JARs as untrusted input. Inspect them in an appropriate isolated
environment; do not assume that a file called a game is safe to execute.

Obtain a reference before making fidelity claims:

- Ideally, use the correct physical handset.
- Otherwise, use a documented, authorized reference runtime or emulator.
- Record title screens, menu transitions, input behavior, movement, timer cadence,
  audio, save behavior, and opening/ending sequences.
- Record emulator settings: a convenient emulator is not automatically hardware truth.

Separate **observed reference behavior**, **inferred behavior**, and **player
preferences**. Those categories matter especially for clock speed and sound.

## 5. Inspecting a new game

### 5.1 Inventory the archive

Example read-only commands, using a placeholder path:

```sh
jar tf jar/YourGame.jar
unzip -p jar/YourGame.jar META-INF/MANIFEST.MF
shasum -a 256 jar/YourGame.jar
```

Look for `MIDlet-1`, `MicroEdition-Profile`, and `MicroEdition-Configuration`.
The MIDlet declaration identifies the entry class. A companion JAD, if present,
may contain additional properties the game reads.

Inventory:

- All classes and packages.
- Images, maps, scripts, text, fonts, and localization files.
- Sound formats, identified by content as well as extension.
- Root-relative versus package-relative resource paths.
- Display dimensions and handset assumptions.
- Persistent record-store names and expected binary formats.

Do not assume every file without a familiar extension is irrelevant; maps and
story scripts are often compact binary resources.

### 5.2 Inspect bytecode and dependencies

For the MIDlet in this project:

```sh
javap -classpath jar/Mikis_World_1.jar -p -c GameMIDlet
javap -classpath jar/Mikis_World_1.jar -p -verbose GameMIDlet
```

Repeat for reachable game classes. Inspect method descriptors, constant pools,
field accesses, and call sites. Obfuscated names can still reveal consistent
behavior through their types and calls.

A local decompiler can help explain control flow where inspection is permitted.
Its output is an analysis aid, not necessarily compilable source. Obfuscation can
produce class or member names that are legal in bytecode but illegal in Java source.

This port compiles the original bytecode after targeted adaptations; it does not
depend on recompiling decompiler output.

### 5.3 Build an API and control-flow inventory

For each external API, record the exact methods and behavior required:

| Area | Questions to answer |
| --- | --- |
| Lifecycle | What do construction, `startApp`, `pauseApp`, and destruction do? |
| Loop | Where is the main loop? What makes one logical update? |
| Time | Which calls read the clock? Are counters also incremented per update? |
| Threads | Which threads actually do useful work? What do sleeps coordinate? |
| Rendering | What triggers repaint and when does painting occur? |
| Input | Numeric keys, negative handset codes, game actions, or polling? |
| Resources | Which methods open data, and are paths relative? |
| Audio | Which APIs, encodings, repeat rules, and channels are used? |
| Storage | Which records are read/written, and what happens when missing? |
| Forms | Which commands, text fields, lists, and callbacks are needed? |

The output of this phase should be enough evidence to decide whether to proceed
with compilation, expand an existing runtime, or choose another strategy.

## 6. Building the compatibility layer

Implement the package/class names the game already references, with matching
method and constructor descriptors. For example:

```text
javax.microedition.midlet.MIDlet
javax.microedition.lcdui.Canvas
javax.microedition.lcdui.Graphics
javax.microedition.lcdui.Image
javax.microedition.lcdui.Display
javax.microedition.rms.RecordStore
com.nokia.mid.sound.Sound
com.nokia.mid.ui.DeviceControl
```

These are examples from this game, not a complete J2ME implementation.

Keep two layers:

1. **Java API semantics:** object state, clipping/translation state, command
   listeners, lifecycle callbacks, and Java-facing return values.
2. **Browser services:** actual image surfaces, drawing, DOM controls, audio,
   storage, and event delivery.

In this repository, `@JSBody` bridges Java calls to `mikiPlatform`, and
`@JSFunctor` exposes Java callbacks to JavaScript. See
[java/web/Browser.java](java/web/Browser.java).

The browser platform must exist before the compiled game's entry point runs.
All callback signatures must agree across the Java entry point, interop
declarations, and JavaScript implementation.

Start with the methods the game really uses. Implement their semantics, not
just their signatures. A method that returns a plausible value but does nothing
can hide missing rendering, broken saves, or skipped gameplay.

Explicit no-ops can be appropriate for a documented browser limitation such as
phone backlight control. They are not appropriate for essential game behavior.
Unexpected unsupported calls should produce actionable errors.

## 7. Adapting bytecode for the browser

### 7.1 Why it is needed

A handset game may start a Java thread and run an endless loop with sleeps.
Calling that unchanged on the browser's main thread can block painting, input,
and audio setup.

Other mismatches include synchronous resource loading and phone lifecycle
assumptions. Adapt these boundaries rather than recreating the game engine.

### 7.2 What this project's preparation tool does

[PrepareOriginal.java](tools/PrepareOriginal.java) uses ASM tree instructions to:

1. Extract the original resources unchanged.
2. Convert this `GameMIDlet.run()` loop into one iteration per call.
3. Remove its native thread start, sleeps, and yields.
4. Redirect `Class.getResourceAsStream` calls to `web.Resources.open`.
5. Redirect `System.currentTimeMillis` calls to the simulation clock.
6. Add read-only game-state accessors for testing.
7. Write adapted class files and a resource/hash manifest.

It expects exactly **one loop adaptation, one thread-start removal, and seven
resource call-site adaptations**. Unexpected counts fail the build.

The special names `GameMIDlet`, `d`, the field names used for diagnostics, and
the loop instruction pattern belong to this exact game version.

### 7.3 Rules for a new transformer

- Identify transformations using class, method name, descriptor, and verified
  instruction structure, not an unbounded text replacement.
- Validate the expected source version and call-site counts.
- Preserve branch targets, exception handlers, local variables, and operand-stack
  correctness. A different transformation may need stack-map-frame recomputation.
- Preserve cleanup and destruction paths, not just the running-game branch.
- Test the transformed classes through compilation and runtime behavior.
- Keep a clear account of every transformation and its purpose.

**Do not remove all threads or sleeps from an arbitrary game.** A sleep may
control animation, sound scheduling, synchronization, or I/O. A game may have
multiple update threads. Adapt only after understanding the scheduling model;
use an appropriate asynchronous/cooperative strategy where a one-step loop
cannot preserve semantics.

Similarly, do not redirect every clock indiscriminately. Simulation time,
calendar time, randomness seeding, and external deadlines can have different needs.

### 7.4 Important limits of the current extractor

The present preparation tool skips entries containing `/`. That is suitable for
this JAR's root-level classes/resources, but **not for general packaged games**.
It also has game-specific names and a simple manifest writer.

For another JAR, handle nested packages and resources, normalize paths, reject
unsafe archive destinations, escape manifest strings correctly, and prevent
stale output from a previous game/version from entering the build. Do not copy
the current extraction logic unchanged and assume it is universal.

## 8. Compiling with TeaVM

The pinned versions in this project are:

| Component | Version / role |
| --- | --- |
| TeaVM Gradle plugin | `0.16.0`, JavaScript compiler |
| TeaVM JSO dependencies | `0.16.0`, browser interop |
| ASM tree | `9.9`, bytecode adaptation |
| Gradle wrapper | `9.4.1`, repeatable build entry point |
| Java source target | Release `17` |
| Node.js | `20+` for the development server and Node tests |
| Playwright | `1.56.1`, browser tests |

Use a JDK compatible with the pinned Gradle/toolchain. Node.js does not replace
the JDK during compilation. Conversely, players do not need a JDK.

### Existing build sequence

```text
compilePortTools
    -> prepareOriginal
        -> compileJava
            -> generateJavaScript
```

The transformed original classes are on the compilation classpath. TeaVM starts
from `BrowserGame`, resolves reachable game and compatibility classes, and emits
an ES module at `public/generated/game.js`.

Use the included wrapper:

```sh
npm run build
```

That script runs:

```sh
./gradlew --no-daemon --console=plain generateJavaScript
```

At runtime, the application dynamically imports the module and calls its
`main` export as `main([])` after resources and audio are ready.

For another game, change the JAR input, entry point, adaptations, and needed
compatibility APIs. Simply replacing the JAR path is insufficient.

Also replace application-level assumptions: this app draws `/title.png` before
initialization, finds an original command with the exact label `New game`, and
automatically invokes it after the startup click. Another title may use different
resources, language, commands, or startup behavior.

When compilation fails, identify the first missing or incompatible platform
dependency. Do not make the error disappear with a fake implementation unless
the behavior is genuinely irrelevant and explicitly documented.

## 9. Resources and integrity

The browser performs asynchronous fetches; the original game expects synchronous
resource reads. Bridge the gap by preloading resources before game startup.

This port:

1. Fetches the generated manifest.
2. Fetches each resource as bytes.
3. Verifies its SHA-256 digest.
4. Decodes images and checks ringtone decoding.
5. Stores resources in memory.
6. Allows Java resource streams to read the already-loaded bytes synchronously.

Miki's World has **34 extracted resources**. The test suite compares them with
the entries inside the supplied JAR. Its main map is **16 by 205 tiles**.
Those numbers are useful regression facts for this game, not defaults for others.

For another game, preserve:

- Exact bytes, including scripts, map encodings, and text encodings.
- Path case and root/package-relative resource semantics.
- Image dimensions, transparency, and mutable-buffer behavior.
- Any original resource lookup rules.

The current `web.Resources.open` uses the supplied path directly and does not
generally resolve it relative to the owner class's package. Expand this when
the next game needs package-relative loading.

Checksums detect mismatched or modified resources relative to the manifest.
They do not prove ownership, correct gameplay, or authenticity if an attacker
can replace both the files and the manifest. HTTPS and trusted distribution
remain necessary.

## 10. Graphics, forms, and controls

### Graphics

Keep the original logical resolution separate from the browser viewport.
Miki's World renders to a **176 by 144** canvas; CSS enlarges it without
changing the coordinates reported to the game.

Important semantics include:

- Clipping and clipping intersections.
- Translation and the coordinate space of clip getters.
- Image anchor flags.
- Mutable offscreen images.
- Rectangle edge behavior and pixel alignment.
- Font measurement, baseline, and wrapping.
- Repaint and `serviceRepaints` behavior.

The implementation in [Graphics.java](java/javax/microedition/lcdui/Graphics.java)
keeps Java-facing graphics state and forwards actual drawing to Canvas 2D.

Disabling smoothing and using pixelated CSS preserves sharp source pixels.
Browser fonts still differ from handset fonts. If a new game relies on precise
font metrics, investigate an authorized matching bitmap font rather than
assuming a desktop font is equivalent.

MIDP 2 sprites, transforms, tiled layers, or 3D require additional implementations;
the current image/rectangle/text bridge does not provide them.

### Forms and commands

Original `Display`, `Form`, `List`, and command callbacks still drive the game.
The browser renders their controls as HTML.

Preserve command identity/order where the game depends on it, selected-item
state, text-field contents, and `hideNotify` / `showNotify` transitions.
Back/Save commands must remain reachable when a native-style form is open.

HTML is a presentation substitution, not permission to invent or omit original
menu behavior. Current form rendering also uses ordinary HTML controls and is
not a pixel-identical Nokia menu.

### Input

Translate browser events into the codes the original game actually consumes.
For this game, ASCII keypad codes are important:

| Key | Numeric code | Meaning here |
| --- | --- | --- |
| `4` / `6` | `52` / `54` | Left / right |
| `2` | `50` | Jump |
| `1` / `3` | `49` / `51` | Diagonal jump |
| `8` | `56` | Enter passages |
| `5` | `53` | Skip/select |

Another game may use negative handset codes, `getGameAction`, key repetition,
or polling instead. Inspect and test rather than copying this mapping.

Track keyboard and touch sources independently. Release keys on focus loss,
pause, and pointer cancellation. Multiple physical inputs may map to one game
key, so releasing one source should not release a key still held by another.

This game's original release handler clears both movement axes. The browser
adapter reasserts remaining held keys so simultaneous move/jump works. This is
a specific compatibility accommodation, not a universal J2ME rule.

## 11. Timing and lifecycle

### Separate presentation time from simulation time

`requestAnimationFrame` is a browser scheduling opportunity, not a guarantee
of a fixed update rate. Updating the game once per animation frame makes play
depend on whether the display runs at 60, 120, or 144 Hz.

This port accumulates elapsed browser time and invokes original updates in
fixed **20 ms** simulation steps:

```text
pending += min(elapsedWallMs, 100) * PLAYBACK_RATE
while pending >= 20:
    simulationClock += 20
    execute one adapted original iteration
    pending -= 20
```

This is a description of this game's scheduler, not a rule for all J2ME games.
The original code's 20 ms minimum suggests a maximum update cadence, not proof
that a physical handset consistently achieved 50 updates per second.

Games can mix elapsed-time decisions with per-update counters. Changing the
time returned to Java without also understanding update cadence may leave
movement and story speed inconsistent.

### Preferences versus fidelity

`PLAYBACK_RATE` in [browser-platform.js](browser-platform.js) is a
user-adjustable pacing preference. At the time this guide was written it is
`0.64`; the source constant is authoritative if subsequently changed.

`1` means the port's unscaled scheduling, not "verified hardware speed."
Do not blindly apply this game's rate to another title.

### Pause and resume

- Stop simulation advancement while paused.
- Reset the pending accumulator and frame timestamp before resuming.
- Release input so keys do not remain stuck.
- Suspend/resume audio coherently.
- Observe original MIDlet and screen hide/show callbacks.
- Pause on focus/visibility loss rather than catching up minutes of updates.
- Respect destruction; do not keep stepping an exited game.

The app's popup menu and the original game's form lifecycle are distinct.
Opening a browser menu auto-pauses only if needed; closing it must not undo
an earlier explicit pause.

For this static Java runtime, returning to title reloads the page instead of
assuming that calling `main` a second time resets all Java static state.

## 12. Audio

### Identify the original format first

This game's Nokia `Sound` API receives OTT tone data. It is not a collection
of ordinary WAV files. [ott.js](ott.js) decodes bit-packed notes, scales,
durations, tempo changes, articulation, volume, and pattern repeats.

For another title, inspect the actual format and API. MIDI, AMR, WAV, MMAPI,
and vendor-specific sequences need different handling. Browsers do not
necessarily decode every old phone format directly.

Preserve the original bytes even if a separately generated playback format
is needed. Record conversion assumptions and test them.

### Keep three independent concepts

1. **Tempo/duration:** how long a note lasts.
2. **Pitch/frequency:** which note is heard.
3. **Timbre:** the harmonic character, waveform, and speaker coloration.

This port changes tempo with the game pacing but changes pitch separately:

```text
outputDuration = decodedDuration / PLAYBACK_RATE
outputFrequency = decodedFrequency * 2^(SOUND_PITCH_SEMITONES / 12)
```

The current pitch preference is `SOUND_PITCH_SEMITONES = -3`, approximately
84% of each encoded frequency. `0` restores decoded pitch; `-12` halves
frequency. The decoder and original files remain unchanged.

This preference must not be presented as a proven correction to the original
game. Square-wave synthesis can sound brighter than a phone speaker even when
its fundamental pitch is correct. For fidelity work, compare measured notes,
duration, and timbre with a reference rather than lowering an octave by guess.

### Browser-specific requirements

- Create/resume audio from a click or tap because autoplay is restricted.
- Schedule note boundaries using the audio clock, not a `setTimeout` per note.
- Preserve the original game's stop, interruption, and repeat behavior.
- Cancel repeat timers and disconnect nodes when sounds end or stop.
- Decide concurrency based on the game's API/device model, not browser capacity.
- Treat missing audio support or decoding failure explicitly.

The present implementation uses square-wave oscillators, short gain ramps,
and one active melody at a time. Its browser tests inspect actual oscillator
frequencies for all twelve original sounds. That validates scheduling output,
not acoustic equivalence to a physical phone.

## 13. Saved data

J2ME RMS exposes numbered binary records. This bridge stores record bytes as
Base64 strings in a JSON array under a namespaced localStorage key.

See [RecordStore.java](java/javax/microedition/rms/RecordStore.java) and
[browser-platform.js](browser-platform.js).

For another game, verify:

- Creation versus opening a missing store.
- Record-ID allocation and any deletion behavior.
- Record counts, updates, ordering, and binary round trips.
- Expected exceptions and failure paths.
- Store-name collisions across games and versions.
- Storage quota, disabled storage, corrupt data, and origin changes.

The current adapter implements only the subset this game needs. In particular,
it is not a complete implementation of every RMS enumeration/deletion/listener
feature. Do not assume its array indexing covers games that delete individual
records and expect non-reused record IDs.

localStorage is origin-specific, synchronous, and not a durable cloud backup.
Changing scheme, host, or port can make existing saves appear absent.
IndexedDB may suit larger or more demanding save systems, but its asynchronous
model must be reconciled with the Java-facing API.

For Miki's World, settings/high scores persist; Continue game is in-session.
Do not silently add a new persistent save feature and call it original behavior.

## 14. Browser presentation and deployment

The current application is intentionally game-like:

- A full-viewport title and game canvas, with no website header/footer.
- Aspect-preserving scaling and letterboxing.
- Compact top-right Pause, Fullscreen, and Menu controls.
- Bottom touch controls on small/touch screens.
- Accessible credits/licenses in the menu.

Full-viewport CSS works immediately. Native fullscreen needs a supported browser
and a user gesture; it cannot reliably be forced at page load. Audio activation
also requires interaction. Report fullscreen denial without stopping the game.

### Development commands

For this existing project, with its required build tools available:

```sh
npm ci
npm run build
npm test
npm run check
npx playwright install chromium
npm run test:browser
npm run dev
```

Open <http://127.0.0.1:4173>. If that port belongs to another process, choose
another one instead of stopping the unknown process:

```sh
PORT=4175 npm run dev
```

Java compatibility or preparation-tool changes require rebuilding. Frontend
JavaScript/CSS/HTML changes require refreshing; this server does not provide
browser hot-module replacement. Generated output should never be edited manually.

### Static deployment

#### Package: create the deployable website

Run this from the project directory:

```sh
npm run package
```

The command performs two steps in order:

1. `npm run build` compiles the original game through Gradle and TeaVM. This
   requires the build-time JDK/toolchain described in section 8. Gradle can reuse
   up-to-date outputs.
2. `node package.mjs` checks the required inputs and assembles the static site
   in `dist/`.

[package.mjs](package.mjs) copies the browser-facing HTML, CSS, and JavaScript,
maps `public/generated/` to `dist/generated/`, maps `public/original/` to
`dist/original/`, and includes the game and third-party licenses/notices.
Files are copied without changing their contents; current speed and pitch
settings are included as part of the copied browser code.

The resulting layout is:

```text
dist/
|-- index.html
|-- style.css
|-- app.js
|-- browser-platform.js
|-- ott.js
|-- generated/
|   `-- game.js
|-- original/
|   |-- manifest.json
|   `-- ...original game resources
|-- licence.txt
|-- TEAVM-LICENSE.txt
`-- THIRD-PARTY-NOTICES.txt
```

The original JAR, Java sources, build caches, Node server, packaging script,
tests, and development dependencies are not part of the deployment.

Packaging replaces the previous `dist/`, removing stale output. Do not keep
hand-maintained files there. A failed build or a missing required input detected
before copying leaves the previous package intact. A later copy/filesystem error
can leave partial output; resolve the error and rerun packaging before deployment.

Packaging creates a directory, not a ZIP archive, and does not start a server.

#### Preview: serve the existing package locally

After packaging, run:

```sh
npm run preview
```

Open <http://127.0.0.1:4175>. The command runs
`node server.mjs --preview` and serves the files from `dist/` on localhost.
Leave the terminal running while playing; press **Ctrl+C** to stop the server.

Preview deliberately:

- Does not compile Java, run Gradle, or rebuild the package.
- Does not watch source files or provide browser hot reload.
- Does not use development files when a packaged file is missing.
- Checks for `dist/index.html`, `dist/generated/game.js`, and
  `dist/original/manifest.json` before listening. If a required entry file is
  absent or unreadable, it exits with instructions to run `npm run package`.

It needs Node.js to run this local helper, but no JDK or Gradle. The deployed
static website does not require a Node.js backend.

Use `PORT` if the default preview port is occupied:

```sh
PORT=4176 npm run preview
```

Then open <http://127.0.0.1:4176>. Do not stop an unrelated process just to
free the default port.

#### Typical edit, package, and preview workflow

```sh
# Create or refresh the deployable files.
npm run package

# Serve the packaged version, not the development sources.
npm run preview
```

After editing source files, rerun `npm run package` and refresh the preview page.
Preview serves the current files in `dist/`, so a successful repackage does not
normally require restarting the preview server. Avoid loading the page while
packaging is replacing the directory.

| Command | Purpose | Served files | Default URL |
| --- | --- | --- | --- |
| `npm run dev` | Development server with Node server-code watching | Root frontend files plus mapped `public/` resources | `http://127.0.0.1:4173` |
| `npm start` | Development file server without watching | Same source/resource layout as dev | `http://127.0.0.1:4173` |
| `npm run build` | Compile/extract game outputs | Does not start a server or assemble the full site | None |
| `npm run package` | Build and assemble the complete static website | Writes `dist/`; does not start a server | None |
| `npm run preview` | Inspect the existing deployment package | Only `dist/` | `http://127.0.0.1:4175` |

Development and preview can run side by side on their default ports. Browser
saves are origin-specific, so scores/settings from port `4173` do not
automatically appear on port `4175`.

#### Publish the package

For authorized distribution, publish **the contents of `dist/`** to the root
of an HTTPS static site. No Java or Node.js server is required by the game in
production. Keep the included license and attribution files accessible.

The packaging command maps the source public directories to those deployment
paths, matching the local server's URLs. Upload the contents of `dist/`, not the
repository or the `dist/` directory as an extra URL prefix.

The development server also has an explicit filename/path allowlist. Extend it
deliberately for a new game's nested resources or additional formats; extracting
a file does not automatically make it servable.

Current imports/resource URLs assume the site root `/`. A subdirectory deployment
requires adjusting and testing all relevant URLs, not only the HTML entry point.

Serve JavaScript modules with a JavaScript MIME type and binary resources as
binary data. The browser's resource verification requires a secure context:
HTTPS for public hosting, or an appropriate localhost origin for development.

The included server binds to localhost. It is a development helper, not a
production hosting setup. No Java VM is needed after the generated files exist.
There is no service worker here; a standalone/offline install is not automatic.

## 15. Testing fidelity

Use multiple levels of evidence. A screenshot of the title is not enough.

### A. Build and adaptation checks

- Verify source identity and all expected transformation counts.
- Compile the Java bridge and generated JavaScript.
- Reject missing APIs and changed bytecode patterns.
- Confirm that the expected output/resource set is actually generated.

### B. Resource checks

- Compare extracted bytes directly against the authorized JAR.
- Validate resource names, counts, hashes, and required files.
- Confirm maps/scripts remain original rather than being manually recreated.

### C. Headless original-game tests

Run the compiled original module with a test platform adapter. This project's
tests load isolated module instances and expose read-only original state.

Useful checks include:

- Original title/menu commands and all native forms.
- Natural opening-story completion and gameplay entry.
- Map dimensions/hash, spawn location, movement, jump, and collision.
- Damage, death, restart, boss, secret areas, bonus modes, and ending.
- Save/load round trips and original missing-store behavior.
- Timing at several browser refresh rates and after a stall/pause.
- Audio note decoding, durations, pitch scaling, and cleanup.

Distinguish checks you plan to add from those already implemented. This port
tests menus, story, map, controls, settings, timing/audio, and the hidden bonus
game/AI; it has not completed every route or a full hardware comparison.

Read-only diagnostic accessors should observe state without changing random
sequences, skipping logic, or inventing a replacement state machine.

### D. Real-browser tests

Test actual browser APIs, not only mocks:

- Startup click, resource loading, and audio activation.
- Keyboard and simultaneous pointer input.
- Pause, visibility changes, native forms, exit, and reload.
- Desktop, mobile portrait, and landscape layout.
- Fullscreen success, unsupported fullscreen, and request rejection.
- Storage across reloads.
- Actual oscillator frequencies and scheduling where applicable.
- Browser errors and visible failure reporting.

This repository uses a dedicated Playwright server on port `4174`, separate
from the user's development server.

### E. Reference comparison

Finally compare against the original handset/reference recording. Measure
elapsed time for fixed actions and audio pitch/duration, inspect key sequences
and scene transitions, and document remaining visual/speaker differences.

Passing tests proves the assertions implemented, not total equivalence.
Resource identity alone does not prove correct rendering or gameplay cadence.

## 16. A workflow for the next game

### Phase 1: Decide feasibility

1. Start a separate workspace so this functioning port remains intact.
2. Establish rights and record the exact JAR/JAD version.
3. Inventory resources, APIs, lifecycle, timing, and threads.
4. Obtain reference behavior.
5. Decide whether a focused compiled port is appropriate.

**Exit criterion:** a bounded list of required APIs and platform adaptations,
with major unsupported features identified.

### Phase 2: Reach the original title

1. Configure the new input JAR and resource extraction.
2. Implement the required lifecycle, image, graphics, and resource APIs.
3. Adapt the startup/loop safely.
4. Compile through TeaVM and display the original title.
5. Make missing functionality explicit rather than faking success.

**Exit criterion:** the original entry point runs, required assets verify,
and errors are visible and diagnosable.

### Phase 3: Reach real gameplay

1. Wire original command and input callbacks.
2. Verify menus and native forms.
3. Start the original story/game through its own logic.
4. Add required storage and audio implementations.
5. Test the original map, movement, and progression.

**Exit criterion:** a playable original gameplay loop, not a replacement demo.

### Phase 4: Calibrate and preserve

1. Measure timing instead of tuning only by feel.
2. Check sound pitch, tempo, and timbre separately.
3. Compare lifecycle and input edge cases.
4. Add deterministic regressions and resource checks.
5. Record any intentional preferences separately from fidelity claims.

**Exit criterion:** reproducible behavior with documented evidence and limits.

### Phase 5: Package

1. Add viewport-filling presentation and touch controls.
2. Test production URLs, MIME types, HTTPS, and storage origin behavior.
3. Include applicable licenses and attribution.
4. Produce a deployment artifact from the tested build.
5. Play through the intended release paths and document anything unverified.

## 17. Troubleshooting

| Symptom | Likely area | Next investigation |
| --- | --- | --- |
| Page freezes at startup | Endless loop or blocking operation | Revisit loop adaptation and thread/I/O assumptions. |
| Missing class/method during build | Incomplete API surface | Inspect the exact owner/name/descriptor and implement required semantics. |
| Unexpected transformation counts | Different JAR or invalid pattern | Verify the input hash and re-inspect bytecode; do not disable the assertion. |
| Original resources return 404 | Paths, extraction, or server routing | Check root/package-relative names and public URL layout. |
| Works with one JAR, fails with packaged classes | Root-only extraction | Implement safe nested paths and package-relative resource resolution. |
| JavaScript module will not import | Build output, URL, or MIME type | Check the network response and generated ES module location. |
| Game is fast on a high-refresh display | Updates tied to rendered frames | Use the game's verified simulation cadence and an elapsed-time accumulator. |
| Movement and countdown disagree | Frame counters mixed with clock time | Trace both update frequency and clock substitutions. |
| Huge jump after returning to a tab | Paused time was accumulated | Reset frame timestamp/accumulator and honor visibility changes. |
| No sound until clicking | Browser autoplay policy | Unlock/resume audio from a real user gesture. |
| Sound seems too high | Pitch conversion, transposition, or bright timbre | Check note frequencies independently of tempo and waveform. |
| Sounds overlap or never stop | Repeat timers or node cleanup | Verify original stop/concurrency rules and dispose active resources. |
| Sprite disappears at edges | Clip/translation/anchor mismatch | Compare logical coordinate spaces and clip intersections. |
| UI fits but text layout differs | Font metrics | Compare measurements and investigate matching authorized font data. |
| Key remains held after switching tabs | Input lifecycle | Release sources on blur, pause, and pointer cancellation. |
| Releasing jump stops movement | Original release semantics | Inspect input handlers before adding a game-specific accommodation. |
| Back/Save disappears in a form | Native commands placed in a hidden container | Keep commands reachable in the active form and preserve callbacks. |
| Saves disappear on a different port | Origin-scoped storage | Check scheme/host/port and record-store namespace. |
| New run retains old state | Repeated entry point with Java static state | Verify reset semantics; reload when reinitialization is unsupported. |

## 18. What can become a reusable framework

Reuse stable pieces only after identifying the next game's actual needs:

| Usually reusable | Usually game/version-specific |
| --- | --- |
| Build tooling and TeaVM setup | Original JAR identity and entry point |
| Browser Canvas/audio/storage services | Loop and lifecycle bytecode adaptations |
| Correctly implemented J2ME API semantics | Required API subset and vendor extensions |
| Input-source tracking and browser pause handling | Key codes and original input quirks |
| Resource preloading and hash verification | Resource resolution and file formats |
| Fullscreen/touch UI building blocks | Logical resolution and rendering expectations |
| Test harness infrastructure | State diagnostics and expected gameplay behavior |
| OTT decoder for actual Nokia OTT data | Other formats, concurrency, and speaker assumptions |

If several ports share the same implementation, extract a tested platform
library plus small per-game adapters. Include a game-specific storage namespace
and explicit timing/pitch preferences.

Avoid building a broad configuration system before a second game demonstrates
what is genuinely shared. The present hardcoded transformer should remain an
explicit example, not be disguised as a generic automatic converter.

## 19. Completion checklist

- [ ] Rights and redistribution terms are established for this exact artifact.
- [ ] The original JAR is preserved and its identity recorded.
- [ ] Required APIs, loop behavior, and thread assumptions are understood.
- [ ] Transformations are bounded, checked, and game/version-specific.
- [ ] Original game logic, resources, maps, and story are retained.
- [ ] Bytecode and compatibility classes compile through TeaVM.
- [ ] Original menus, forms, gameplay, pause/resume, and exit work.
- [ ] Input behavior is checked with keyboard and simultaneous touch sources.
- [ ] Timing is measured and stable across browser refresh rates.
- [ ] Audio format, notes, durations, repeats, and cleanup are checked.
- [ ] Pitch/speed preferences are distinguished from reference fidelity.
- [ ] Original save semantics work and storage failures are explicit.
- [ ] Browser tests and appropriate reference comparisons pass.
- [ ] Every unverified route or platform difference is documented.
- [ ] Production paths, HTTPS, MIME types, and credits/licenses are verified.

The central principle is simple: **keep the original game responsible for the
game, and replace only the environment it needs to run in.**
