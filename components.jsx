/* ============ Parallax pixel landscape ============ */
/* Fixed full-viewport backdrop. Translates with horizontal scroll. */

// Biome library — each biome defines optional sky image, optional chrome hides,
// and an array of 7 PNG basenames (or null) for: mtn-far · mtn-near · forest-far
// · forest-mid · forest-near · grass-hill · grass-tufts (back → front).
const BIOMES = {
  forest: {
    layers: ['bg-mountains-far', 'bg-mountains-near', 'bg-forest-far', 'bg-forest-mid', 'bg-forest-near', 'bg-grass-hill', 'bg-grass-tufts']
  },
  dead: {
    bgImage: 'dead-bg',
    layers: ['dead-mtn-far', 'dead-mtn-near', 'dead-forest-far', null, 'dead-forest-near', 'dead-grass-hill', null]
  },
  cave: {
    bgImage: 'cave-bg', hideSun: true, hideStars: true, hideClouds: true,
    layers: ['cave-mtn-far', 'cave-mtn-near', 'cave-forest-far', 'cave-forest-mid', 'cave-forest-near', 'cave-grass-hill', null]
  },
  dock: {
    bgImage: 'dock-bg',
    layers: ['dock-mtn-far', 'dock-mtn-near', 'dock-forest-far', 'dock-forest-mid', 'dock-forest-near', 'dock-grass-hill', 'dock-water']
  },
  snow: {
    bgImage: 'snow-bg',
    layers: [null, 'snow-mtn-near', 'snow-forest-far', 'snow-forest-mid', null, null, 'snow-grass-tufts']
  }
};
const LAYER_CLASSES = ['pl-mtn-far', 'pl-mtn-near', 'pl-forest-far', 'pl-forest-mid', 'pl-forest-near', 'pl-grass-hill', 'pl-grass-tufts'];

function ParallaxLandscape({ scrollX = 0, biome = 'forest' }) {
  return (
    <div className="parallax-bg" data-biome={biome} style={{ '--sx': scrollX + 'px' }}>
      <div className="stars"></div>
      <div className="sun" style={{ transform: `translateX(${(-((scrollX * 0.02) % 600) + 600) % 600}px)` }}></div>
      <Clouds scrollX={scrollX} />
      {Object.entries(BIOMES).map(([key, b]) => (
        <div key={key} data-biome={key} className={"biome-group" + (key === biome ? ' active' : '')}>
          {b.bgImage && <div className="biome-bg" style={{ backgroundImage: `url(assets/${b.bgImage}.png)` }}></div>}
          {b.layers.map((file, i) => file ? (
            <div key={i} className={"pl " + LAYER_CLASSES[i]} style={{ backgroundImage: `url(assets/${file}.png)` }}></div>
          ) : null)}
        </div>
      ))}
    </div>
  );
}

// Hand-painted cloud sprites — placed across a virtual band wider than viewport,
// drift left over time, and parallax with scrollX. The band wraps modulo BAND.
const CLOUD_SPRITES = [
  { src: 'assets/cloud-1.png', w: 740, h: 292 },
  { src: 'assets/cloud-2.png', w: 255, h: 147 },
  { src: 'assets/cloud-3.png', w: 396, h: 192 },
  { src: 'assets/cloud-4.png', w: 324, h: 147 },
  { src: 'assets/cloud-5.png', w: 324, h:  87 }
];

// One row per cloud instance laid out across the band.
// xBase = base offset in band (px), yPct = vertical % of band, scale = render scale, speed = drift px/s
const CLOUD_INSTANCES = [
  { sprite: 0, xBase:    0, yPct:  6, scale: 0.55, speed:  6 },
  { sprite: 2, xBase:  900, yPct: 22, scale: 0.50, speed:  9 },
  { sprite: 1, xBase: 1500, yPct: 10, scale: 0.60, speed: 12 },
  { sprite: 4, xBase: 2100, yPct: 34, scale: 0.55, speed:  7 },
  { sprite: 3, xBase: 2700, yPct: 16, scale: 0.45, speed: 10 },
  { sprite: 0, xBase: 3400, yPct: 28, scale: 0.40, speed:  5 },
  { sprite: 2, xBase: 4200, yPct:  8, scale: 0.55, speed:  8 },
  { sprite: 1, xBase: 4800, yPct: 26, scale: 0.50, speed: 11 },
  { sprite: 4, xBase: 5400, yPct: 14, scale: 0.65, speed:  6 },
  { sprite: 3, xBase: 6100, yPct: 32, scale: 0.50, speed:  9 }
];
const CLOUD_BAND = 7200; // virtual horizontal length to repeat across

