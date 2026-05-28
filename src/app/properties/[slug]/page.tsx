import Link from "next/link";
import { notFound } from "next/navigation";

import AcquisitionPath from "@/components/property/AcquisitionPath";
import IntelligenceSnapshot from "@/components/property/IntelligenceSnapshot";
import PropertyActionPanel from "@/components/property/PropertyActionPanel";
import PropertyInquiryForm from "@/components/property/PropertyInquiryForm";
import PropertyClosingCTA from "@/components/property/PropertyClosingCTA";

import { getPropertyBySlug } from "@/lib/property";

import "@/app/home.css";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;

  const property = await getPropertyBySlug(slug);

  if (!property) {
    return {
      title: "Property Not Found | Destiny Point Realty",
    };
  }

  return {
    title: `${property.title} | Destiny Point Realty`,
    description: property.summary,
  };
}

export default async function PropertyDetailPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const property = await getPropertyBySlug(slug);

  if (!property) {
    notFound();
  }

  return (
    <main className="dpr-property-detail">
      <header className="dpr-detail-nav">
        <Link href="/" className="dpr-detail-brand">
          <span>DPR</span>
          <strong>Destiny Point Realty</strong>
        </Link>

        <Link href="/#consultation" className="dpr-detail-nav-action">
          Request Consultation
        </Link>
      </header>

      <section className="dpr-detail-hero">
        <Link href="/properties" className="dpr-detail-back">
          ← Back to Opportunities
        </Link>

        <div className="dpr-detail-layout">
          <div>
            <p className="dpr-detail-kicker">{property.code}</p>

            <h1>{property.title}</h1>

            <p className="dpr-detail-summary">
              {property.summary}
            </p>
          </div>

          <aside className="dpr-detail-brief">
            <span>{property.type}</span>

            <strong>{property.price_label}</strong>

            <div>
              <p>Location</p>
              <h3>{property.location}</h3>
            </div>

            <div>
              <p>Status</p>
              <h3>{property.status}</h3>
            </div>

            <div>
              <p>Purpose</p>
              <h3>{property.purpose}</h3>
            </div>
          </aside>
        </div>
      </section>

      <section className="dpr-detail-body">
        <div className="dpr-detail-gallery">
        <div className="dpr-detail-media">
          {property.image_url && <img src={property.image_url} alt={property.title} />}
        </div>

        {property.property_images && property.property_images.length > 1 && (
          <div className="dpr-gallery-strip">
            {property.property_images.map((image) => (
              <div className="dpr-gallery-thumb" key={image.id}>
                <img src={image.image_url} alt={image.alt_text || property.title} />
                {image.is_cover && <span>Cover</span>}
              </div>
            ))}
          </div>
        )}
      </div>

        <div className="dpr-detail-highlights">
          <p>Property Intelligence</p>

          <h2>Decision highlights</h2>

          <div>
            {property.highlights.map((item) => (
              <article key={item}>
                <span />
                <strong>{item}</strong>
              </article>
            ))}
          </div>

          <Link href="/#consultation">
            Request Private Brief
          </Link>
        </div>
      </section>

      <AcquisitionPath />

      <IntelligenceSnapshot />

      <PropertyActionPanel />
      <PropertyInquiryForm
      propertyId={property.id}
      propertyTitle={property.title}
      propertyCode={property.code}
    />
      <PropertyClosingCTA />
    </main>
  );
}