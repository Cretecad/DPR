import ConsultationForm from "@/components/consultation/ConsultationForm";

export default function ConsultationPage() {
  return (
    <main className="dpr-consultation-page">
      <section className="dpr-consultation-hero">
        <p>Property Consultation</p>

        <h1>
          Strategic property guidance built around your direction.
        </h1>

        <span>
          Speak with Destiny Point Realty around acquisition planning,
          investment positioning, relocation, land banking, or long-term
          property strategy.
        </span>
      </section>

      <ConsultationForm />
    </main>
  );
}