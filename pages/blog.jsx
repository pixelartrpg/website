/* ============ DEV BLOG PAGE — horizontal panels ============ */

const POSTS = [
  { id: 'p1', date: 'JUN 12', cat: 'Combat', icon: '⚔️', title: 'How we made Stamina actually feel good',
    excerpt: "We rebuilt the stamina system three times. Here's why the third version stuck — and the math behind why dodging feels punchy now without becoming a button you just mash.",
    read: '6 min' },
  { id: 'p2', date: 'JUN 05', cat: 'Pixel Art', icon: '🎨', title: 'Animating the Blacksmith across 4 tiers',
    excerpt: "From a single forge to a multi-story smithy. We walk through every frame of the upgrade transition and why we render the smoke before the building.",
    read: '8 min' },
  { id: 'p3', date: 'MAY 29', cat: 'Systems', icon: '🧮', title: 'Loot tables and the case against pure RNG',
    excerpt: "Why we layered a pity-bonus on top of standard ARPG drop tables. Diablo 2's loot is sacred but it's a 25-year-old design — here's our modern twist.",
    read: '10 min' },
  { id: 'p4', date: 'MAY 22', cat: 'Music', icon: '🎵', title: "Composing the Dreamfall town theme",
    excerpt: "Tobin breaks down the SNES-style instrumentation: pulse + triangle + noise channels, modern reverb tail, and the one melodic motif you'll hear in every chapter.",
    read: '5 min' },
  { id: 'p5', date: 'MAY 15', cat: 'Design', icon: '🏘️', title: 'Adjacency bonuses without making it a spreadsheet',
    excerpt: "Town building got too min-maxy. We pulled back to orthogonal-only bonuses and started rewarding *visible* layouts. Players noticed immediately.",
    read: '7 min' },
  { id: 'p6', date: 'MAY 08', cat: 'Engine', icon: '⚙️', title: "Why we wrote our own 2D engine",
    excerpt: "We tried Unity. We tried Godot. We tried a fork of LÖVE. Here's what each broke for us — and the small custom engine we're now shipping on.",
    read: '12 min' }
];

const RECENT = [
  { id: 'r1', icon: '🪙', title: 'Patch notes 0.6.2 · loot streak fix', date: 'JUN 14' },
  { id: 'r2', icon: '🗺️', title: 'New region preview: The Hollow Reaches', date: 'JUN 09' },
  { id: 'r3', icon: '🎯', title: "Designing Luck so it's never the only stat", date: 'JUN 03' },
  { id: 'r4', icon: '🐞', title: 'Bug bash retro · 142 issues triaged', date: 'MAY 27' },
  { id: 'r5', icon: '📊', title: 'Closed alpha telemetry · what we learned', date: 'MAY 20' },
  { id: 'r6', icon: '🎮', title: 'Controller bindings: input layer rewrite', date: 'MAY 13' }
];

