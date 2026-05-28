import Link from "next/link";
import PropertiesCatalogue from "@/components/property/PropertiesCatalogue";
import { getPublishedProperties } from "@/lib/properties";
import "@/app/home.css";

export default async function PropertiesPage() {
  const properties = await getPublishedProperties();

  return (
    <main className="dpr-properties-page">
      <header className="dpr-detail-nav">
        <Link href="/" className="dpr-detail-brand">
          <span>DPR</span>
          <strong>Destiny Point Realty</strong>
        </Link>

        <Link href="/#consultation" className="dpr-detail-nav-action">
          Request Consultation
        </Link>
      </header>

      <section className="dpr-properties-hero">
        <Link href="/" className="dpr-detail-back">
          ← Back to Home
        </Link>

        <p>Property Opportunities</p>

        <h1>Explore property decisions shaped around purpose.</h1>

        <span>
          Browse selected land, residential, and investment opportunities
          structured around trust, acquisition clarity, and long-term value.
        </span>
      </section>

      <PropertiesCatalogue properties={properties} />
    </main>
  );
}