import Link from "next/link";
import FadeUp from "@/components/ui/FadeUp";

export default function ConsultationSection() {
  return (
    <section className="dpr-consultation" id="consultation">
      <FadeUp>
        <div className="dpr-consultation-panel">
          <div className="dpr-consultation-copy">
            <p>Strategic Property Guidance</p>

            <h2>Property decisions become stronger when guided by direction.</h2>

            <span>
              Speak with Destiny Point Realty around acquisition, investment
              positioning, land banking, relocation, or long-term planning.
            </span>
          </div>

          <div className="dpr-consultation-form">
            <Link href="/consultation">
              Request Consultation
            </Link>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}