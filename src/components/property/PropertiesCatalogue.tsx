"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import EditorialMedia from "@/components/ui/EditorialMedia";
import type { Property } from "@/types/property";

type PropertiesCatalogueProps = {
  properties: Property[];
};

const filters = [
  "All",
  "Land Banking",
  "Residential Living",
  "Investment Property",
] as const;

const variantByType = {
  "Land Banking": "land",
  "Residential Living": "home",
  "Investment Property": "investment",
} as const;

export default function PropertiesCatalogue({
  properties,
}: PropertiesCatalogueProps) {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const stats = useMemo(() => {
    return {
      total: properties.length,
      land: properties.filter((property) => property.type === "Land Banking")
        .length,
      residential: properties.filter(
        (property) => property.type === "Residential Living",
      ).length,
      investment: properties.filter(
        (property) => property.type === "Investment Property",
      ).length,
    };
  }, [properties]);

  const filteredProperties = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return properties.filter((property) => {
      const matchesFilter =
        activeFilter === "All" || property.type === activeFilter;

      const searchableText = [
        property.code,
        property.title,
        property.type,
        property.location,
        property.price_label,
        property.status,
        property.purpose,
        property.summary,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch.length === 0 ||
        searchableText.includes(normalizedSearch);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchTerm, properties]);

  return (
    <>
      <section className="dpr-catalogue-stats">
        <article>
          <span>{stats.total}</span>
          <p>Total Opportunities</p>
        </article>

        <article>
          <span>{stats.land}</span>
          <p>Land Banking</p>
        </article>

        <article>
          <span>{stats.residential}</span>
          <p>Residential Living</p>
        </article>

        <article>
          <span>{stats.investment}</span>
          <p>Investment Property</p>
        </article>
      </section>

      <section className="dpr-properties-controls">
        <div className="dpr-properties-filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={
                activeFilter === filter
                  ? "dpr-filter-btn active"
                  : "dpr-filter-btn"
              }
            >
              {filter}
            </button>
          ))}
        </div>

        <label className="dpr-property-search">
          Search opportunities
          <input
            type="search"
            placeholder="Search by location, purpose, code..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>
      </section>

      <section className="dpr-properties-grid">
        {filteredProperties.map((property) => {
          const variant =
            variantByType[property.type as keyof typeof variantByType] ??
            "land";

          return (
            <article className="dpr-properties-card" key={property.slug}>
              <EditorialMedia
                label={property.type}
                variant={variant}
                imageUrl={property.image_url}
                />

              <div className="dpr-properties-card-body">
                <div className="dpr-property-badges">
                  {property.is_featured && (
                    <span className="featured">Featured</span>
                  )}
                  <span>{property.status}</span>
                </div>

                <div className="dpr-showcase-meta">
                  <span>{property.code}</span>
                  <strong>{property.price_label}</strong>
                </div>

                <h2>{property.title}</h2>

                <p className="dpr-showcase-location">{property.location}</p>

                <p className="dpr-showcase-note">{property.summary}</p>

                <Link href={`/properties/${property.slug}`}>View Brief</Link>
              </div>
            </article>
          );
        })}
      </section>

      {filteredProperties.length === 0 && (
        <section className="dpr-empty-properties">
          <h2>No matching opportunities found.</h2>
          <p>Try another search term or reset the property category.</p>
        </section>
      )}
    </>
  );
}