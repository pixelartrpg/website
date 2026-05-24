/* ============ FEATURES PAGE — horizontal panels (one per system) ============ */

function FeaturesPage() {
  const [activeRarity, setActiveRarity] = React.useState(3);

  const stats = [
  { name: 'Power', val: 82, effect: 'Weapon damage scaling', best: 'Melee / Ranged' },
  { name: 'Vitality', val: 64, effect: 'HP pool & regeneration', best: 'Tank / Survival' },
  { name: 'Stamina', val: 70, effect: 'Action points & regen', best: 'Mobility builds' },
  { name: 'Will Power', val: 90, effect: 'Ability damage, reduced costs', best: 'Caster / Magic' },
  { name: 'Luck', val: 55, effect: 'Item rarity, crit bonuses', best: 'Glass cannon' }];

  const disciplines = {
    starter: [
      { name: 'Acolyte',    icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Apprentice', icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Cadet',      icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Scout',      icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
    ],
    advanced: [
      { name: 'Brawler',     icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Cleric',      icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Druid',       icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Hunter',      icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Illusionist', icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Knight',      icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Musician',    icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Ranger',      icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Shaman',      icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Warlock',     icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Warrior',     icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Wizard',      icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
    ],
    mastery: [
      { name: 'Artificer',  icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Champion',   icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Mercenary',  icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Spell Thief',icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'War Mage',   icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
      { name: 'Zealot',     icon: '✦', description: '', playstyle: '', keySkills: [], unlocks: [] },
    ],
  };

  const TIER_META = {
    starter:  { label: 'Starter',  color: 'var(--moss)',    chipClass: 'tier-starter'  },
    advanced: { label: 'Advanced', color: 'var(--tan)',     chipClass: 'tier-advanced' },
    mastery:  { label: 'Mastery',  color: 'var(--crimson)', chipClass: 'tier-mastery'  },
  };

  const [activeDiscipline, setActiveDiscipline] = React.useState(null);
  const buildings = [
  { cat: '⛏️ Resources', items: ['Mine', 'Logging Camp', 'Farm', 'Fishery'] },
  { cat: '🔨 Crafting', items: ['Blacksmith', 'Alchemist', 'Tailor', 'Jeweler'] },
  { cat: '🍺 Services', items: ['Tavern', 'Inn', 'Market', 'Stables'] },
  { cat: '👥 Social', items: ['Guild Hall', 'Player Housing', 'Arena'] },
  { cat: '📚 Knowledge', items: ['Mage Tower', 'Library', 'Observatory'] },
  { cat: '🛡️ Government', items: ['Barracks', 'Town Hall', 'Watchtower'] },
  { cat: '🕯️ Faith', items: ['Temple', 'Cemetery', 'Shrine'] },
  { cat: '✨ Exotic', items: ['??? Unlock-gated', '??? Secret', '??? Hidden'] }];

  const chapters = [
  ['1', 'The Awakening', 'Tutorial & introduction'],
  ['2', 'Town Expansion', 'Growth and infrastructure'],
  ['3', 'First Crisis', 'Conflict and allegiances'],
  ['4', 'Exploration', 'World expansion'],
  ['5', 'Faction Warfare', 'Political conflict'],
  ['6', 'Hidden Truths', 'Mystery and conspiracy'],
  ['7', 'Preparing for War', 'Recruitment and training'],
  ['8', 'The Great War', 'Epic battles and climax'],
  ['9', 'Consequences', 'Rebuilding and aftermath'],
  ['10', 'New Beginnings', 'Resolution and endgame']];

  const rarities = [
  { i: 1, name: 'Normal', affixes: 'None', sockets: '0', enchant: '—' },
  { i: 2, name: 'Magic', affixes: '1–2', sockets: '1–2', enchant: '+3 safe' },
  { i: 3, name: 'Rare', affixes: '2–4', sockets: '2–3', enchant: '+4–10+' },
  { i: 4, name: 'Unique', affixes: 'Fixed', sockets: '2–4', enchant: 'Per-item' },
  { i: 5, name: 'Set', affixes: 'Fixed', sockets: '2–4', enchant: 'Per-item' }];


  return (
    <>
      {/* Intro */}
      <section className="h-panel bg-veil" data-screen-label="01 Intro">
        <div className="panel-marker"><div className="num">01</div><div className="label">SYSTEMS BOARD</div></div>
        <div className="panel-inner" style={{ display: 'grid', placeContent: 'center', textAlign: 'center' }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div className="section-title">— Systems Board —</div>
            <h1 className="section-heading">Every system, in detail.</h1>
            <p style={{ color: 'var(--ink-soft)', fontSize: 17 }}>
              Pull up the design docs. Combat, towns, loot, time, the end of the world (and what
              comes after). Scroll right to walk through every system we're shipping.
            </p>
            <div style={{ marginTop: 24, display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Progression', 'Disciplines', 'Town', 'Quests', 'Items', 'Time', 'Puzzles', 'Endgame'].map((s, i) =>
              <div className="chip" key={s}>{(i + 1).toString().padStart(2, '0')} · {s}</div>
              )}
            </div>
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">PROGRESSION →</div></div>
      </section>

      {/* PROGRESSION */}
      <section className="h-panel wide bg-veil" data-screen-label="02 Progression">
        <div className="panel-marker"><div className="num">02</div><div className="label">PROGRESSION</div></div>
        <div className="panel-inner">
          <div className="section-title">▸ Character Progression</div>
          <h2 className="section-heading">Dual-track advancement.</h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: 720 }}>
            Two parallel tracks: <b style={{ color: 'var(--ink)' }}>Character Levels</b> (story
            progress + stat allocation) and <b style={{ color: 'var(--ink)' }}>Discipline Affinity</b> (build
            specialization + skill trees). No two characters ever play exactly the same.
          </p>
          <div className="grid cols-4" style={{ marginTop: 22 }}>
            <div className="bignum"><span className="n">99</span><span className="l">Level Cap</span></div>
            <div className="bignum"><span className="n">98</span><span className="l">Stat Points</span></div>
            <div className="bignum"><span className="n">5</span><span className="l">Core Stats</span></div>
            <div className="bignum"><span className="n">50</span><span className="l">Affinity / Disc.</span></div>
          </div>
          <div className="grid cols-2" style={{ marginTop: 22, alignItems: 'start' }}>
            <div className="panel flat">
              <div className="panel-title">▸ The 5 Core Stats</div>
              {stats.map((s) =>
              <div key={s.name} className="stat-row tooltip-host">
                  <div className="stat-name">{s.name}</div>
                  <div className="stat-bar"><div className="fill" style={{ width: s.val + '%' }}></div></div>
                  <div className="stat-val">{s.val}</div>
                  <div className="tooltip-bubble">{s.effect}</div>
                </div>
              )}
            </div>
            <div className="panel flat">
              <div className="panel-title">▸ Progression Arc</div>
              {[
              ['LV 1–25', 'Learn disciplines, set stat direction'],
              ['LV 25–60', 'Specialize, unlock powerful abilities'],
              ['LV 60–99', 'Master your discipline, prep for endgame'],
              ['LV 99+', 'Choose a faction · Enter endgame · Unlock more masteries']].
              map(([l, t]) =>
              <div key={l} style={{ padding: '10px 0', borderBottom: '2px dashed var(--panel-edge)' }}>
                  <div className="pf" style={{ fontSize: 10, color: 'var(--gold)', letterSpacing: '0.12em' }}>{l}</div>
                  <div style={{ marginTop: 4, fontSize: 14 }}>{t}</div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">DISCIPLINES →</div></div>
      </section>

      {/* DISCIPLINES */}
      <section className="h-panel wide bg-veil" data-screen-label="03 Disciplines">
        <div className="panel-marker"><div className="num">03</div><div className="label">21 DISCIPLINES</div></div>
        <div className="panel-inner">
          <div className="section-title">▸ 21 Disciplines</div>
          <h2 className="section-heading">Choose your path. Carve a new one.</h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: 760 }}>
            Pick one of 4 <b style={{ color: 'var(--moss)' }}>Starter</b> disciplines at creation.
            Develop Affinity to unlock 12 <b style={{ color: 'var(--tan)' }}>Advanced</b> specializations.
            Push further into 66 different <b style={{ color: 'var(--crimson)' }}>Mastery</b> disciplines.
          </p>
          <div className="grid cols-3" style={{ marginTop: 26 }}>
            <div className="card">
              <span className="icon">🌱</span>
              <h3 style={{ color: 'var(--moss)' }}>Starter · 4</h3>
              <p style={{ marginBottom: 14, fontSize: 14 }}>Entry-level. Each opens different Advanced paths.</p>
              <div className="discipline-list">
                {disciplines.starter.map((d) => (
                  <button key={d.name} className="chip tier-starter"
                    style={{ border: 0, cursor: 'pointer' }}
                    onClick={() => setActiveDiscipline({ ...d, tier: 'starter' })}>
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="card">
              <span className="icon">⚡</span>
              <h3 style={{ color: 'var(--tan)' }}>Advanced · 12</h3>
              <p style={{ marginBottom: 14, fontSize: 14 }}>Unlocked through Affinity. Each has a unique skill tree.</p>
              <div className="discipline-list">
                {disciplines.advanced.map((d) => (
                  <button key={d.name} className="chip tier-advanced"
                    style={{ border: 0, cursor: 'pointer' }}
                    onClick={() => setActiveDiscipline({ ...d, tier: 'advanced' })}>
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="card">
              <span className="icon">👑</span>
              <h3 style={{ color: 'var(--crimson)' }}>Mastery · 66</h3>
              <p style={{ marginBottom: 14, fontSize: 14 }}>Here are just a few examples! Plan is for 66 masteries! </p>
              <div className="discipline-list">
                {disciplines.mastery.map((d) => (
                  <button key={d.name} className="chip tier-mastery"
                    style={{ border: 0, cursor: 'pointer' }}
                    onClick={() => setActiveDiscipline({ ...d, tier: 'mastery' })}>
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">TOWN →</div></div>
      </section>

      {/* TOWN */}
      <section className="h-panel wide bg-veil" data-screen-label="04 Town">
        <div className="panel-marker"><div className="num">04</div><div className="label">TOWN BUILDING</div></div>
        <div className="panel-inner">
          <div className="section-title">▸ Town Building</div>
          <h2 className="section-heading">A living town. Shared across characters.</h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: 760 }}>
            42 buildings. 8 categories. 4 visual upgrade tiers. Each building is owned by a
            named NPC who reacts to upgrades with new dialogue and quests.
          </p>
          <div className="grid cols-4" style={{ marginTop: 22, marginBottom: 22 }}>
            {buildings.map((b) =>
            <div className="card" key={b.cat}>
                <h3 style={{ fontSize: 17, lineHeight: 1.2 }}>{b.cat}</h3>
                <p style={{ fontSize: 13 }}>{b.items.join(' · ')}</p>
              </div>
            )}
          </div>
          <div className="panel flat">
            <div className="panel-title">▸ Building Example: Blacksmith</div>
            <table className="ptable" style={{ boxShadow: 'none' }}>
              <thead><tr><th style={{ width: 120 }}>Tier</th><th>Visual Description</th></tr></thead>
              <tbody>
                <tr><td>Tier 1</td><td>Simple forge, anvil, 1–2 trees, 1 horse</td></tr>
                <tr><td>Tier 2</td><td>Larger workshop, 2–3 horses, small storage</td></tr>
                <tr><td>Tier 3</td><td>Multi-room structure, 4+ horses, multiple furnaces</td></tr>
                <tr><td>Tier 4</td><td>Full multi-story smithy, fills entire plot</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">QUESTS →</div></div>
      </section>

      {/* QUESTS */}
      <section className="h-panel wide bg-veil" data-screen-label="05 Quests">
        <div className="panel-marker"><div className="num">05</div><div className="label">QUESTS</div></div>
        <div className="panel-inner">
          <div className="section-title">▸ Quest System</div>
          <h2 className="section-heading">10 chapters. 150+ quests.</h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: 760 }}>
            A 10-chapter narrative drives the main story while side quests, repeatable content,
            and faction missions fill the world with life.
          </p>
          <div className="grid cols-2" style={{ marginTop: 22, alignItems: 'start' }}>
            <table className="ptable">
              <thead><tr><th style={{ width: 60 }}>#</th><th>Title</th><th>Theme</th></tr></thead>
              <tbody>
                {chapters.map(([n, t, theme]) =>
                <tr key={n}><td>{n}</td><td>{t}</td><td>{theme}</td></tr>
                )}
              </tbody>
            </table>
            <div className="grid cols-2" style={{ alignContent: 'start' }}>
              {[
              ['Story Quests', 'Mandatory · advance the chapter'],
              ['Side Quests', 'Optional · unlock NPCs, lore, features'],
              ['Repeatable', 'Daily, weekly · materials & rep'],
              ['Faction', 'Allegiance · lasting consequences']].
              map(([t, d]) =>
              <div key={t} className="card">
                  <h3 style={{ fontSize: 18 }}>{t}</h3>
                  <p style={{ fontSize: 13 }}>{d}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">ITEMS →</div></div>
      </section>

      {/* ITEMS */}
      <section className="h-panel wide bg-veil" data-screen-label="06 Items">
        <div className="panel-marker"><div className="num">06</div><div className="label">ITEMS & GEAR</div></div>
        <div className="panel-inner">
          <div className="section-title">▸ Items & Gear</div>
          <h2 className="section-heading">ARPG-depth loot.</h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: 760 }}>
            Tiered rarity. 100+ affixes. Improve affixes within tiers. Tons of gems to augment your jewelry.
          </p>

          <div style={{ display: 'flex', gap: 8, marginTop: 22, flexWrap: 'wrap' }}>
            {rarities.map((r) =>
            <button key={r.i}
            className={'rarity r' + r.i}
            onClick={() => setActiveRarity(r.i)}
            style={{
              border: 0, cursor: 'pointer',
              boxShadow: activeRarity === r.i ? '0 0 0 3px var(--ink), 0 0 0 6px var(--gold)' : '0 0 0 2px var(--ink)'
            }}>
                T{r.i} · {r.name}
              </button>
            )}
          </div>

          <div className="panel flat" style={{ marginTop: 16 }}>
            <div className="panel-title">▸ {rarities[activeRarity - 1].name} Tier · T{activeRarity}</div>
            <div className="grid cols-3">
              <div><div className="tiny" style={{ color: 'var(--gold)' }}>Affixes</div><div className="pf-lg" style={{ fontSize: 26 }}>{rarities[activeRarity - 1].affixes}</div></div>
              <div><div className="tiny" style={{ color: 'var(--gold)' }}>Sockets</div><div className="pf-lg" style={{ fontSize: 26 }}>{rarities[activeRarity - 1].sockets}</div></div>
              <div><div className="tiny" style={{ color: 'var(--gold)' }}>Enchant Ceiling</div><div className="pf-lg" style={{ fontSize: 26 }}>{rarities[activeRarity - 1].enchant}</div></div>
            </div>
          </div>

          <div className="grid cols-2" style={{ marginTop: 18, alignItems: 'start' }}>
            <div className="panel flat">
              <div className="panel-title">▸ Enchantment Zones</div>
              <table className="ptable" style={{ boxShadow: 'none' }}>
                <thead><tr><th>Level</th><th>Success</th><th>Zone</th></tr></thead>
                <tbody>
                  <tr><td>+0 to +3</td><td>100%</td><td style={{ color: 'var(--moss)' }}>Safe</td></tr>
                  <tr><td>+4 to +6</td><td>70 – 50%</td><td style={{ color: 'var(--gold)' }}>Risk</td></tr>
                  <tr><td>+7 to +10+</td><td>30 – 10%</td><td style={{ color: 'var(--crimson)' }}>High Risk</td></tr>
                </tbody>
              </table>
            </div>
            <div className="panel flat">
              <div className="panel-title">▸ Affix Categories · 100+</div>
              <div className="discipline-list">
                {['Power', 'Vitality', 'Stamina', 'Will Power', 'Luck',
                'Physical', 'Fire', 'Cold', 'Lightning', 'Poison', 'Holy',
                'Armor', 'Life', 'Resistance', 'Evasion',
                'XP Gain', 'Gold Find', 'Item Find', 'Move Speed'].
                map((a) => <div key={a} className="chip">{a}</div>)}
              </div>
              <div className="grid cols-4" style={{ marginTop: 18 }}>
                {[
                ['Ruby', '#c14c3a'],
                ['Sapphire', '#3a86ff'],
                ['Emerald', '#588157'],
                ['Diamond', '#f0f0f0']].
                map(([g, c]) =>
                <div key={g} style={{ textAlign: 'center' }}>
                    <div style={{ display: 'inline-block', marginBottom: 4 }}>
                      <CrystalSprite scale={3} color={c} />
                    </div>
                    <div className="pf" style={{ fontSize: 9, color: 'var(--gold)', letterSpacing: '0.12em' }}>{g}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">TIME →</div></div>
      </section>

      {/* TIME */}
      <section className="h-panel wide bg-veil" data-screen-label="07 Time">
        <div className="panel-marker"><div className="num">07</div><div className="label">TIME SYSTEM</div></div>
        <div className="panel-inner">
          <div className="section-title">▸ Time System</div>
          <h2 className="section-heading">The world doesn't stand still.</h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: 760 }}>
            A 7-period day/night cycle drives NPC behavior, building availability, resource
            respawns, and special events. Plan around the world's rhythm — or miss what only
            happens at midnight.
          </p>
          <div className="grid cols-4" style={{ marginTop: 22 }}>
            {[
            ['🌅', 'Dawn', 'Quiet streets, mist on the hills'],
            ['🏞️', 'Morning', 'Markets open, NPCs commute'],
            ['☀️', 'Noon', 'Peak activity, side quests live'],
            ['🍂', 'Afternoon', 'Crafting hours, training yards'],
            ['🌇', 'Dusk', 'Temples ring, lanterns light'],
            ['🍺', 'Evening', 'Taverns peak, gossip flows'],
            ['🌙', 'Night', 'Rare resources, danger spikes']].
            map(([i, n, d]) =>
            <div className="card" key={n}>
                <span className="icon">{i}</span>
                <h3 style={{ fontSize: 20 }}>{n}</h3>
                <p style={{ fontSize: 13 }}>{d}</p>
              </div>
            )}
            <div className="card" style={{ background: 'var(--gold-deep)', color: 'var(--bg-deep)' }}>
              <span className="icon">⏱</span>
              <h3 style={{ fontSize: 20, color: 'var(--bg-deep)' }}>Tip</h3>
              <p style={{ fontSize: 13, color: 'var(--bg-deep)' }}>Try the day/night toggle in the nav — the whole site swaps to match.</p>
            </div>
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">PUZZLES →</div></div>
      </section>

      {/* PUZZLES */}
      <section className="h-panel wide bg-veil" data-screen-label="08 Puzzles">
        <div className="panel-marker"><div className="num">08</div><div className="label">PUZZLES</div></div>
        <div className="panel-inner">
          <div className="section-title">▸ Puzzle Mechanics</div>
          <h2 className="section-heading">Secrets, in plain sight.</h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: 760 }}>
            Puzzles are woven into buildings, dungeons, and the environment. Every puzzle has a
            discoverable solution. No random trial-and-error — every answer can be figured out
            with careful observation.
          </p>
          <div className="grid cols-3" style={{ marginTop: 24 }}>
            {[
            ['🌍', 'Environmental', 'Hidden in the open world. Rewards curious players who look beyond the obvious path.'],
            ['🏰', 'Spatial / Dungeon', 'Inside instanced content. Navigate, position, and solve to unlock passages.'],
            ['🧠', 'Logic', 'Riddles, sequences, pattern-solving. Every solution can be figured out with observation.']].
            map(([i, t, d]) =>
            <div className="card" key={t}>
                <span className="icon">{i}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            )}
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">ENDGAME →</div></div>
      </section>

      {/* ENDGAME */}
      <section className="h-panel wide bg-veil" data-screen-label="09 Endgame">
        <div className="panel-marker"><div className="num">09</div><div className="label">ENDGAME</div></div>
        <div className="panel-inner">
          <div className="section-title">▸ Endgame</div>
          <h2 className="section-heading">The story ends. The game doesn't.</h2>
          <p style={{ color: 'var(--ink-soft)', maxWidth: 760 }}>
            After Chapter 10, choose 1 of 3 factions — permanently, per character. Each unlocks
            unique dungeons, a stronghold, and exclusive upgrade paths.
          </p>
          <div className="grid cols-3" style={{ marginTop: 24 }}>
            {[
              ['🔱', 'Faction 1', 'Coming soon'],
              ['⚗️', 'Faction 2', 'Coming soon'],
              ['🌑', 'Faction 3', 'Coming soon']
            ].map(([i, n, d]) => (
              <div className="card" key={n} style={{ textAlign: 'center' }}>
                <span className="icon" style={{ fontSize: 40 }}>{i}</span>
                <h3 style={{ fontSize: 22 }}>{n}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <div className="grid cols-2" style={{ marginTop: 24, alignItems: 'start' }}>
            <div className="panel flat">
              <div className="panel-title">▸ Perk + Downside Upgrades</div>
              <table className="ptable" style={{ boxShadow: 'none' }}>
                <thead><tr><th>Perk</th><th>Downside</th></tr></thead>
                <tbody>
                  <tr><td>Increased damage</td><td>More enemies</td></tr>
                  <tr><td>Better loot drops</td><td>Reduced healing</td></tr>
                  <tr><td>XP multiplier</td><td>Enemy HP scaling</td></tr>
                </tbody>
              </table>
            </div>
            <div style={{ display: 'grid', gap: 14 }}>
              <div className="bignum"><span className="n">15-20</span><span className="l">Room Templates</span></div>
              <div className="bignum"><span className="n">3-9</span><span className="l">Faction Dungeons</span></div>
              <div className="bignum"><span className="n">∞</span><span className="l">Upgrade Scaling</span></div>
            </div>
          </div>
        </div>
        <div className="next-hint"><div className="arrow">▶</div><div className="lbl">The Pitch →</div></div>
      </section>

      {/* Discipline modal — rendered outside the scroll flow so it sits above everything */}
      {activeDiscipline && (
        <DisciplineModal
          discipline={activeDiscipline}
          tierMeta={TIER_META[activeDiscipline.tier]}
          onClose={() => setActiveDiscipline(null)}
        />
      )}
    </>
  );
}

/* ============ Discipline Modal ============ */
function DisciplineModal({ discipline, tierMeta, onClose }) {
  // Close on backdrop click
  const onBackdrop = (e) => { if (e.target === e.currentTarget) onClose(); };
  // Close on Escape key
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      onClick={onBackdrop}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(10,8,20,0.78)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}>
      <div className="panel" style={{ maxWidth: 520, width: '100%', position: 'relative', margin: 0 }}>

        {/* Tier badge */}
        <div style={{
          position: 'absolute', top: -14, left: 18,
          background: tierMeta.color, color: 'var(--bg-deep)',
          fontFamily: 'var(--font-pixel)', fontSize: 9,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '6px 10px',
          boxShadow: '0 0 0 2px var(--ink)',
        }}>
          {tierMeta.label} Discipline
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: -10, right: -10,
            width: 28, height: 28,
            background: 'var(--crimson)', color: 'var(--ink)',
            border: 0, fontFamily: 'var(--font-pixel)', fontSize: 10,
            cursor: 'pointer',
            boxShadow: '0 0 0 2px var(--ink), 0 0 0 4px var(--bg-deep)',
          }}
          aria-label="Close">✕</button>

        {/* Name */}
        <div className="panel-title" style={{ marginTop: 8 }}>
          {discipline.icon} {discipline.name.toUpperCase()}
        </div>

        {/* ── Fill in content below ── */}

        <div style={{ display: 'grid', gap: 16 }}>

          {/* Description */}
          <div>
            <div className="tiny" style={{ color: 'var(--gold)', marginBottom: 6 }}>About</div>
            <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: 15, lineHeight: 1.5 }}>
              {discipline.description || '— description coming soon —'}
            </p>
          </div>

          {/* Playstyle */}
          <div>
            <div className="tiny" style={{ color: 'var(--gold)', marginBottom: 6 }}>Playstyle</div>
            <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: 15 }}>
              {discipline.playstyle || '— playstyle notes coming soon —'}
            </p>
          </div>

          {/* Key Skills */}
          {discipline.keySkills && discipline.keySkills.length > 0 && (
            <div>
              <div className="tiny" style={{ color: 'var(--gold)', marginBottom: 6 }}>Key Skills</div>
              <div className="discipline-list">
                {discipline.keySkills.map((s) => (
                  <div key={s} className="chip" style={{ fontSize: 9 }}>{s}</div>
                ))}
              </div>
            </div>
          )}

          {/* Unlocks */}
          {discipline.unlocks && discipline.unlocks.length > 0 && (
            <div>
              <div className="tiny" style={{ color: 'var(--gold)', marginBottom: 6 }}>Unlocks Into</div>
              <div className="discipline-list">
                {discipline.unlocks.map((u) => (
                  <div key={u} className="chip tier-advanced" style={{ fontSize: 9 }}>{u}</div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

window.FeaturesPage = FeaturesPage;
