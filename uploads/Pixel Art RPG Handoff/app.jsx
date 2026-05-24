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

const PAGE_ORDER = ['home', 'about', 'features', 'blog'];
const PAGE_LABELS = { home: 'Home', about: 'About', features: 'Features', blog: 'Dev Blog' };

// Per-panel dialogue. The speaker / avatar / line update as you walk through the world.
const DIALOGUE_BY_PANEL = [
  // —— HOME ——
  { speaker: 'Innkeeper', avatar: '🍺', text: "Welcome, traveler! Word's spreading about a town called Dreamfall — they say its secret runs deeper than the world below." },
  { speaker: 'Innkeeper', avatar: '🍺', text: "The folks here are mad — they say one game can have ARPG loot, MMO bustle, town-building AND 16-bit charm. So they're building it anyway." },
  { speaker: 'Innkeeper', avatar: '🍺', text: "Six pillars hold this place up. Loot. Town. Friends. Story. The cycle of day. And an endgame that never ends. Take your time." },
  { speaker: 'Innkeeper', avatar: '🍺', text: "The world's hand-drawn — every tile, every building, every wobbling slime. No asset packs. They're proud of that." },
  { speaker: 'Innkeeper', avatar: '🍺', text: "The folks making this place keep their workshop door open. Read the docs, peek at the blog, shout at them on Discord. It's that kind of project." },

  // —— ABOUT ——
  { speaker: 'Wandering Bard', avatar: '🎶', text: "Ah, the campfire! Sit a while. Let me tell you who's behind all this — and why they couldn't stop themselves from making it." },
  { speaker: 'Wandering Bard', avatar: '🎶', text: "Their mission's simple, really. Take everything they loved about old games, mash it together, and refuse to ship a single shortcut." },
  { speaker: 'Wandering Bard', avatar: '🎶', text: "Six pillars they won't bend on: hand-drawn art, deep systems, the community, respecting your time, real music, and zero microtransactions." },
  { speaker: 'Wandering Bard', avatar: '🎶', text: "The road behind them is long. The road ahead — combat, town, story, beta. They post the map every week so you can follow along." },
  { speaker: 'Wandering Bard', avatar: '🎶', text: "Just two souls walk this road. Husband and wife. Developer and pixel artist. Small crew. Big game." },
  { speaker: 'Wandering Bard', avatar: '🎶', text: "Their original brief: 'Build the game we'd queue up for at 11pm on a Tuesday — and build it together.'" },

  // —— FEATURES ——
  { speaker: 'Quartermaster', avatar: '⚔️', text: "The systems board, hero! Every gear, lever, and dial that makes this game tick. Walk it with me." },
  { speaker: 'Quartermaster', avatar: '⚔️', text: "Two tracks. Levels for your character, Affinity for your discipline. Two characters can share a level and play nothing alike." },
  { speaker: 'Quartermaster', avatar: '⚔️', text: "Twenty-one disciplines. Start with one of four. Specialize into twelve. If you're brave, push into six masteries — those are permanent." },
  { speaker: 'Quartermaster', avatar: '⚔️', text: "Forty-two buildings, eight categories, four upgrade tiers. The whole town visibly grows as you do. Adjacency matters." },
  { speaker: 'Quartermaster', avatar: '⚔️', text: "Ten chapters of story. Over 150 quests. Side stuff, repeatable runs, faction missions — they spend hours on every one." },
  { speaker: 'Quartermaster', avatar: '⚔️', text: "Loot, my favorite. Five tiers, a hundred-plus affixes, sockets, enchanting with risk zones. You'll be theorycrafting in the tavern for hours." },
  { speaker: 'Quartermaster', avatar: '⚔️', text: "The world keeps its own clock. Seven periods. NPCs sleep. Shops close. Rare drops only show their face at certain hours." },
  { speaker: 'Quartermaster', avatar: '⚔️', text: "Puzzles. Real ones. Every secret can be solved with observation — no random trial-and-error. Sharpen your eye." },
  { speaker: 'Quartermaster', avatar: '⚔️', text: "After the story? Pick a faction — permanently. Then dungeon forever with Perk + Downside upgrades that scale to infinity." },

  // —— DEV BLOG ——
  { speaker: 'Lead Designer', avatar: '📜', text: "You found the workshop! This is where I post about what we're cooking each week. Pull up a stool — read whatever catches your eye." },
  { speaker: 'Lead Designer', avatar: '📜', text: "This week's featured post: the long version. If you've only got time for one read, make it this one." },
  { speaker: 'Lead Designer', avatar: '📜', text: "The full archive. Combat math, sprite work, music breakdowns, engine post-mortems. Filter by what you're into." },
  { speaker: 'Lead Designer', avatar: '📜', text: "Patch notes drop here. Subscribe with your email if you want one ping a week. Or just lurk in Discord — that's where everything starts." },

  // —— END ——
  { speaker: 'Caretaker', avatar: '🕯️', text: "Edge of the world for now, traveler. Come back when the lanterns are lit again. Wishlist us — that's how you keep us alive." }
];

