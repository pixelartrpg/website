# Pixel Art RPG: Secret of the Dreamers — Site Handoff

A SNES-inspired marketing site for the in-development game **Pixel Art RPG: Secret of the Dreamers**. Single continuous horizontally-scrolling world covering Home → About → Features → Dev Blog. Built by Dagor & Larimaria (husband & wife dev team).

Live reference for studio info: https://pixelartrpg.com/team

---

## How to continue this project on a fresh Claude account

1. Upload this whole folder to the new project.
2. Open `index.html` to see the site.
3. Paste this block as your first message to Claude so it picks up where we left off:

> "This is an existing static site for my pixel-art RPG (Secret of the Dreamers). It's a horizontally-scrolling SNES-inspired world covering Home, About, Features, and Dev Blog as one continuous walk. Read `HANDOFF.md` first, then `index.html` and the JSX files. I want to keep iterating on the design. Don't ask me clarifying questions — just read the code and make changes when I ask."

---

## Tech stack

- **Pure static HTML + JSX** — no build step, deploys directly to GitHub Pages / Netlify / any static host.
- React 18 + ReactDOM + Babel Standalone loaded from unpkg via pinned `<script>` tags with integrity hashes (in `index.html`).
- All JSX files load via `<script type="text/babel" src="...">` and share scope through `window.*` globals.
- No npm, no bundler, no Tailwind — just CSS in `styles.css` and JSX files.
- There's a bundled single-file copy at `dist/index.html` (generated; do NOT edit by hand — regenerate from sources).

## File map

```
index.html              Entry point. Loads fonts, React, Babel, then all JSX in order.
styles.css              All styles. Heavy use of CSS vars for theming.
app.jsx                 Main <App> — router, horizontal scroll engine, dialogue state,
                        wheel-snap logic, palette/sound/day-night state.
components.jsx          ParallaxLandscape, FloatingDialogue, pixel sprites (HeroSprite,
                        SlimeSprite, ChestSprite, CrystalSprite), Bouncing wrapper.
tweaks-panel.jsx        Starter — TweaksPanel + TweakSection/Toggle/Color etc.
pages/
  home.jsx              5 panels: Hero · Pitch · 6-feature loop · World key art · Open Dev
  about.jsx             6 panels: Intro · Mission · Pillars · Roadmap · The Team · Brief
  features.jsx          9 panels: Intro · Progression · Disciplines · Town · Quests ·
                        Items · Time · Puzzles · Endgame
  blog.jsx              4 panels: Intro+filter · Featured post · Archive · Patch notes
assets/
  logo.png              Game logo (hero centerpiece)
  key-art.jpg           Key art image (currently unused after logo swap)
  skill-layout.png      In-game UI preview (used in home panel 04 "THE WORLD")
  moon.png              User-provided moon icon (night-mode nav button)
  sun.png               Pixel sun (Claude-generated to match moon style — REPLACE with user art when ready)
  dagor.png             EMPTY — needs the head.png from pixelartrpg.com/team
  larimaria.png         EMPTY — needs head2.png from pixelartrpg.com/team
dist/                   Bundled output (single-file). Regenerate when source changes.
```

## Architecture: how the horizontal scroll works

This is the most important non-obvious thing to understand.

- The whole site lives inside `<main class="scroll-stage">` which is `position: absolute; inset: 0; overflow-x: auto; display: flex`.
- Every "page" (Home, About, etc.) renders its panels as direct flex children. There are NO route swaps — all four pages are mounted simultaneously as one long horizontal strip.
- Each panel is `.h-panel { flex: 0 0 100vw; width: 100vw; height: 100vh }` — strictly full viewport.
- `scroll-snap-type: x mandatory` on the stage + `scroll-snap-align: start` on each `.h-panel` makes the browser snap-stop on each panel.
- Wheel-to-snap is handled manually in `app.jsx` `onWheel`:
  - Wheel events accumulate into `wheelAccum`; only when |accum| > 80 does a snap fire.
  - Direction-flip resets the accumulator. 200ms decay timer auto-zeros when wheel goes idle.
  - On fire: 900ms lockout, then `animateScrollTo(targetIdx * cw, 600)` with rAF + easeOutCubic.
  - During the animation, `scroll-snap-type` is set to `none` to prevent the browser fighting the JS scroll; restored after.
