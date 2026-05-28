import FadeUp from "@/components/ui/FadeUp";

const principles = [
  "Location intelligence before listing selection",
  "Documentation confidence before financial commitment",
  "Long-term value before emotional pressure",
  "Guided acquisition before blind negotiation",
];

export default function IdentitySection() {
  return (
    <section className="dpr-identity" id="advisory">
      <div className="dpr-identity-label">
        <span>01</span>
        <p>Our Point of Difference</p>
      </div>

      <div className="dpr-identity-main">
        <FadeUp>
          <h2>
            Real estate should not begin with a property.
            <span> It should begin with direction.</span>
          </h2>
        </FadeUp>

        
          <p>
            Destiny Point Realty is built for people who want more than
            available spaces. We help buyers understand where they are going,
            what they are building, and which property decision truly supports
            that future.
          </p>
      

        <FadeUp delay={0.18}>
          <div className="dpr-principle-list">
            {principles.map((item) => (
              <div className="dpr-principle" key={item}>
                <span />
                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}