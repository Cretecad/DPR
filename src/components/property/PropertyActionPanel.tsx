import Link from "next/link";

const actions = [
  {
    title: "Request Inspection",
    text: "Schedule a guided inspection before making any financial commitment.",
    href: "/#consultation",
  },
  {
    title: "Ask for Documents",
    text: "Request available title, survey, allocation, or ownership documents.",
    href: "/#consultation",
  },
  {
    title: "Speak with Advisor",
    text: "Discuss suitability, pricing, verification, and acquisition direction.",
    href: "/#consultation",
  },
];

export default function PropertyActionPanel() {
  return (
    <section className="dpr-action-panel">
      {actions.map((action) => (
        <article key={action.title}>
          <h3>{action.title}</h3>
          <p>{action.text}</p>
          <Link href={action.href}>Begin</Link>
        </article>
      ))}
    </section>
  );
}