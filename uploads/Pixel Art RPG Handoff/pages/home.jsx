/* ============ HOME PAGE — horizontal panels ============ */

function HomePage({ go }) {
  return (
    <>
      {/* Panel 1 — Hero with parallax showing through */}
      <section className="h-panel hero" data-screen-label="01 Hero">
        <div className="hero-content">
          <div className="hero-stack">
            <div className="logo-wrap">
              <img src="assets/logo.png" alt="Secret of the Dreamers" className="hero-logo" />
              <div className="key-art-badge pf">IN DEVELOPMENT</div>
            </div>
            <div style={{ marginTop: 8 }}>
              <div className="hero-tag">A 16-bit Action RPG · Town Builder</div>
            </div>
            <div className="hero-cta">
              <button className="pbtn primary" onClick={() => go('features')}>
                <span>EXPLORE THE SYSTEMS</span><span className="arrow"></span>
              </button>
              <button className="pbtn" onClick={() => go('blog')}>Read Dev Blog</button>
              <button className="pbtn ghost" onClick={() => go('about')}>About the Team</button>
            </div>
          </div>
        </div>
        <div className="next-hint">
          <div className="arrow">▶</div>
          <div className="lbl">SCROLL →</div>
        </div>
      </section>

      {/* Panel 2 — The pitch */}
      <section className="h-panel bg-veil" data-screen-label="02 Pitch">
        <div className="panel-marker"><div className="num">02</div><div className="label">THE PITCH</div></div>
        <div className="panel-inner" style={{ display: 'grid', placeContent: 'center', textAlign: 'center' }}>
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div className="section-title">— Why we're building this —</div>
            <h2 className="section-heading">One game.<br />Every system you love.</h2>
            <p style={{ fontSize: 19, color: 'var(--ink-soft)' }}>The deep loot systems of games like Diablo, Path Of Exile & Last Epoch. The town-building satisfaction of Stardew Valley or Terraria. The charm of 16-bit classics like Secret Of Mana, Chrono Trigger, Legend Of Zelda, Final Fantasy. We kept wondering: why hasn't anyone put all of this together in one game?



            </p>
            <p style={{ fontSize: 19, color: 'var(--ink)', marginTop: 18 }}>
              <em>So we decided to build it ourselves.</em>
            </p>
            <div className="accent-strip" style={{ margin: '32px auto', maxWidth: 360 }}></div>
            <button className="pbtn primary" onClick={() => go('features')}>
              See the systems <span className="arrow"></span>
            </button>
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">FEATURES →</div></div>
      </section>

      {/* Panel 3 — 6 feature cards */}
      <section className="h-panel wide bg-veil" data-screen-label="03 Features">
        <div className="panel-marker"><div className="num">03</div><div className="label">THE LOOP</div></div>
        <div className="panel-inner">
          <div className="section-title">— What you'll do —</div>
          <h2 className="section-heading">Six pillars. One world.</h2>
          <div className="grid cols-3" style={{ marginTop: 24 }}>
            {[
            { icon: '⚔️', n: '01', title: 'Deep Loot', text: '5 rarity tiers, 100+ affixes, socket gems, enchanting risk zones.' },
            { icon: '🏘️', n: '02', title: 'Living Town', text: '42 buildings · 8 categories · 4 visual upgrade tiers · reactive NPCs.' },
            { icon: '👥', n: '03', title: 'Social World', text: 'Shared town per account, guilds, trade. Solo if you want.' },
            { icon: '📖', n: '04', title: '10 Chapters', text: '150+ quests, branching faction loyalty, lasting consequences.' },
            { icon: '🌙', n: '05', title: 'Day/Night', text: 'A 7-period cycle. NPCs sleep, shops close, rare drops appear at midnight.' },
            { icon: '♾️', n: '06', title: 'Infinite Endgame', text: 'Faction strongholds + Perk/Downside upgrades that scale forever.' }].
            map((f) =>
            <div className="card" key={f.n}>
                <div className="card-num">{f.n}</div>
                <span className="icon">{f.icon}</span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </div>
            )}
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">WORLD →</div></div>
      </section>

      {/* Panel 4 — Key art + stats */}
      <section className="h-panel wide bg-veil" data-screen-label="04 World">
        <div className="panel-marker"><div className="num">04</div><div className="label">THE WORLD</div></div>
        <div className="panel-inner" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="featured" style={{ width: '100%' }}>
            <div>
              <div className="section-title">— Key Art —</div>
              <h2 className="section-heading">A world worth getting lost in.</h2>
              <p style={{ fontSize: 17, color: 'var(--ink-soft)' }}>
                Hand-drawn pixel art on a tight 16-bit palette. Every building, NPC, monster and
                tile is custom — no asset packs. The world breathes through animation: lanterns
                flicker, NPCs sweep their porches, slimes wobble in the grass.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 22, flexWrap: 'wrap' }}>
                <div className="bignum"><span className="n">21</span><span className="l">Disciplines</span></div>
                <div className="bignum"><span className="n">42</span><span className="l">Buildings</span></div>
                <div className="bignum"><span className="n">150</span><span className="l">+ Quests</span></div>
                <div className="bignum"><span className="n">99</span><span className="l">Max Level</span></div>
              </div>
            </div>
            <div className="key-art" style={{ height: 'auto', padding: 0, background: 'transparent', boxShadow: 'none' }}>
              <img src="assets/skill-layout.png" alt="Skill layout — in-game UI preview"
              style={{ display: 'block', width: '100%', height: 'auto', imageRendering: 'pixelated', filter: 'drop-shadow(8px 8px 0 rgba(0,0,0,.55))' }} />
            </div>
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">OPEN DEV →</div></div>
      </section>

      {/* Panel 5 — Built in the open */}
      <section className="h-panel bg-veil" data-screen-label="05 Open Dev">
        <div className="panel-marker"><div className="num">05</div><div className="label">OPEN DEV</div></div>
        <div className="panel-inner" style={{ display: 'grid', placeContent: 'center' }}>
          <div style={{ maxWidth: 760 }}>
            <div className="section-title">— Built in the Open —</div>
            <h2 className="section-heading">You see what we see.</h2>
            <p style={{ fontSize: 17, color: 'var(--ink-soft)', marginBottom: 24 }}>
              We publish our design docs. We post weekly dev blogs. The Discord steers real
              decisions — we've shipped features that started as a single message.
            </p>
            <div className="grid cols-3">
              {[
              ['📐', 'Design Docs', 'Public stat math, why 99 is the cap, what we cut.'],
              ['📜', 'Dev Blogs', 'Weekly posts on whatever\'s on the table that week.'],
              ['💬', 'Community', 'Discord polls steer real decisions. Come argue.']].
              map(([i, t, d]) =>
              <div className="card" key={t}>
                  <span className="icon">{i}</span>
                  <h3 style={{ fontSize: 22 }}>{t}</h3>
                  <p style={{ fontSize: 14 }}>{d}</p>
                </div>
              )}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
              <button className="pbtn primary" onClick={() => go('features')}>
                <span>Wishlist on Steam</span><span className="arrow"></span>
              </button>
              <button className="pbtn" onClick={() => go('blog')}>Read the Dev Blog</button>
            </div>
          </div>
        </div>
        <div className="next-hint"><div className="arrow">↪</div><div className="lbl">EXPLORE PAGES</div></div>
      </section>
    </>);

}

window.HomePage = HomePage;