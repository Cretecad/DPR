import FadeUp from "@/components/ui/FadeUp";

export default function LegacySection() {
  return (
    <section className="dpr-legacy" id="legacy">
      <div className="dpr-legacy-inner">
        <FadeUp>
          <p>Legacy Perspective</p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <h2>
            A property is not just where life happens.
            <span> It is what life can leave behind.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.16}>
          <div className="dpr-legacy-footer">
            <a href="#consultation">Begin Your Property Journey</a>
            <span>Destiny Point Realty</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}