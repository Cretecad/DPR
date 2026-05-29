import { getContactRequests } from "@/lib/contactRequests";
import AdminContactRequestsTable from "@/components/admin/AdminContactRequestsTable";

export default async function AdminContactRequestsPage() {
  const requests = await getContactRequests();

  const active = requests.filter((item) => !item.is_archived);
  const archived = requests.filter((item) => item.is_archived);

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
          <p>Contact Desk</p>

          <h1>Contact Requests</h1>

          <span>
            Review support, partnership, business, platform, and follow-up
            requests from the public contact page.
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

      <AdminContactRequestsTable requests={requests} />
    </main>
  );
}