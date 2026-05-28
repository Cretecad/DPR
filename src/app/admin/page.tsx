import Link from "next/link";
import { getAllProperties } from "@/lib/properties";

export default async function AdminDashboardPage() {
  const properties = await getAllProperties();

  const totalProperties = properties.length;
  const publishedProperties = properties.filter(
    (property) => property.is_published,
  ).length;
  const hiddenProperties = properties.filter(
    (property) => !property.is_published,
  ).length;
  const featuredProperties = properties.filter(
    (property) => property.is_featured,
  ).length;
  const totalImages = properties.reduce(
    (sum, property) => sum + (property.property_images?.length ?? 0),
    0,
  );

  const missingImages = properties.filter((property) => !property.image_url);
  const pendingVerification = properties.filter(
    (property) => property.status === "Verification Required",
  );
  const recentProperties = properties.slice(0, 5);

  return (
    <main>
      <section className="dpr-admin-header">
        <div>
          <p>Command Overview</p>
          <h1>Admin Dashboard</h1>
          <span>
            Monitor property inventory, publishing health, media readiness, and
            verification status from one operating console.
          </span>
        </div>

        <Link href="/admin/properties/new">Add Property</Link>
      </section>

      <section className="dpr-admin-kpi-grid">
        <article>
          <span>{totalProperties}</span>
          <p>Total Properties</p>
        </article>

        <article>
          <span>{publishedProperties}</span>
          <p>Published</p>
        </article>

        <article>
          <span>{hiddenProperties}</span>
          <p>Hidden</p>
        </article>

        <article>
          <span>{featuredProperties}</span>
          <p>Featured</p>
        </article>

        <article>
          <span>{totalImages}</span>
          <p>Total Images</p>
        </article>
      </section>

      <section className="dpr-admin-dashboard-grid">
        <article className="dpr-admin-panel">
          <div className="dpr-admin-panel-head">
            <p>Recent Inventory</p>
            <Link href="/admin/properties">Manage All</Link>
          </div>

          <div className="dpr-admin-list">
            {recentProperties.map((property) => (
              <div key={property.id}>
                <strong>{property.title}</strong>
                <span>{property.code} • {property.status}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="dpr-admin-panel">
          <div className="dpr-admin-panel-head">
            <p>Missing Media</p>
            <Link href="/admin/properties">Review</Link>
          </div>

          <div className="dpr-admin-list">
            {missingImages.length > 0 ? (
              missingImages.slice(0, 5).map((property) => (
                <div key={property.id}>
                  <strong>{property.title}</strong>
                  <span>No cover image uploaded</span>
                </div>
              ))
            ) : (
              <div>
                <strong>All clear</strong>
                <span>Every property has a cover image.</span>
              </div>
            )}
          </div>
        </article>

        <article className="dpr-admin-panel">
          <div className="dpr-admin-panel-head">
            <p>Verification Queue</p>
            <Link href="/admin/properties">Open Desk</Link>
          </div>

          <div className="dpr-admin-list">
            {pendingVerification.length > 0 ? (
              pendingVerification.slice(0, 5).map((property) => (
                <div key={property.id}>
                  <strong>{property.title}</strong>
                  <span>{property.location}</span>
                </div>
              ))
            ) : (
              <div>
                <strong>No pending verification</strong>
                <span>Nothing currently marked as verification required.</span>
              </div>
            )}
          </div>
        </article>

        <article className="dpr-admin-panel dpr-admin-quick-panel">
          <p>Quick Actions</p>

          <div>
            <Link href="/admin/properties/new">Add Property</Link>
            <Link href="/admin/properties">Manage Properties</Link>
            <Link href="/properties">View Public Catalogue</Link>
          </div>
        </article>
      </section>
    </main>
  );
}