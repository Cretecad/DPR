import FadeUp from "@/components/ui/FadeUp";

const checks = [
  "Ownership confidence",
  "Document review",
  "Inspection readiness",
  "Acquisition guidance",
];

export default function VerificationSection() {
  return (
    <section className="dpr-verification" id="verification">
      <div className="dpr-verification-copy">
        <FadeUp>
          <p className="dpr-section-kicker">
            Verification Before Commitment
          </p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <h2>Trust is not a feature. It is the foundation.</h2>
        </FadeUp>

        
          <p>
            Every meaningful property decision should move through clarity
            before commitment. Destiny Point Realty positions verification as
            part of the buying journey, helping clients approach real estate
            with calm, confidence, and better questions.
          </p>
       
      </div>

      <FadeUp delay={0.24}>
        <div className="dpr-verification-panel">
          <div className="dpr-verification-stamp">
            <span>DPR</span>
            <strong>Review Path</strong>
          </div>

          <div className="dpr-check-list">
            {checks.map((item, index) => (
              <div
                className="dpr-check-item"
                key={item}
                style={{
                  transitionDelay: `${index * 0.08}s`,
                }}
              >
                <span />
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  );
}