/* ============ ABOUT PAGE — horizontal panels ============ */

function AboutPage() {
  return (
    <>
      {/* Panel 1 — Intro */}
      <section className="h-panel bg-veil" data-screen-label="01 Intro">
        <div className="panel-marker"><div className="num">01</div><div className="label">ABOUT US</div></div>
        <div className="panel-inner" style={{ display: 'grid', placeContent: 'center', textAlign: 'center' }}>
          <div style={{ maxWidth: 760, margin: '0 auto' }}>
            <div className="section-title">— About Us —</div>
            <h1 className="section-heading">A husband and wife,<br/>building the RPG they grew up loving.</h1>
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
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">MISSION →</div></div>
      </section>

      {/* Panel 2 — Mission */}
      <section className="h-panel wide bg-veil" data-screen-label="02 Mission">
        <div className="panel-marker"><div className="num">02</div><div className="label">MISSION</div></div>
        <div className="panel-inner" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="featured" style={{ width: '100%' }}>
            <div className="img-ph" style={{ minHeight: 360 }}>
              <div className="label">[ KEY ART or CREW SCENE ]<br/>drop a sprite of the two of you</div>
            </div>
            <div>
              <div className="section-title">— Mission —</div>
              <h2 className="section-heading">Why we're building this.</h2>
              <p style={{ fontSize: 17, color: 'var(--ink-soft)' }}>
                We loved the deep loot systems of Diablo 2, the social energy of MMORPGs, the
                town-building satisfaction of games like Stardew Valley, and the pure charm of
                16-bit classics. We kept wondering: why hasn't anyone put all of this together
                in one game?
              </p>
              <p style={{ fontSize: 17, color: 'var(--ink-soft)' }}>
                So we decided to build it ourselves. We're making it in the open — sharing
                design docs, posting dev blogs, and building a community alongside the game.
              </p>
              <p className="pf" style={{ fontSize: 12, color: 'var(--gold)', marginTop: 14, lineHeight: 1.8 }}>
                ▸ Come join us.
              </p>
            </div>
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
              { icon: '🎨', t: 'Authentic Pixel Art', d: 'Hand-drawn sprites. Tight palette. Every animation done frame by frame. No asset flips.' },
              { icon: '📐', t: 'Deep Systems', d: 'Math you can dig into. Build optimization that rewards study. Multiple correct answers.' },
              { icon: '🤝', t: 'Community First', d: 'Open design docs. Public roadmap. The community sees what we see — even rough drafts.' },
              { icon: '🎯', t: 'Respect Your Time', d: 'Seasonal resets give fresh stakes but no FOMO grind. Login when you want. Catch up cleanly.' },
              { icon: '🎵', t: 'Original Soundtrack', d: 'Chiptune-meets-orchestral score. Every town, dungeon, and time-of-day has a theme.' },
              { icon: '🌐', t: 'No Microtransactions', d: 'One purchase. Cosmetic-only expansions later. Nothing gated by your wallet, ever.' }
            ].map(p => (
              <div className="card" key={p.t}>
                <span className="icon">{p.icon}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
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
                ▸ CURRENT PHASE · COMBAT & DISCIPLINES<br/>
                ▸ NEXT · TOWN BUILDING & NPC SCHEDULES<br/>
                ▸ TARGET · CLOSED BETA Q3
              </p>
            </div>
            <div className="panel">
              <div className="panel-title">▸ Dev Timeline</div>
              <div className="timeline">
                {[
                  ['Phase 01 · Foundation', 'Engine & sprite pipeline', 'Custom 2D engine, tile system, character animator.'],
                  ['Phase 02 · Now', 'Combat & disciplines', 'All 21 disciplines have skill trees on paper; first few playable in internal builds.'],
                  ['Phase 03 · Next', 'Town building & NPC schedules', 'Tier system online. Working on adjacency bonuses and getting NPCs to actually sleep.'],
                  ['Phase 04 · Later', 'Story chapters & faction routing', '10-chapter arc plotted. Voice direction starts when the script is locked.'],
                  ['Phase 05 · Demo', 'Public closed beta', 'First-look access for supporters. Sign-ups will open through the dev blog.']
                ].map(([h4, h3, p]) => (
                  <div className="timeline-item" key={h4}>
                    <h4>{h4}</h4>
                    <h3>{h3}</h3>
                    <p>{p}</p>
                  </div>
                ))}
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
                <img src="assets/dagor.png" alt="Dagor"
                  onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'grid'; }} />
                <div className="portrait-fallback" style={{ display: 'none' }}>
                  <span style={{ fontSize: 40 }}>👨‍💻</span>
                </div>
              </div>
              <h3 style={{ fontSize: 28, marginTop: 14 }}>Dagor</h3>
              <p className="pf" style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 4 }}>
                Developer · Writer
              </p>
              <p style={{ marginTop: 14, fontSize: 14, color: 'var(--ink-soft)' }}>
                Full-time DevOps engineer. Started his career as a web developer over 20 years
                ago, shifting into game development with the grand idea of finally making
                something he can call his own. Two decades of small personal projects later —
                this is it.
              </p>
            </div>

            {/* Larimaria */}
            <div className="card team-card">
              <div className="team-portrait">
                <img src="assets/larimaria.png" alt="Larimaria"
                  onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'grid'; }} />
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

      {/* Panel 6 — Studio Brief */}
      <section className="h-panel bg-veil" data-screen-label="06 Brief">
        <div className="panel-marker"><div className="num">06</div><div className="label">STUDIO BRIEF</div></div>
        <div className="panel-inner" style={{ display: 'grid', placeContent: 'center', textAlign: 'center' }}>
          <div className="panel" style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="panel-title" style={{ justifyContent: 'center' }}>▸ The Brief</div>
            <p style={{
              fontFamily: 'var(--font-pixel-lg)', fontSize: 30, lineHeight: 1.3,
              color: 'var(--ink)', margin: '20px 0'
            }}>
              "Build the game we'd queue up for at 11pm on a Tuesday.<br/>
              Then build it together."
            </p>
            <p className="pf" style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '0.15em' }}>
              ▸ DAGOR & LARIMARIA · DREAMERS
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

window.AboutPage = AboutPage;