function Clouds({ scrollX = 0 }) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf;
    const tick = () => {
      setT(performance.now() / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Render each instance twice (one band-width apart) so they wrap seamlessly
  return (
    <div className="layer clouds-layer" style={{
      top: 0, left: 0, height: '60%', width: '100%',
      pointerEvents: 'none', overflow: 'hidden'
    }}>
      {CLOUD_INSTANCES.map((c, i) => {
        const s = CLOUD_SPRITES[c.sprite];
        const w = s.w * c.scale;
        const h = s.h * c.scale;
        // wrap base x by band, then offset by drift and parallax
        const drift = (c.xBase - t * c.speed - scrollX * 0.02) % CLOUD_BAND;
        const baseX = drift < -w ? drift + CLOUD_BAND : drift;
        const y = `calc(${c.yPct}% )`;
        return (
          <React.Fragment key={i}>
            <img src={s.src} alt=""
              style={{
                position: 'absolute',
                left: baseX, top: y,
                width: w, height: h,
                imageRendering: 'pixelated',
                opacity: 0.95
              }} />
            <img src={s.src} alt=""
              style={{
                position: 'absolute',
                left: baseX - CLOUD_BAND, top: y,
                width: w, height: h,
                imageRendering: 'pixelated',
                opacity: 0.95
              }} />
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* Floating game-style dialogue popup */
function FloatingDialogue({ speaker, avatar, text }) {
  const [visible, setVisible] = React.useState(true);
  return (
    <div className={"floating-dialogue " + (visible ? '' : 'hidden')}>
      <div className="dialogue">
        <div className="speaker" key={'spk-' + speaker}>{speaker}</div>
        <div className="avatar" key={'av-' + avatar}>{avatar}</div>
        <div className="dialogue-text" key={'txt-' + text}>{text}</div>
        <div className="cursor"></div>
        <button className="dialogue-close" onClick={() => setVisible(false)} title="Close">✕</button>
      </div>
      {!visible && (
        <button className="dialogue-reopen" onClick={() => setVisible(true)}>
          <span style={{ fontSize: 16 }}>{avatar}</span>
          <span className="pf" style={{ fontSize: 9, marginLeft: 6 }}>TALK</span>
        </button>
      )}
    </div>
  );
}

/* ============ Pixel sprite ============ */
/* Tiny hero sprite drawn from a grid */
function HeroSprite({ scale = 6, color = "tan" }) {
  // 12x14 character: simple knight
  const palette = {
    skin: "#f4c89c",
    hair: "#5a3a1a",
    armor: "#888",
    armorDark: "#444",
    accent: "var(--gold)",
    cape: "var(--crimson)",
    boots: "#3a1808"
  };
  // Each row is array of color keys, '.' is transparent
  const rows = [
    "....HHHH....",
    "...HHHHHH...",
    "..HSSSSSSH..",
    "..HSEESEH...",
    "...SSSSS....",
    "..CAAAAAC...",
    ".CCAAAAACC..",
    ".CCAGGAACC..",
    ".CCAAAAACC..",
    "..AAAAAAAA..",
    "..A......A..",
    "..A......A..",
    ".BB......BB.",
    ".BB......BB."
  ];
  const map = { H: palette.hair, S: palette.skin, E: '#222', A: palette.armor, C: palette.cape, G: palette.accent, B: palette.boots };
  return (
    <svg width={12 * scale} height={14 * scale} viewBox="0 0 12 14" style={{ imageRendering: 'pixelated' }}>
      {rows.map((row, y) =>
        row.split('').map((c, x) => c !== '.' ? <rect key={x+','+y} x={x} y={y} width="1" height="1" fill={map[c]} /> : null)
      )}
    </svg>
  );
}

/* Slime enemy */
function SlimeSprite({ scale = 6 }) {
  const rows = [
    "....SSSS....",
    "..SSGGGGSS..",
    ".SGGGGGGGGS.",
    "SGGGGGGGGGGS",
    "SGGGGEGGEGGS",
    "SGGGGGGGGGGS",
    ".SGGGGGGGGS.",
    "..SSSSSSSS.."
  ];
  const map = { S: '#3a5a40', G: '#588157', E: '#222' };
  return (
    <svg width={12 * scale} height={8 * scale} viewBox="0 0 12 8">
      {rows.map((row, y) =>
        row.split('').map((c, x) => c !== '.' ? <rect key={x+','+y} x={x} y={y} width="1" height="1" fill={map[c]} /> : null)
      )}
    </svg>
  );
}

/* Treasure chest */
function ChestSprite({ scale = 6, open = false }) {
  const rows = open ? [
    ".GGGGGGGG.",
    "GLLLLLLLLG",
    "G......G.G",
    "GGGGGGGGGG",
    "WWWWWWWWWW",
    "WWGWWWGWWW",
    "WWWWWWWWWW",
    "BBBBBBBBBB"
  ] : [
    "..........",
    ".GGGGGGGG.",
    "GLLLLLLLLG",
    "GLLLLLLLLG",
    "WWWWGGWWWW",
    "WWWWGGWWWW",
    "WWWWWWWWWW",
    "BBBBBBBBBB"
  ];
  const map = { G: '#d4a01c', L: '#f4c542', W: '#8a5a44', B: '#3a1808' };
  return (
    <svg width={10 * scale} height={8 * scale} viewBox="0 0 10 8">
      {rows.map((row, y) =>
        row.split('').map((c, x) => c !== '.' ? <rect key={x+','+y} x={x} y={y} width="1" height="1" fill={map[c]} /> : null)
      )}
    </svg>
  );
}

/* Crystal */
function CrystalSprite({ scale = 6, color = '#7ac8e8' }) {
  const rows = [
    "...CC...",
    "..CCCC..",
    ".CCCCCC.",
    "CCCCCCCC",
    "CCDDCCCC",
    "CCCCCCCC",
    ".CCCCCC.",
    "..CCCC..",
    "...CC..."
  ];
  const map = { C: color, D: '#ffffff' };
  return (
    <svg width={8 * scale} height={9 * scale} viewBox="0 0 8 9">
      {rows.map((row, y) =>
        row.split('').map((c, x) => c !== '.' ? <rect key={x+','+y} x={x} y={y} width="1" height="1" fill={map[c]} /> : null)
      )}
    </svg>
  );
}

/* Bouncing wrapper */
function Bouncing({ children, delay = 0, dist = 6 }) {
  return (
    <div style={{
      display: 'inline-block',
      animation: `bounceY 1.4s steps(4) infinite`,
      animationDelay: `${delay}s`
    }}>{children}</div>
  );
}

Object.assign(window, { ParallaxLandscape, FloatingDialogue, HeroSprite, SlimeSprite, ChestSprite, CrystalSprite, Bouncing });
