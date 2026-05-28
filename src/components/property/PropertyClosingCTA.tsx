import Link from "next/link";

export default function PropertyClosingCTA() {
  return (
    <section className="dpr-property-closing">
      <div>
        <p>Next Step</p>

        <h2>Move forward with clarity, not pressure.</h2>

        <span>
          Request a private brief and let Destiny Point Realty guide the next
          conversation around verification, inspection, and acquisition fit.
        </span>
      </div>

      <Link href="/#consultation">Request Private Brief</Link>
    </section>
  );
}