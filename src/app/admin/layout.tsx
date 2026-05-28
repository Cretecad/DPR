import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import "@/app/home.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="dpr-admin-shell">
      <AdminSidebar />

      <div className="dpr-admin-main">
        <AdminHeader />
        <div className="dpr-admin-content">{children}</div>
      </div>
    </section>
  );
}