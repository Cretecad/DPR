import FadeUp from "@/components/ui/FadeUp";

export default function AtlasHero() {
  return (
    <section className="dpr-atlas-hero">
      <div className="dpr-hero-copy">
        <FadeUp>
          <p className="dpr-kicker">Property • Trust • Legacy</p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <h1>Own the address your future will remember.</h1>
        </FadeUp>

        <FadeUp delay={0.16}>
          <p className="dpr-hero-text">
            Destiny Point Realty helps buyers, families, and investors discover
            land, homes, and property opportunities with clarity, verification,
            and long-term value.
          </p>
        </FadeUp>

        <FadeUp delay={0.24}>
          <div className="dpr-hero-actions">
            <a href="#properties" className="dpr-btn-primary">
              View Opportunities
            </a>

            <a href="#advisory" className="dpr-btn-text">
              Explore Advisory
            </a>
          </div>
        </FadeUp>
      </div>

      <FadeUp delay={0.32}>
        <aside className="dpr-property-brief">
          <div className="dpr-brief-top">
            <span>Private Property Brief</span>
            <strong>DP-001</strong>
          </div>

          <div className="dpr-map-panel">
            <span className="dpr-map-line line-one" />
            <span className="dpr-map-line line-two" />
            <span className="dpr-map-line line-three" />
            <span className="dpr-map-pin" />
          </div>

          <div className="dpr-brief-body">
            <p>Selected Growth Corridor</p>
            <h3>Lagos Residential Expansion Zone</h3>

            <div className="dpr-brief-grid">
              <span>Use Case</span>
              <strong>Family / Investment</strong>

              <span>Focus</span>
              <strong>Long-term value</strong>

              <span>Review</span>
              <strong>Verification required</strong>
            </div>
          </div>
        </aside>
      </FadeUp>
    </section>
  );
}