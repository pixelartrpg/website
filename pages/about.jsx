/* ============ ABOUT PAGE — horizontal panels ============ */

function AboutPage() {
  return (
    <>
      {/* Panel 1 — The Pitch (moved from home) */}
      <section className="h-panel bg-veil" data-screen-label="01 Pitch">
        <div className="panel-marker"><div className="num">01</div><div className="label">THE PITCH</div></div>
        <div className="panel-inner" style={{ display: 'grid', placeContent: 'center', textAlign: 'center', padding: "44px 60px" }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div className="section-heading">Pixel Art RPG</div>
            <div className="section-title">— Why we're building this —</div>
            <h2 className="section-heading">One game.<br />Every system you love.</h2>
            <p style={{ fontSize: 19, color: 'var(--ink-soft)' }}>The deep loot systems of games like Diablo, Path Of Exile & Last Epoch. The town-building satisfaction of Stardew Valley or Terraria. The charm of 16-bit classics like Secret Of Mana, Chrono Trigger, and Legend Of Zelda. We kept wondering: why hasn't anyone put all of this together in one game?</p>
            <p style={{ fontSize: 19, color: 'var(--ink)', marginTop: 18 }}>
              <em>So we decided to build it ourselves.</em>
            </p>
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">ABOUT US →</div></div>
      </section>

      {/* Panel 2 — Intro */}
      <section className="h-panel bg-veil" data-screen-label="02 Intro">
        <div className="panel-marker"><div className="num">02</div><div className="label">ABOUT US</div></div>
        <div className="panel-inner" style={{ display: 'grid', placeContent: 'center', textAlign: 'center' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div className="section-title">— About Us —</div>
            <h1 className="section-heading">A husband and wife,<br />building the RPG they grew up loving.</h1>
            <p style={{ fontSize: 17, color: 'var(--ink-soft)', marginTop: 14 }}>
              We are a small team. Most of the work is being done by my wife and I. We both
              grew up playing 16-bit era video games with a special love for RPGs. We hope to
              bring a fun story, interesting mechanics, and lots of replayability to the
              action RPG genre.
            </p>
            <p style={{ fontSize: 17, color: 'var(--ink)', marginTop: 14 }}>
              Thank you for checking out our little site.
            </p>
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">PILLARS →</div></div>
      </section>

      {/* Panel 3 — Pillars */}
      <section className="h-panel wide bg-veil" data-screen-label="03 Pillars">
        <div className="panel-marker"><div className="num">03</div><div className="label">PILLARS</div></div>
        <div className="panel-inner">
          <div className="section-title">— Pillars —</div>
          <h2 className="section-heading">What we won't compromise on.</h2>
          <div className="grid cols-3" style={{ marginTop: 26 }}>
            {[
            { icon: '🎨', t: 'Authentic Pixel Art', d: 'Hand-drawn sprites. Tight palette. Every animation done frame by frame. Real Pixel Art Artists' },
            { icon: '📐', t: 'Deep Systems', d: 'Math you can dig into. Build optimization that rewards study. Multiple correct answers.' },
            { icon: '🤝', t: 'Community First', d: 'Open design docs. Public roadmap. The community sees what we see — even rough drafts.' },
            { icon: '🎯', t: 'Respect Your Time', d: 'Seasonal resets give fresh stakes but no FOMO grind. Login when you want. Catch up cleanly.' },
            { icon: '🎵', t: 'Original Soundtrack', d: 'Chiptune-meets-orchestral score. Every town, dungeon, and time-of-day has a theme.' },
            { icon: '🌐', t: 'No P2W Microtransactions', d: 'One purchase. Nothing gated by your wallet. No Pay To Win ever. Cosmetics and Expansions planned.' }].
            map((p) =>
            <div className="card" key={p.t}>
                <span className="icon">{p.icon}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            )}
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">ROADMAP →</div></div>
      </section>

      {/* Panel 4 — Timeline */}
      <section className="h-panel wide bg-veil" data-screen-label="04 Roadmap">
        <div className="panel-marker"><div className="num">04</div><div className="label">ROADMAP</div></div>
        <div className="panel-inner" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="featured" style={{ width: '100%' }}>
            <div>
              <div className="section-title">— Roadmap —</div>
              <h2 className="section-heading">Where we are.</h2>
              <p style={{ color: 'var(--ink-soft)' }}>
                Open development means showing our work. Here's the rough path. Dates are
                intentionally fuzzy — we ship when it's good.
              </p>
              <p className="pf" style={{ fontSize: 10, color: 'var(--gold)', marginTop: 24, lineHeight: 1.8 }}>
                ▸ CURRENT PHASE · COMBAT & DISCIPLINES<br />
                ▸ NEXT · TOWN BUILDING & NPC SCHEDULES
              </p>
            </div>
            <div className="panel">
              <div className="panel-title">▸ Dev Timeline</div>
              <div className="timeline">
                {[
                ['Phase 01 · Foundation', 'Engine & sprite pipeline', 'Godot 2D engine, tile system, character animations.'],
                ['Phase 02 · Now', 'Combat & disciplines', 'All 21 disciplines have skill trees on paper; Still flushing out and working on the math.'],
                ['Phase 03 · Next', 'Town building & NPC schedules', 'Tier system designed. Working on adjacency bonuses and getting NPCs fully flushed out.'],
                ['Phase 04 · Later', 'Story chapters & faction routing', '10-chapter arc plotted. Voice direction starts when the script is locked. Chapter 1 Flushed out.'],
                ['Phase 05 · Demo', 'Public closed beta', 'First-look access for supporters. Sign-ups will open through the dev blog.']].
                map(([h4, h3, p]) =>
                <div className="timeline-item" key={h4}>
                    <h4>{h4}</h4>
                    <h3>{h3}</h3>
                    <p>{p}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">THE TEAM →</div></div>
      </section>

      {/* Panel 5 — Team: Dagor + Larimaria */}
      <section className="h-panel wide bg-veil" data-screen-label="05 Team">
        <div className="panel-marker"><div className="num">05</div><div className="label">THE TEAM</div></div>
        <div className="panel-inner" style={{ justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div className="section-title">— The Team —</div>
            <h2 className="section-heading">Just the two of us.</h2>
            <p style={{ color: 'var(--ink-soft)', maxWidth: 720, margin: '0 auto 32px' }}>
              A husband and wife duo building this together. Two people, one shared dream:
              make the game we always wanted to play.
            </p>
          </div>

          <div className="grid cols-2" style={{ maxWidth: 1080, margin: '0 auto', gap: 28 }}>
            {/* Dagor */}
            <div className="card team-card">
              <div className="team-portrait">
                <img src="assets/dagor.png?v=2" alt="Dagor"
                onError={(e) => {e.currentTarget.style.display = 'none';e.currentTarget.nextSibling.style.display = 'grid';}} />
                <div className="portrait-fallback" style={{ display: 'none' }}>
                  <span style={{ fontSize: 40 }}>👨‍💻</span>
                </div>
              </div>
              <h3 style={{ fontSize: 28, marginTop: 14 }}>Dagor</h3>
              <p className="pf" style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 4 }}>
                Developer · Writer
              </p>
              <p style={{ marginTop: 14, fontSize: 14, color: 'var(--ink-soft)' }}>
                Full-time software engineer. Started his career as a web developer over 20 years
                ago, shifting into game development with the grand idea of finally making
                something he can call his own. Two decades of small personal projects later —
                this is it.
              </p>
            </div>

            {/* Larimaria */}
            <div className="card team-card">
              <div className="team-portrait">
                <img src="assets/larimaria.png?v=2" alt="Larimaria"
                onError={(e) => {e.currentTarget.style.display = 'none';e.currentTarget.nextSibling.style.display = 'grid';}} />
                <div className="portrait-fallback" style={{ display: 'none' }}>
                  <span style={{ fontSize: 40 }}>🎨</span>
                </div>
              </div>
              <h3 style={{ fontSize: 28, marginTop: 14 }}>Larimaria</h3>
              <p className="pf" style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 4 }}>
                Pixel Artist
              </p>
              <p style={{ marginTop: 14, fontSize: 14, color: 'var(--ink-soft)' }}>
                Grew up on Chrono Trigger, Secret of Mana, Final Fantasy, and Zelda. The
                definition of gamer girl — challenge her to Mario Kart at your peril. An
                artist at heart with a BFA in Sculpture (jewelry major), now learning a brand
                new medium: pixel art.
              </p>
            </div>
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">BRIEF →</div></div>
      </section>
    </>);

}

window.AboutPage = AboutPage;