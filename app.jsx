/* App — one continuous horizontal world covering all four pages */
const { useState, useEffect, useRef, useCallback } = React;

/* ============ Audio: WebAudio 8-bit blip ============ */
const audioCtx = (function() {
  let ctx = null;
  return {
    play(freq = 440, dur = 0.08, type = 'square') {
      try {
        if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = type;
        o.frequency.value = freq;
        g.gain.value = 0.05;
        o.connect(g); g.connect(ctx.destination);
        const t = ctx.currentTime;
        g.gain.setValueAtTime(0.05, t);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.start(t); o.stop(t + dur);
      } catch (e) {}
    }
  };
})();
window.blip = (f, d, t) => audioCtx.play(f, d, t);

const PAGE_ORDER = ['home', 'features', 'about'];
const PAGE_LABELS = { home: 'Home', about: 'About', features: 'Features' };

// Biome by panel index. New order along the walk:
// home (0-1) plains/forest · features (2-10) dock · about (11-18) dead · end (19) cave
function getBiomeForPanel(idx) {
  if (idx <= 1) return 'forest';
  if (idx <= 9) return 'dock';
  if (idx <= 14) return 'snow';
  return 'cave';
}

// Per-panel dialogue. The speaker / avatar / line update as you walk through the world.
const DIALOGUE_BY_PANEL = [
  // —— HOME ——
  { speaker: 'Innkeeper', avatar: '🍺', text: "Welcome, traveler! Word's spreading about a new game coming called Secret Of The Dreamers — they say its going to be lots of fun." },

  // —— FEATURES ——
  { speaker: 'Quartermaster', avatar: '⚔️', text: "The systems board, hero! Every gear, lever, and dial that makes this game tick. Walk it with me adventurer to learn more about the games features." },
  { speaker: 'Quartermaster', avatar: '⚔️', text: "Two tracks. Levels for your character, Affinity for your discipline. Two characters can share a level and play nothing alike." },
  { speaker: 'Quartermaster', avatar: '⚔️', text: "Eighty-Two disciplines. Start with one of four. Specialize into twelve. If you're brave, push into sixity six masteries." },
  { speaker: 'Quartermaster', avatar: '⚔️', text: "Forty-two buildings, eight categories, four upgrade tiers. The whole town visibly grows as you do. Adjacency matters." },
  { speaker: 'Quartermaster', avatar: '⚔️', text: "Ten chapters of story. Over 150 quests. Side stuff, repeatable runs, faction missions, dungeons, dreamscapes, nigthmares! Oh my." },
  { speaker: 'Quartermaster', avatar: '⚔️', text: "Loot, my favorite. Five tiers, a hundred-plus affixes, sockets, enchanting with risk zones. You'll be theorycrafting in the tavern for hours." },
  { speaker: 'Quartermaster', avatar: '⚔️', text: "The world keeps its own clock. Seven periods. NPCs sleep. Shops close. Rare drops only show their face at certain hours." },
  { speaker: 'Quartermaster', avatar: '⚔️', text: "Puzzles. Real ones. Every secret can be solved with observation — no random trial-and-error. Sharpen your eye." },
  { speaker: 'Quartermaster', avatar: '⚔️', text: "After the story? Pick a faction — permanently. Then dungeon forever with Perk + Downside upgrades that scale to infinity." },

  // —— ABOUT (now includes the relocated Pitch + World panels) ——
  { speaker: 'Wandering Musician', avatar: '🎶', text: "The folks here are mad — they say one game can have ARPG loot, town-building AND 16-bit charm. So they're building it anyway." },
  { speaker: 'Wandering Musician', avatar: '🎶', text: "Ah, the campfire! Sit a while. Let me tell you who's behind all this — and why they couldn't stop themselves from making it." },
  { speaker: 'Wandering Musician', avatar: '🎶', text: "Six pillars they won't bend on: hand-drawn art, deep systems, the community, respecting your time, real music, and zero p2w microtransactions." },
  { speaker: 'Wandering Musician', avatar: '🎶', text: "The road behind them is long. The road ahead — combat, town, story, beta. They post the map every week so you can follow along." },
  { speaker: 'Wandering Musician', avatar: '🎶', text: "Just two souls walk this road. Husband and wife. Developer and pixel artist. Small crew. Big game." },

  // —— END ——
  { speaker: 'Caretaker', avatar: '🕯️', text: "Edge of the world for now, traveler. Come back when the lanterns are lit again. Thank you for exploring our world." }
];

