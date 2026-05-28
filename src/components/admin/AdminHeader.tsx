import Link from "next/link";

export default function AdminHeader() {
  return (
    <header className="dpr-admin-topbar">
      <div>
        <p>Admin Workspace</p>
        <strong>Destiny Point Realty</strong>
      </div>

      <Link href="/">View Site</Link>
    </header>
  );
}