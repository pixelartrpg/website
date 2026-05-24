/* ============ Parallax pixel landscape ============ */
/* Fixed full-viewport backdrop. Translates with horizontal scroll. */

function ParallaxLandscape({ scrollX = 0 }) {
  // wrap each layer's translate by its width so it loops
  const wrap = (x, w) => -((x % w) + w) % w;

  return (
    <div className="parallax-bg">
      <div className="stars"></div>
      <div className="sun" style={{ transform: `translateX(${wrap(scrollX * 0.02, 600)}px)` }}></div>

      {/* Far mountains — tiled wide */}
      <svg className="layer" viewBox="0 0 1600 400" preserveAspectRatio="none"
        style={{
          bottom: 180, height: 240,
          width: '300%', left: 0,
          transform: `translateX(${wrap(scrollX * 0.08, 1600)}px)`
        }}>
        <defs>
          <pattern id="farMtn" x="0" y="0" width="1600" height="400" patternUnits="userSpaceOnUse">
            <polygon points="0,400 0,260 120,180 220,240 380,140 520,220 680,160 820,240 960,180 1100,250 1240,170 1380,230 1500,180 1600,220 1600,400" fill="var(--mountain-far)" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="4800" height="400" fill="url(#farMtn)" />
      </svg>

      {/* Near mountains — tiled */}
      <svg className="layer" viewBox="0 0 1600 400" preserveAspectRatio="none"
        style={{
          bottom: 100, height: 280,
          width: '300%', left: 0,
          transform: `translateX(${wrap(scrollX * 0.16, 1600)}px)`
        }}>
        <defs>
          <pattern id="nearMtn" x="0" y="0" width="1600" height="400" patternUnits="userSpaceOnUse">
            <polygon points="0,400 0,300 100,240 200,300 320,200 460,280 580,220 720,300 860,240 1000,300 1140,220 1280,280 1400,240 1520,290 1600,260 1600,400" fill="var(--mountain-near)" />
            <polygon points="320,200 290,230 350,230" fill="var(--cloud)" opacity="0.7" />
            <polygon points="580,220 555,245 605,245" fill="var(--cloud)" opacity="0.7" />
            <polygon points="1140,220 1115,245 1165,245" fill="var(--cloud)" opacity="0.7" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="4800" height="400" fill="url(#nearMtn)" />
      </svg>

      {/* Forest mid — tiled */}
      <svg className="layer" viewBox="0 0 1600 200" preserveAspectRatio="none"
        style={{
          bottom: 80, height: 160,
          width: '300%', left: 0,
          transform: `translateX(${wrap(scrollX * 0.28, 1600)}px)`
        }}>
        <defs>
          <pattern id="forest" x="0" y="0" width="1600" height="200" patternUnits="userSpaceOnUse">
            {Array.from({ length: 24 }).map((_, i) => {
              const x = i * 70 + (i % 2 ? 20 : 0);
              const h = 40 + (i % 3) * 14;
              return (
                <g key={i} transform={`translate(${x}, ${130 - h})`}>
                  <rect x="14" y={h - 14} width="6" height="14" fill="var(--bg-deep)" />
                  <polygon points={`0,${h-12} 17,${0} 34,${h-12}`} fill="var(--grass-dark)" />
                  <polygon points={`4,${h-4} 17,${h-30} 30,${h-4}`} fill="var(--grass)" />
                </g>
              );
            })}
          </pattern>
        </defs>
        <rect x="0" y="0" width="4800" height="200" fill="url(#forest)" />
      </svg>

      {/* Foreground grass with tufts — tiled */}
      <svg className="layer" viewBox="0 0 1600 120" preserveAspectRatio="none"
        style={{
          bottom: 0, height: 140,
          width: '300%', left: 0,
          transform: `translateX(${wrap(scrollX * 0.45, 1600)}px)`
        }}>
        <defs>
          <pattern id="grass" x="0" y="0" width="1600" height="120" patternUnits="userSpaceOnUse">
            <rect x="0" y="40" width="1600" height="80" fill="var(--grass)" />
            <rect x="0" y="60" width="1600" height="60" fill="var(--grass-dark)" />
            {Array.from({ length: 40 }).map((_, i) => {
              const x = i * 42 + (i % 3) * 6;
              return (
                <g key={i}>
                  <rect x={x} y="32" width="3" height="10" fill="var(--grass-dark)" />
                  <rect x={x + 4} y="36" width="3" height="6" fill="var(--grass-dark)" />
                  <rect x={x - 3} y="38" width="3" height="4" fill="var(--grass-dark)" />
                </g>
              );
            })}
          </pattern>
        </defs>
        <rect x="0" y="0" width="4800" height="120" fill="url(#grass)" />
      </svg>

      <Clouds scrollX={scrollX} />
    </div>
  );
}

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
  const clouds = [
    { y: '8%', w: 90, speed: 8 },
    { y: '20%', w: 64, speed: 12 },
    { y: '14%', w: 110, speed: 6 },
    { y: '32%', w: 80, speed: 10 },
    { y: '5%', w: 70, speed: 14 }
  ];
  return (
    <svg className="layer clouds-layer" viewBox="0 0 1600 600" preserveAspectRatio="none"
      style={{ top: 0, height: '60%', transform: `translateX(${-scrollX * 0.02}px)` }}>
      {clouds.map((c, i) => {
        const x = ((i * 320 + t * c.speed) % 1900) - 200;
        return <PixelCloud key={i} x={x} y={parseFloat(c.y) * 6} w={c.w} />;
      })}
    </svg>
  );
}

function PixelCloud({ x, y, w }) {
  const u = w / 12;
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect x={u*2} y={0} width={u*8} height={u*2} fill="var(--cloud)" />
      <rect x={u*1} y={u*1} width={u*10} height={u*2} fill="var(--cloud)" />
      <rect x={0} y={u*2} width={u*12} height={u*2} fill="var(--cloud)" />
      <rect x={u*1} y={u*3} width={u*10} height={u*1} fill="var(--cloud)" opacity="0.6" />
    </g>
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
