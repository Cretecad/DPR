const insights = [
  "Land demand expanding across emerging residential corridors",
  "Long-term buyers prioritizing documentation confidence",
  "Urban edge districts attracting early investment attention",
  "Residential acquisition shifting toward future-growth regions",
  "Buyers increasingly seeking guided property advisory",
];

export default function MarketTicker() {
  return (
    <section className="dpr-market-ticker">
      <div className="dpr-market-track">
        {[...insights, ...insights].map((item, index) => (
          <div className="dpr-market-item" key={`${item}-${index}`}>
            <span />
            <p>{item}</p>
          </div>
        ))}
      </div>
    </section>
  );
}