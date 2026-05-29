import Link from "next/link";

const links = [
  { label: "Overview", href: "/admin" },
  { label: "Properties", href: "/admin/properties" },
  { label: "Property Leads", href: "/admin/inquiries" },
  { label: "Consultations", href: "/admin/leads/consultations" },
  { label: "Contact Requests", href: "/admin/leads/contact" },
  { label: "Verification", href: "/admin/verification" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  return (
    <aside className="dpr-admin-sidebar">
      <Link href="/" className="dpr-admin-logo">
        <span>DPR</span>
        <strong>Destiny Point</strong>
      </Link>

      <nav>
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}