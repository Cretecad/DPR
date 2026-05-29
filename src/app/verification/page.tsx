import FadeUp from "@/components/ui/FadeUp";
import VerificationForm from "@/components/verification/VerificationForm";

const checks = [
  "Ownership confidence",
  "Document review",
  "Title clarity",
  "Acquisition risk awareness",
];

export default function VerificationPage() {
  return (
    <main className="dpr-verification-page">
      <section className="dpr-verification-page-hero">
        <FadeUp>
          <p>Property Verification</p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <h1>Trust should be established before commitment.</h1>
        </FadeUp>

        <FadeUp delay={0.16}>
          <span>
            Request review support for property documents, ownership confidence,
            title clarity, and acquisition safety before making major financial
            decisions.
          </span>
        </FadeUp>
      </section>

      <section className="dpr-verification-page-grid">
        <FadeUp>
          <VerificationForm />
        </FadeUp>

        <FadeUp delay={0.08}>
          <aside className="dpr-verification-side-panel">
            <p>Verification Path</p>

            <h2>Clarity protects the buyer before money moves.</h2>

            <div>
              {checks.map((check, index) => (
                <article key={check}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{check}</strong>
                </article>
              ))}
            </div>
          </aside>
        </FadeUp>
      </section>
    </main>
  );
}