const DIALOGUES = {
  home: DIALOGUE_BY_PANEL[0],
  about: DIALOGUE_BY_PANEL[5],
  features: DIALOGUE_BY_PANEL[11],
  blog: DIALOGUE_BY_PANEL[20]
};

function App() {
  const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
    "palette": "earthy",
    "sound": true,
    "scanlines": false
  }/*EDITMODE-END*/;

  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [activePage, setActivePage] = useState('home');
  const [time, setTime] = useState('day');
  const [scrollX, setScrollX] = useState(0);
  const [scrollPct, setScrollPct] = useState(0);
  const [panelIdx, setPanelIdx] = useState(0);
  const stageRef = useRef(null);

  const dialogue = DIALOGUE_BY_PANEL[Math.min(panelIdx, DIALOGUE_BY_PANEL.length - 1)] || DIALOGUE_BY_PANEL[0];

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
    onScroll();
    return () => {
      stage.removeEventListener('wheel', onWheel);
      stage.removeEventListener('scroll', onScroll);
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
  }, [tweaks.palette, tweaks.scanlines, time]);

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
      <ParallaxLandscape scrollX={scrollX} />
      <TopNav activePage={activePage} go={go}
        time={time} setTime={setTime}
        sound={tweaks.sound} toggleSound={() => setTweak('sound', !tweaks.sound)} />

      <main ref={stageRef} className="scroll-stage">
        <Anchor id="page-home" page="home" />
        <HomePage go={go} />
        <Anchor id="page-about" page="about" />
        <AboutPage />
        <Anchor id="page-features" page="features" />
        <FeaturesPage />
        <Anchor id="page-blog" page="blog" />
        <BlogPage />
        <Anchor id="page-end" page="blog" />
        <EndPanel go={go} />
      </main>

      <FloatingDialogue speaker={dialogue.speaker} avatar={dialogue.avatar} text={dialogue.text} />
      <div className="scroll-progress">
        <span>WORLD</span>
        <div className="bar"><div className="fill" style={{ width: (scrollPct * 100) + '%' }}></div></div>
        <span>{Math.round(scrollPct * 100)}%</span>
      </div>

      <PaletteTweaks tweaks={tweaks} setTweak={setTweak} />
    </>
  );
}

function Anchor({ id, page }) {
  return <div id={id} className="page-anchor" data-page={page} aria-hidden></div>;
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
          <p style={{ color: 'var(--ink-soft)', fontSize: 16, marginTop: 8 }}>
            Thanks for exploring. Come back when there's a new dev blog, or wishlist the game
            on Steam to be the first to know when the demo drops.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
            <button className="pbtn primary">
              <span>Wishlist on Steam</span><span className="arrow"></span>
            </button>
            <button className="pbtn" onClick={() => go('home')}>⟵ Back to start</button>
          </div>
          <p className="pf" style={{ fontSize: 9, color: 'var(--ink-dim)', letterSpacing: '0.15em', marginTop: 36 }}>
            © 20XX DREAMER STUDIOS · MADE IN THE OPEN
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
            <img src={time === 'day' ? 'assets/sun.png' : 'assets/moon.png'}
              alt={time === 'day' ? 'Sun (day)' : 'Moon (night)'} />
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
