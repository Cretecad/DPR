const steps = [
  {
    title: "Review the brief",
    text: "Understand the property purpose, location logic, pricing position, and acquisition fit.",
  },
  {
    title: "Request verification",
    text: "Move through documentation review, inspection readiness, and ownership confidence checks.",
  },
  {
    title: "Schedule inspection",
    text: "Visit the property or request guided inspection support before making financial commitment.",
  },
  {
    title: "Proceed with guidance",
    text: "Continue with negotiation, documentation, payment structure, and closing support.",
  },
];

export default function AcquisitionPath() {
  return (
    <section className="dpr-acquisition-path">
      <p>Acquisition Path</p>

      <h2>A clearer route from interest to ownership.</h2>

      <div className="dpr-acquisition-grid">
        {steps.map((step, index) => (
          <article key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}