import { getConsultations } from "@/lib/consultations";
import AdminConsultationsTable from "@/components/admin/AdminConsultationsTable";

export default async function AdminConsultationsPage() {
  const consultations = await getConsultations();

  const active = consultations.filter((item) => !item.is_archived);
  const archived = consultations.filter((item) => item.is_archived);

  const newItems = active.filter((item) => item.status === "New").length;
  const contacted = active.filter((item) => item.status === "Contacted").length;
  const inProgress = active.filter(
    (item) => item.status === "In Progress",
  ).length;
  const closed = active.filter((item) => item.status === "Closed").length;

  return (
    <main>
      <section className="dpr-admin-header">
        <div>
          <p>Consultation Desk</p>

          <h1>Consultation Requests</h1>

          <span>
            Review strategic acquisition, land banking, relocation, commercial
            expansion, and investment consultation requests.
          </span>
        </div>
      </section>

      <section className="dpr-admin-kpi-grid dpr-admin-kpi-compact">
        <article>
          <span>{active.length}</span>
          <p>Active</p>
        </article>

        <article>
          <span>{newItems}</span>
          <p>New</p>
        </article>

        <article>
          <span>{contacted}</span>
          <p>Contacted</p>
        </article>

        <article>
          <span>{inProgress}</span>
          <p>In Progress</p>
        </article>

        <article>
          <span>{closed}</span>
          <p>Closed</p>
        </article>

        <article>
          <span>{archived.length}</span>
          <p>Archived</p>
        </article>
      </section>

      <AdminConsultationsTable consultations={consultations} />
    </main>
  );
}