- `Anchor` components (`<div className="page-anchor" data-page="...">`) are 0-width markers between pages. Scrolling detects which anchor is most recently passed to track `activePage` and update the URL hash.

## Per-panel dialogue

`DIALOGUE_BY_PANEL` array in `app.jsx` — one entry per panel in scroll order (24 panels total). As the user scrolls, `panelIdx = Math.round(scrollLeft / clientWidth)` picks the right line. Speakers rotate: Innkeeper (Home) → Wandering Bard (About) → Quartermaster (Features) → Lead Designer (Blog) → Caretaker (End).

**When adding or removing a panel, update DIALOGUE_BY_PANEL too** — entries are positional.

## Parallax background

`ParallaxLandscape` in `components.jsx` is fixed full-viewport and reads `scrollX` from the parent. 8 layers:
1. Sky gradient (CSS)
2. Stars (fades in via `[data-time="night"]`)
3. Pixel sun
4. Animated clouds (rAF tick, slowest parallax)
5. Far mountains
6. Near mountains w/ snow caps
7. Forest of pixel pines
8. Foreground grass + tufts (fastest)

Each scrolling layer uses an SVG `<pattern>` repeated across a 300%-wide rect, translated by `wrap(scrollX * speed, 1600)` modulo so it loops seamlessly. **The user wants to swap these for their own PNG art eventually** — switch from inline SVG patterns to `<img>` with `background-image: url(...); background-repeat: repeat-x`.

## Theming

CSS variables on `<html>`:
- `data-palette="earthy|twilight|ember"` — 3 palettes defined in `styles.css`
- `data-time="day|night"` — overrides sky, mountains, stars on top of any palette
- `body.scanlines` — optional CRT scanline overlay

Tweaks panel (toolbar toggle) exposes Palette + Click SFX + Scanlines. State persists via the `__edit_mode_set_keys` postMessage protocol — the `TWEAK_DEFAULTS` JSON block in `app.jsx` is the source of truth.

## Fixed UI

- **Top-right corner**: two icon buttons (sun/moon for day-night, ♪/✕ for sound). Fixed at `top:44 right:34`. `.nav-wrap` is `pointer-events: none` with children re-enabled so the area between them doesn't block scroll.
- **Bottom-left**: `FloatingDialogue` — game-style speaker box with dismiss button. Re-mounts text/avatar/speaker via React `key` to play the steps fade-in animation on change.
- **Bottom-right**: "WORLD" progress bar showing % of total scroll consumed.

## Known TODOs / open items

1. **Team portraits** — `assets/dagor.png` and `assets/larimaria.png` are placeholders. User needs to drop their `head.png` and `head2.png` from pixelartrpg.com/team into those filenames (Claude can't fetch them due to sandbox CORS).
2. **Sun PNG** — Claude-generated to match the moon style. User said they'll replace with their own pixel-art sun later.
3. **Parallax art swap** — long-term, replace the SVG-pattern layers with the user's hand-drawn PNGs (clouds, mountains, forest, grass).
4. **Real blog posts** — `pages/blog.jsx` ships 6 placeholder posts. Replace with real posts as they write them.
5. **Key art usage** — `assets/key-art.jpg` was the original hero image; replaced by the logo. Currently unreferenced.
6. **Wishlist link** — all "Wishlist on Steam" buttons are currently no-op. Hook up a real Steam URL when the page is live.

## Style/voice rules

- **Don't add filler content.** The site is intentionally lean. Every section earns its place.
- **Don't auto-add sections** — ask first before suggesting new panels.
- **Tone is in-game flavor**: speakers like Innkeeper / Quartermaster / Bard / Lead Designer. Copy is warm and conversational, not corporate marketing.
- **Type**: Press Start 2P for tiny UI labels, VT323 for large pixel headlines, Nunito for body. Don't introduce new fonts.
- **Color**: stick to the 3 palettes. Use CSS vars, never hardcoded hex.
- **Animations**: chunky steps-based, not smooth/easing. `steps(N)` is the move — it preserves the 16-bit feel.

## Local preview

Just open `index.html` in a browser — works directly via `file://`. No dev server needed (Babel compiles JSX in-browser).

For a real deploy to GitHub Pages: push the root of this folder (or the `dist/` folder if you want the single-file bundle). Configure Pages from your repo settings.

---

**Built by Dagor & Larimaria · 2025–2026**