const DIALOGUES = {
  home: DIALOGUE_BY_PANEL[0],
  about: DIALOGUE_BY_PANEL[5],
  features: DIALOGUE_BY_PANEL[11]
};

function App() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "palette": "earthy",
    "sound": true,
    "scanlines": false,
    "previewBg": false
  }/*EDITMODE-END*/;

  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [activePage, setActivePage] = useState('home');
  const [time, setTime] = useState('night');
  const [scrollX, setScrollX] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const [panelIdx, setPanelIdx] = useState(0);
  const stageRef = useRef(null);

  const dialogue = DIALOGUE_BY_PANEL[Math.min(panelIdx, DIALOGUE_BY_PANEL.length - 1)] || DIALOGUE_BY_PANEL[0];
  const biome = getBiomeForPanel(panelIdx);

  // scroll to a page section (manually animated, snap disabled during)
  const animateScrollTo = useCallback((targetLeft, duration = 500) => {
    const stage = stageRef.current;
    if (!stage) return;
    const startLeft = stage.scrollLeft;
    const distance = targetLeft - startLeft;
    if (Math.abs(distance) < 2) return;
    stage.style.scrollSnapType = 'none';
    const start = performance.now();
    const ease = t => 1 - Math.pow(1 - t, 3); // easeOutCubic
    function step(now) {
      const t = Math.min(1, (now - start) / duration);
      stage.scrollLeft = startLeft + distance * ease(t);
      if (t < 1) requestAnimationFrame(step);
      else stage.style.scrollSnapType = '';
    }
    requestAnimationFrame(step);
  }, []);

  const scrollToPage = useCallback((pageId) => {
    const stage = stageRef.current;
    if (!stage) return;
    const target = stage.querySelector(`#page-${pageId}`);
    if (!target) return;
    animateScrollTo(target.offsetLeft, 600);
  }, [animateScrollTo]);

  // handle initial hash (e.g. user lands on #about)
  useEffect(() => {
    const initial = (window.location.hash || '#home').replace('#', '');
    if (PAGE_ORDER.includes(initial)) {
      // wait for layout
      setTimeout(() => scrollToPage(initial), 80);
    }
    const onHash = () => {
      const r = (window.location.hash || '#home').replace('#', '');
      if (PAGE_ORDER.includes(r)) scrollToPage(r);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [scrollToPage]);

  // wheel-to-horizontal + scroll tracker + active page detection
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let wheelLock = false;
    let wheelAccum = 0;
    let wheelDecayTimer = null;
    const WHEEL_THRESHOLD = 80;  // accumulated delta needed to trigger a snap
    const WHEEL_LOCKOUT = 900;   // ms before another snap can fire
    const onWheel = (e) => {
      if (Math.abs(e.deltaY) < 1 && Math.abs(e.deltaX) > 1) return;
      e.preventDefault();
      if (wheelLock) return;
      const delta = e.deltaY || e.deltaX;
      // accumulate deltas; reset accumulation if direction flips
      if (Math.sign(delta) !== Math.sign(wheelAccum) && wheelAccum !== 0) wheelAccum = 0;
      wheelAccum += delta;
      // auto-decay accumulation if no wheel activity for a bit
      clearTimeout(wheelDecayTimer);
      wheelDecayTimer = setTimeout(() => { wheelAccum = 0; }, 200);
      if (Math.abs(wheelAccum) < WHEEL_THRESHOLD) return;
      wheelLock = true;
      const dir = wheelAccum > 0 ? 1 : -1;
      wheelAccum = 0;
      const cw = stage.clientWidth;
      const currentIdx = Math.round(stage.scrollLeft / cw);
      const targetIdx = currentIdx + dir;
      const maxIdx = Math.round((stage.scrollWidth - cw) / cw);
      const clampedIdx = Math.max(0, Math.min(maxIdx, targetIdx));
      animateScrollTo(clampedIdx * cw, 600);
      setTimeout(() => { wheelLock = false; }, WHEEL_LOCKOUT);
    };
    const onScroll = () => {
      const x = stage.scrollLeft;
      setScrollX(x);
      const max = stage.scrollWidth - stage.clientWidth;
      setScrollPct(max > 0 ? x / max : 0);

      // panel index from current scroll position
      const cw = stage.clientWidth;
      const idx = Math.max(0, Math.round(x / cw));
      setPanelIdx(prev => prev === idx ? prev : idx);

      const markers = stage.querySelectorAll('.page-anchor');
      let current = 'home';
      const probe = x + stage.clientWidth * 0.35;
      markers.forEach(m => {
        if (m.offsetLeft <= probe) current = m.dataset.page;
      });
      setActivePage(prev => prev === current ? prev : current);
    };
    const onKey = (e) => {
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        const cw = stage.clientWidth;
        const idx = Math.round(stage.scrollLeft / cw) + 1;
        animateScrollTo(idx * cw, 450);
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        const cw = stage.clientWidth;
        const idx = Math.max(0, Math.round(stage.scrollLeft / cw) - 1);
        animateScrollTo(idx * cw, 450);
      } else if (e.key === 'Home') {
        animateScrollTo(0, 800);
      } else if (e.key === 'End') {
        animateScrollTo(stage.scrollWidth, 800);
      }
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    stage.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    const onNextHintClick = (e) => {
      const hint = e.target.closest('.next-hint');
      if (!hint || !stage.contains(hint)) return;
      const cw = stage.clientWidth;
      const idx = Math.round(stage.scrollLeft / cw) + 1;
      const maxIdx = Math.round((stage.scrollWidth - cw) / cw);
      animateScrollTo(Math.min(maxIdx, idx) * cw, 500);
    };
    stage.addEventListener('click', onNextHintClick);
    onScroll();
    return () => {
      stage.removeEventListener('wheel', onWheel);
      stage.removeEventListener('scroll', onScroll);
      stage.removeEventListener('click', onNextHintClick);
      window.removeEventListener('keydown', onKey);
    };
  }, [animateScrollTo]);

  // sync hash with active page (so URL is sharable, but don't trigger scroll loop)
  useEffect(() => {
    if (window.location.hash.replace('#','') !== activePage) {
      history.replaceState(null, '', '#' + activePage);
    }
  }, [activePage]);

  // palette + time apply to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-palette', tweaks.palette || 'earthy');
    document.documentElement.setAttribute('data-time', time);
    document.body.classList.toggle('scanlines', !!tweaks.scanlines);
    document.body.classList.toggle('preview-bg', !!tweaks.previewBg);
  }, [tweaks.palette, tweaks.scanlines, tweaks.previewBg, time]);

  // global click sound
  useEffect(() => {
    const onClick = (e) => {
      if (!tweaks.sound) return;
      const t = e.target.closest('button, a, .chip, .post-list-item, .toggle');
      if (!t) return;
      const freqs = [523, 587, 659, 698, 784];
      audioCtx.play(freqs[Math.floor(Math.random()*freqs.length)], 0.06, 'square');
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [tweaks.sound]);

  const go = (p) => scrollToPage(p);

  return (
    <>
      <ParallaxLandscape scrollX={scrollX} biome={biome} />
      <TopNav activePage={activePage} go={go}
        time={time} setTime={setTime}
        sound={tweaks.sound} toggleSound={() => setTweak('sound', !tweaks.sound)} />

      <main ref={stageRef} className="scroll-stage">
        <Anchor id="page-home" page="home" />
        <HomePage go={go} />
        <Anchor id="page-features" page="features" />
        <FeaturesPage />
        <Anchor id="page-about" page="about" />
        <AboutPage />
        <Anchor id="page-end" page="about" />
        <EndPanel go={go} />
      </main>

      <FloatingDialogue speaker={dialogue.speaker} avatar={dialogue.avatar} text={dialogue.text} />
      <WorldProgress
        activePage={activePage}
        scrollPct={scrollPct}
        stageRef={stageRef}
        animateScrollTo={animateScrollTo}
      />

      <PaletteTweaks tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

function Anchor({ id, page }) {
  return <div id={id} className="page-anchor" data-page={page} aria-hidden></div>;
}

/* Draggable world-progress meter — vertical bar on the right edge that scrubs
   the horizontal scroll. The fill color changes per section. */
function WorldProgress({ activePage, scrollPct, stageRef, animateScrollTo }) {
  const barRef = useRef(null);
  const draggingRef = useRef(false);
  const [dragging, setDragging] = useState(false);

  const LABEL_BY_PAGE = {
    home: 'THE START',
    about: 'THE STUDIO',
    features: 'THE GAME'
  };
  const label = LABEL_BY_PAGE[activePage] || 'WORLD';
  const color = 'blue';

  const scrubTo = (clientX) => {
    const stage = stageRef.current;
    const bar = barRef.current;
    if (!stage || !bar) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const max = stage.scrollWidth - stage.clientWidth;
    stage.scrollLeft = pct * max;
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    const stage = stageRef.current;
    if (!stage) return;
    draggingRef.current = true;
    setDragging(true);
    stage.style.scrollSnapType = 'none';
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    scrubTo(e.clientX);
  };
  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    scrubTo(e.clientX);
  };
  const onPointerUp = (e) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setDragging(false);
    const stage = stageRef.current;
    if (!stage) return;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) {}
    const cw = stage.clientWidth;
    const idx = Math.round(stage.scrollLeft / cw);
    animateScrollTo(idx * cw, 350);
    setTimeout(() => { stage.style.scrollSnapType = ''; }, 400);
  };

  return (
    <div className={"scroll-progress" + (dragging ? ' dragging' : '')} data-color={color}>
      <span className="wp-label" key={label}>{label}</span>
      <div className="bar"
        ref={barRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="slider"
        aria-label="Scrub through the world"
        aria-valuemin="0" aria-valuemax="100"
        aria-valuenow={Math.round(scrollPct * 100)}>
        <div className="track"></div>
        <div className="fill" style={{ width: (scrollPct * 100) + '%' }}></div>
      </div>
      <span className="wp-pct">{Math.round(scrollPct * 100)}%</span>
    </div>
  );
}

function PageGate({ from, to }) {
  return (
    <section className="h-panel narrow page-gate" aria-hidden>
      <div className="gate-frame">
        <div className="gate-banner-top">
          <span className="pf">⟵ {from.toUpperCase()}</span>
          <span className="pf-dot">·</span>
          <span className="pf">NOW ENTERING ⟶</span>
        </div>
        <div className="gate-sign">
          <div className="gate-arch-top"></div>
          <div className="gate-sign-body">
            <div className="pf-lg gate-name">{to}</div>
            <div className="gate-rune">✦</div>
          </div>
          <div className="gate-post left"></div>
          <div className="gate-post right"></div>
        </div>
        <div className="next-hint" style={{ position: 'absolute', right: 30 }}>
          <div className="arrow">▶</div>
          <div className="lbl">CONTINUE →</div>
        </div>
      </div>
    </section>
  );
}

function EndPanel({ go }) {
  return (
    <section className="h-panel narrow" data-screen-label="End">
      <div className="panel-inner" style={{ display: 'grid', placeContent: 'center', textAlign: 'center' }}>
        <div style={{ maxWidth: 540 }}>
          <div className="section-title">— Edge of the world —</div>
          <h2 className="section-heading" style={{ fontSize: 40 }}>You've walked the whole map.</h2>
          <p style={{ color: 'var(--ink)', fontSize: 16, marginTop: 8 }}>
            Thanks for exploring. Checkback or follow our social media to know when the demo drops.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
            <button className="pbtn" onClick={() => go('home')}>⟵ Back to start</button>
          </div>
          <p className="pf" style={{ fontSize: 9, color: 'var(--gold)', letterSpacing: '0.15em', marginTop: 36 }}>
            © 2026 PIXEL ART RPG STUDIOS
          </p>
        </div>
      </div>
    </section>
  );
}

function PaletteTweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection title="World theme">
        <TweakColor
          label="Palette"
          value={tweaks.palette}
          onChange={(v) => setTweak('palette', v)}
          options={[
            { value: 'earthy', label: 'Earthy', colors: ['#2d1b00', '#d4a373', '#588157', '#f4c542'] },
            { value: 'twilight', label: 'Twilight', colors: ['#1a0a3a', '#e0aaff', '#3a86ff', '#ffd86b'] },
            { value: 'ember', label: 'Ember', colors: ['#3a1808', '#ffb878', '#c14c3a', '#f4c542'] }
          ]}
        />
      </TweakSection>
      <TweakSection title="Atmosphere">
        <TweakToggle label="Click SFX" value={tweaks.sound} onChange={(v) => setTweak('sound', v)} />
        <TweakToggle label="CRT scanlines" value={tweaks.scanlines} onChange={(v) => setTweak('scanlines', v)} />
        <TweakToggle label="Preview backgrounds" value={tweaks.previewBg} onChange={(v) => setTweak('previewBg', v)} />
      </TweakSection>
    </TweaksPanel>
  );
}

function TopNav({ activePage, go, time, setTime, sound, toggleSound }) {
  return (
    <div className="nav-wrap">
      <div className="nav">
        <div className="nav-right">
          <button className="icon-toggle" onClick={() => setTime(time === 'day' ? 'night' : 'day')}
            title={time === 'day' ? 'Switch to night' : 'Switch to day'} aria-label="Toggle day/night">
            {time === 'day' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>
          <button className="icon-toggle" onClick={toggleSound}
            title={sound ? 'Mute sound' : 'Unmute sound'} aria-label="Toggle sound">
            <span className="pf-icon">{sound ? '♪' : '✕'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
