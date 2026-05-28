import Link from "next/link";

export default function Footer() {
  return (
    <footer className="dpr-footer">
      <div className="dpr-footer-top">
        <div>
          <Link href="/" className="dpr-footer-brand">
            Destiny Point Realty
          </Link>

          <p>
            A refined real estate company helping people approach property
            decisions with trust, direction, and long-term value.
          </p>
        </div>

        <div className="dpr-footer-links">
          <div>
            <h4>Explore</h4>
            <Link href="#properties">Properties</Link>
            <Link href="#advisory">Advisory</Link>
            <Link href="#verification">Verification</Link>
          </div>

          <div>
            <h4>Company</h4>
            <Link href="#legacy">Legacy</Link>
            <Link href="#consultation">Consultation</Link>
            <Link href="#contact">Contact</Link>
          </div>
        </div>
      </div>

      <div className="dpr-footer-bottom">
        <span>© {new Date().getFullYear()} Destiny Point Realty.</span>
        <span>Property • Trust • Legacy</span>
      </div>
    </footer>
  );
}