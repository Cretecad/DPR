const metrics = [
  { label: "Documentation Confidence", value: "Review Required", score: "78%" },
  { label: "Growth Outlook", value: "Strong", score: "91%" },
  { label: "Access Potential", value: "Developing", score: "84%" },
  { label: "Investment Fit", value: "Long-term", score: "88%" },
];

export default function IntelligenceSnapshot() {
  return (
    <section className="dpr-intelligence-snapshot">
      <div className="dpr-snapshot-copy">
        <p>Property Intelligence Snapshot</p>

        <h2>Every property should be understood before it is pursued.</h2>

        <span>
          This snapshot gives buyers a calmer way to evaluate opportunity,
          risk, and long-term suitability before moving into inspection or
          payment conversations.
        </span>
      </div>

      <div className="dpr-snapshot-grid">
        {metrics.map((metric) => (
          <article key={metric.label}>
            <span>{metric.label}</span>
            <strong>{metric.score}</strong>
            <p>{metric.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}