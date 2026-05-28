import Link from "next/link";
import { getAllProperties } from "@/lib/properties";
import AdminPropertiesTable from "@/components/admin/AdminPropertiesTable";

export default async function AdminPropertiesPage() {
  const properties = await getAllProperties();

  return (
    <main>
      <section className="dpr-admin-header">
        <div>
          <p>Property Desk</p>
          <h1>Property Management</h1>
          <span>
            Manage property opportunities, media, publication status, featured
            listings, and acquisition visibility.
          </span>
        </div>

        <Link href="/admin/properties/new">Add Property</Link>
      </section>

      <AdminPropertiesTable properties={properties} />
    </main>
  );
}