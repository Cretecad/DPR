import FadeUp from "@/components/ui/FadeUp";

const opportunities = [
  {
    code: "LAND",
    title: "Land Banking",
    text: "Secure strategic land positions in emerging corridors before value becomes obvious.",
  },
  {
    code: "HOME",
    title: "Residential Living",
    text: "Discover homes selected around comfort, access, family needs, and long-term suitability.",
  },
  {
    code: "INV",
    title: "Investment Property",
    text: "Evaluate opportunities through rental demand, resale potential, and capital growth signals.",
  },
  {
    code: "COMM",
    title: "Commercial Spaces",
    text: "Find business-ready locations shaped around visibility, access, and operational advantage.",
  },
];

export default function OpportunityAtlas() {
  return (
    <section className="dpr-opportunity-atlas" id="properties">
      <div className="dpr-atlas-heading">
        <FadeUp>
          <p>Opportunity Atlas</p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <h2>Choose by purpose, not pressure.</h2>
        </FadeUp>
      </div>

      <div className="dpr-opportunity-grid">
        {opportunities.map((item, index) => (
          <FadeUp key={item.code} delay={index * 0.08}>
            <article className="dpr-opportunity-card">
              <span className="dpr-card-index">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div>
                <p>{item.code}</p>
                <h3>{item.title}</h3>
                <span>{item.text}</span>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}