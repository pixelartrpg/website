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
              <div className="hero-tag">A 16-bit Action RPG + Town Building</div>
            </div>
            <div className="hero-cta">
              <button className="pbtn primary" onClick={() => go('features')}>
                <span>EXPLORE THE SYSTEMS</span><span className="arrow"></span>
              </button>
<button className="pbtn ghost" onClick={() => go('about')}>About the Team</button>
            </div>
          </div>
        </div>
        <div className="next-hint">
          <div className="arrow">▶</div>
          <div className="lbl">SCROLL →</div>
        </div>
      </section>
    </>);

}

window.HomePage = HomePage;