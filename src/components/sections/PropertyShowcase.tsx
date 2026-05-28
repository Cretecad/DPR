import Link from "next/link";

import FadeUp from "@/components/ui/FadeUp";
import EditorialMedia from "@/components/ui/EditorialMedia";

import type { Property } from "@/types/property";

type PropertyShowcaseProps = {
  properties: Property[];
};

const variantByType = {
  "Land Banking": "land",
  "Residential Living": "home",
  "Investment Property": "investment",
} as const;

export default function PropertyShowcase({
  properties,
}: PropertyShowcaseProps) {
  return (
    <section className="dpr-property-showcase">
      <div className="dpr-showcase-head">
        <FadeUp>
          <p>Selected Opportunities</p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <h2>
            Property options presented as decisions, not distractions.
          </h2>
        </FadeUp>
      </div>

      <div className="dpr-showcase-list">
        {properties.slice(0, 3).map((property, index) => {
          const variant =
            variantByType[
              property.type as keyof typeof variantByType
            ] ?? "land";

          return (
            <FadeUp
              key={property.id}
              delay={index * 0.08}
            >
              <article className="dpr-showcase-card">
                <EditorialMedia
                label={property.type}
                variant={variant}
                imageUrl={property.image_url}
              />

                <div className="dpr-showcase-content">
                  <div>
                    <div className="dpr-property-badges">
                      {property.is_featured && (
                        <span className="featured">
                          Featured
                        </span>
                      )}

                      <span>{property.status}</span>
                    </div>

                    <div className="dpr-showcase-meta">
                      <span>{property.code}</span>

                      <strong>
                        {property.price_label}
                      </strong>
                    </div>

                    <h3>{property.title}</h3>

                    <p className="dpr-showcase-location">
                      {property.location}
                    </p>

                    <p className="dpr-showcase-note">
                      {property.summary}
                    </p>
                  </div>

                  <Link
                    href={`/properties/${property.slug}`}
                  >
                    Request Brief
                  </Link>
                </div>
              </article>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}