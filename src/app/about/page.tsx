import FadeUp from "@/components/ui/FadeUp";
import Link from "next/link";

const principles = [
  {
    title: "Direction Before Transaction",
    text: "We believe property decisions should begin with understanding where a person is going, not simply what is available on the market.",
  },
  {
    title: "Verification Before Commitment",
    text: "Every serious acquisition deserves clarity around legitimacy, documentation, and long-term implications before financial commitment.",
  },
  {
    title: "Legacy Over Speculation",
    text: "We focus on opportunities capable of supporting stability, growth, generational transfer, and meaningful long-term value.",
  },
  {
    title: "Advisory Over Pressure",
    text: "Real estate should not feel manipulative. We approach guidance with patience, intelligence, and informed support.",
  },
];

export default function AboutPage() {
  return (
    <main className="dpr-about-page">
      <section className="dpr-about-hero">
        <div>
          <FadeUp>
            <p>About Destiny Point Realty</p>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h1>
              Built around direction,
              <span> trust, and long-term value.</span>
            </h1>
          </FadeUp>
        </div>

        <FadeUp delay={0.16}>
          <div className="dpr-about-intro">
            <p>
              Destiny Point Realty exists for people who believe property is
              more than acquisition. It is positioning, stability, vision,
              leverage, and legacy.
            </p>

            <p>
              We approach real estate through a framework that prioritizes
              verification, strategic direction, and sustainable opportunity
              instead of emotional pressure or short-term speculation.
            </p>
          </div>
        </FadeUp>
      </section>

      <section className="dpr-about-grid">
        <FadeUp>
          <article className="dpr-about-card large">
            <span>Our Philosophy</span>

            <h2>
              Real estate should help people move closer to the future they are
              trying to build.
            </h2>

            <p>
              Destiny Point Realty was designed around the belief that property
              decisions shape financial outcomes, lifestyle quality, family
              stability, business growth, and generational continuity.
            </p>

            <p>
              Because of that, we believe buyers deserve more than listings.
              They deserve structure, clarity, guidance, and informed
              acquisition support.
            </p>
          </article>
        </FadeUp>

        <FadeUp delay={0.08}>
          <article className="dpr-about-card">
            <span>What We Focus On</span>

            <div className="dpr-about-stack">
              <strong>Residential Opportunities</strong>
              <strong>Land Banking</strong>
              <strong>Growth Corridors</strong>
              <strong>Investment Positioning</strong>
              <strong>Property Verification</strong>
              <strong>Acquisition Guidance</strong>
            </div>
          </article>
        </FadeUp>
      </section>

      <section className="dpr-about-principles">
        <div className="dpr-about-section-head">
          <p>Operating Principles</p>

          <h2>
            The standards shaping how Destiny Point Realty operates.
          </h2>
        </div>

        <div className="dpr-about-principle-grid">
          {principles.map((principle, index) => (
            <FadeUp delay={index * 0.08} key={principle.title}>
              <article className="dpr-about-principle">
                <span>{String(index + 1).padStart(2, "0")}</span>

                <strong>{principle.title}</strong>

                <p>{principle.text}</p>
              </article>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="dpr-about-vision">
        <FadeUp>
          <div>
            <p>Long-Term Vision</p>

            <h2>
              A real estate platform designed to operate with intelligence,
              structure, and trust at scale.
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={0.08}>
          <div className="dpr-about-vision-copy">
            <p>
              Destiny Point Realty is being positioned as a refined modern real
              estate platform where advisory, verification, acquisition, and
              opportunity discovery operate together within one ecosystem.
            </p>

            <p>
              The objective is not simply to participate in the market, but to
              contribute to raising the quality, structure, and professionalism
              of the property experience itself.
            </p>

            <Link href="/properties">Explore Properties</Link>
          </div>
        </FadeUp>
      </section>
    </main>
  );
}