import { getPropertyInquiries } from "@/lib/inquiries";
import AdminInquiriesTable from "@/components/admin/AdminInquiriesTable";

export default async function AdminInquiriesPage() {
  const inquiries = await getPropertyInquiries();

  const activeInquiries = inquiries.filter((item) => !item.is_archived);
  const archivedInquiries = inquiries.filter((item) => item.is_archived);

  const newInquiries = activeInquiries.filter(
    (item) => item.status === "New",
  ).length;

  const contactedInquiries = activeInquiries.filter(
    (item) => item.status === "Contacted",
  ).length;

  const inProgressInquiries = activeInquiries.filter(
    (item) => item.status === "In Progress",
  ).length;

  const closedInquiries = activeInquiries.filter(
    (item) => item.status === "Closed",
  ).length;

  return (
    <main>
      <section className="dpr-admin-header">
        <div>
          <p>Lead Desk</p>
          <h1>Property Inquiries</h1>
          <span>
            Review buyer interest, inspection requests, document requests, and
            advisory conversations submitted from public property pages.
          </span>
        </div>
      </section>

      <section className="dpr-admin-kpi-grid dpr-admin-kpi-compact">
        <article>
          <span>{activeInquiries.length}</span>
          <p>Active Leads</p>
        </article>

        <article>
          <span>{newInquiries}</span>
          <p>New</p>
        </article>

        <article>
          <span>{contactedInquiries}</span>
          <p>Contacted</p>
        </article>

        <article>
          <span>{inProgressInquiries}</span>
          <p>In Progress</p>
        </article>

        <article>
          <span>{closedInquiries}</span>
          <p>Closed</p>
        </article>

        <article>
          <span>{archivedInquiries.length}</span>
          <p>Archived</p>
        </article>
      </section>

      <AdminInquiriesTable inquiries={inquiries} />
    </main>
  );
}