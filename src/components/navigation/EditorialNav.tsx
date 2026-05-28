"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { label: "Properties", href: "/properties" },
  { label: "Advisory", href: "#advisory" },
  { label: "Verification", href: "#verification" },
  { label: "Contact", href: "#contact" },
];

export default function EditorialNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="dpr-nav">
      <Link href="/" className="dpr-brand" onClick={() => setIsOpen(false)}>
        <span>DPR</span>
        <strong>Destiny Point Realty</strong>
      </Link>

      <nav className="dpr-nav-links">
        {navLinks.map((item) => (
          <Link href={item.href} key={item.label}>
            {item.label}
          </Link>
        ))}
      </nav>

      <Link href="#consultation" className="dpr-nav-action">
        Book Consultation
      </Link>

      <button
        type="button"
        className="dpr-menu-button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span />
        <span />
      </button>

      {isOpen && (
        <div className="dpr-mobile-menu">
          {navLinks.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <Link href="#consultation" onClick={() => setIsOpen(false)}>
            Book Consultation
          </Link>
        </div>
      )}
    </header>
  );
}