function BlogPage() {
  const [filter, setFilter] = React.useState('All');
  const cats = ['All', 'Combat', 'Pixel Art', 'Systems', 'Music', 'Design', 'Engine'];
  const filtered = filter === 'All' ? POSTS : POSTS.filter(p => p.cat === filter);

  return (
    <>
      {/* Intro */}
      <section className="h-panel bg-veil" data-screen-label="01 Intro">
        <div className="panel-marker"><div className="num">01</div><div className="label">DEV BLOG</div></div>
        <div className="panel-inner" style={{ display: 'grid', placeContent: 'center', textAlign: 'center' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="section-title">— Dev Blog —</div>
            <h1 className="section-heading">Notes from the workshop.</h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: 17 }}>
              Weekly posts on whatever's on the table this week — combat math, sprite work,
              balance, NPC schedules, terrible bugs. The kitchen is open.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginTop: 26 }}>
              {cats.map(c => (
                <button key={c} className="chip"
                  onClick={() => setFilter(c)}
                  style={{
                    border: 0, cursor: 'pointer',
                    color: filter === c ? 'var(--bg-deep)' : 'var(--ink)',
                    background: filter === c ? 'var(--gold)' : 'var(--panel)',
                    boxShadow: filter === c ? '0 0 0 2px var(--ink)' : '0 0 0 2px var(--panel-edge)'
                  }}>{c}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">POSTS →</div></div>
      </section>

      {/* Featured post (the latest) */}
      <section className="h-panel wide bg-veil" data-screen-label="02 Featured">
        <div className="panel-marker"><div className="num">02</div><div className="label">FEATURED</div></div>
        <div className="panel-inner" style={{ display: 'flex', alignItems: 'center' }}>
          <article className="post" style={{ width: '100%', margin: 0 }}>
            <div className="post-image img-ph" style={{ minHeight: 220 }}>
              <div style={{ fontSize: 72 }}>{filtered[0]?.icon || '📜'}</div>
              <div className="label" style={{ position: 'absolute', bottom: 14, left: 14 }}>
                [ HERO ART · {(filtered[0]?.cat || 'POST').toUpperCase()} ]
              </div>
            </div>
            <div className="post-body">
              <div className="post-meta">
                <span>{filtered[0]?.date}</span>
                <span className="tag">{filtered[0]?.cat}</span>
                <span>· {filtered[0]?.read} read</span>
                <span style={{ color: 'var(--crimson)' }}>· LATEST</span>
              </div>
              <h2>{filtered[0]?.title}</h2>
              <p className="excerpt">{filtered[0]?.excerpt}</p>
              <button className="pbtn primary">Read full post</button>
            </div>
          </article>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">ARCHIVE →</div></div>
      </section>

      {/* Post grid */}
      <section className="h-panel wide bg-veil" data-screen-label="03 Archive">
        <div className="panel-marker"><div className="num">03</div><div className="label">ARCHIVE</div></div>
        <div className="panel-inner">
          <div className="section-title">— Recent posts —</div>
          <h2 className="section-heading">{filter === 'All' ? 'Everything' : filter}</h2>
          <div className="grid cols-3" style={{ marginTop: 22 }}>
            {filtered.slice(1).map(p => (
              <article className="post" key={p.id} style={{ margin: 0 }}>
                <div className="post-image img-ph" style={{ minHeight: 140 }}>
                  <div style={{ fontSize: 48 }}>{p.icon}</div>
                </div>
                <div className="post-body" style={{ padding: 18 }}>
                  <div className="post-meta">
                    <span>{p.date}</span>
                    <span className="tag">{p.cat}</span>
                  </div>
                  <h2 style={{ fontSize: 26 }}>{p.title}</h2>
                  <p className="excerpt" style={{ fontSize: 14 }}>{p.excerpt.slice(0, 110)}…</p>
                  <button className="pbtn ghost">Read →</button>
                </div>
              </article>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 24 }}>
            <button className="pbtn ghost">‹ Older</button>
            <button className="pbtn">Page 1 of 12</button>
            <button className="pbtn ghost">Newer ›</button>
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">SIDEBAR →</div></div>
      </section>

      {/* Sidebar content (Latest drops, subscribe, tags, community) */}
      <section className="h-panel wide bg-veil" data-screen-label="04 Sidebar">
        <div className="panel-marker"><div className="num">04</div><div className="label">PATCH NOTES & MORE</div></div>
        <div className="panel-inner">
          <div className="section-title">— Side quests —</div>
          <h2 className="section-heading">Patch notes & community.</h2>
          <div className="grid cols-2" style={{ marginTop: 22, alignItems: 'start' }}>
            <div className="panel flat">
              <div className="panel-title">▸ Latest Drops</div>
              {RECENT.map(r => (
                <div key={r.id} className="post-list-item">
                  <div className="thumb">{r.icon}</div>
                  <div>
                    <h4>{r.title}</h4>
                    <p>{r.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'grid', gap: 16 }}>
              <div className="panel flat">
                <div className="panel-title">▸ Subscribe</div>
                <p style={{ color: 'var(--ink-soft)', marginTop: 0 }}>
                  One email when a new post drops. No marketing, no growth tactics.
                </p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                  <input type="email" placeholder="hero@dreamfall.dev" style={{
                    flex: 1,
                    background: 'var(--panel)',
                    color: 'var(--ink)',
                    border: 0,
                    padding: '12px 14px',
                    fontFamily: 'var(--font-pixel)',
                    fontSize: 11,
                    letterSpacing: '0.08em',
                    boxShadow: 'inset 0 0 0 3px var(--panel-edge), 0 0 0 3px var(--ink)'
                  }} />
                  <button className="pbtn primary">JOIN</button>
                </div>
              </div>
              <div className="panel flat">
                <div className="panel-title">▸ Tags</div>
                <div className="discipline-list">
                  {['combat', 'balance', 'sprites', 'engine', 'music', 'narrative', 'town', 'loot', 'puzzles', 'bugs', 'alpha', 'roadmap'].map(t => (
                    <div className="chip" key={t}>#{t}</div>
                  ))}
                </div>
              </div>
              <div className="panel flat">
                <div className="panel-title">▸ Community</div>
                <p style={{ color: 'var(--ink-soft)', marginTop: 0 }}>
                  Most posts start as Discord conversations. Come help us argue about numbers.
                </p>
                <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
                  <button className="pbtn">Discord</button>
                  <button className="pbtn">Steam</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

window.BlogPage = BlogPage;
