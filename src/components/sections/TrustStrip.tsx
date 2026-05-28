const items = [
  {
    title: "Verified Opportunities",
    text: "Property options positioned around trust, documentation, and buyer confidence.",
  },
  {
    title: "Guided Acquisition",
    text: "A structured path from discovery to inspection, negotiation, and closing.",
  },
  {
    title: "Legacy-Focused Advisory",
    text: "Real estate decisions shaped around family, investment, and long-term value.",
  },
];

export default function TrustStrip() {
  return (
    <section className="dpr-trust-strip">
      {items.map((item) => (
        <article key={item.title} className="dpr-trust-card">
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </section>
  );
}