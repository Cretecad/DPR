"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { PropertyInquiry } from "@/types/inquiry";

import {
  archiveInquiry,
  deleteInquiry,
  restoreInquiry,
  updateInquiryStatus,
} from "@/app/admin/inquiries/actions";

type Props = {
  inquiries: PropertyInquiry[];
};

const statuses = ["New", "Contacted", "In Progress", "Closed"];

const inquiryTypes = [
  "All",
  "Request Inspection",
  "Ask for Documents",
  "Speak with Advisor",
  "Price / Payment Discussion",
];

export default function AdminInquiriesTable({ inquiries }: Props) {
  const router = useRouter();

  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [archivingId, setArchivingId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [archiveFilter, setArchiveFilter] = useState("Active");

  const [selectedInquiry, setSelectedInquiry] =
    useState<PropertyInquiry | null>(null);

  const filteredInquiries = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return inquiries.filter((inquiry) => {
      const matchesSearch =
        !search ||
        [
          inquiry.full_name,
          inquiry.contact,
          inquiry.property_title,
          inquiry.property_code,
          inquiry.inquiry_type,
          inquiry.status,
          inquiry.message,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" || inquiry.status === statusFilter;

      const matchesType =
        typeFilter === "All" || inquiry.inquiry_type === typeFilter;

      const matchesArchive =
        archiveFilter === "All" ||
        (archiveFilter === "Active" && !inquiry.is_archived) ||
        (archiveFilter === "Archived" && inquiry.is_archived);

      return matchesSearch && matchesStatus && matchesType && matchesArchive;
    });
  }, [inquiries, searchTerm, statusFilter, typeFilter, archiveFilter]);

  async function handleStatusChange(id: string, status: string) {
    setSavingId(id);
    await updateInquiryStatus(id, status);
    setSavingId(null);
    router.refresh();
  }

  async function handleArchiveToggle(inquiry: PropertyInquiry) {
    setArchivingId(inquiry.id);

    if (inquiry.is_archived) {
      await restoreInquiry(inquiry.id);
    } else {
      await archiveInquiry(inquiry.id);
    }

    setArchivingId(null);
    router.refresh();
  }

  async function handleDelete(inquiry: PropertyInquiry) {
    const confirmed = window.confirm("Delete this inquiry permanently?");

    if (!confirmed) return;

    setDeletingId(inquiry.id);
    await deleteInquiry(inquiry.id);
    setDeletingId(null);
    router.refresh();
  }

  return (
    <>
      <section className="dpr-admin-controls dpr-inquiry-controls">
        <label>
          Search
          <input
            type="search"
            placeholder="Search client, contact, property..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </label>

        <label>
          Status
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option>All</option>
            {statuses.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </label>

        <label>
          Inquiry Type
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
          >
            {inquiryTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </label>

        <label>
          View
          <select
            value={archiveFilter}
            onChange={(event) => setArchiveFilter(event.target.value)}
          >
            <option>Active</option>
            <option>Archived</option>
            <option>All</option>
          </select>
        </label>
      </section>

      <section className="dpr-admin-table-wrap">
        <table className="dpr-admin-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Contact</th>
              <th>Property</th>
              <th>Inquiry Type</th>
              <th>Status</th>
              <th>State</th>
              <th>Message</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {filteredInquiries.map((inquiry) => (
              <tr key={inquiry.id}>
                <td>
                  <strong>{inquiry.full_name}</strong>
                </td>

                <td>{inquiry.contact}</td>

                <td>
                  <strong>{inquiry.property_title || "General Inquiry"}</strong>
                  <span>{inquiry.property_code || "No property code"}</span>
                </td>

                <td>{inquiry.inquiry_type}</td>

                <td>
                  <select
                    className="dpr-admin-status-select"
                    value={inquiry.status}
                    disabled={savingId === inquiry.id}
                    onChange={(event) =>
                      handleStatusChange(inquiry.id, event.target.value)
                    }
                  >
                    {statuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </td>

                <td>
                  <span
                    className={
                      inquiry.is_archived
                        ? "dpr-admin-pill muted"
                        : "dpr-admin-pill"
                    }
                  >
                    {inquiry.is_archived ? "Archived" : "Active"}
                  </span>
                </td>

                <td>{inquiry.message || "No message"}</td>

                <td>
                  {new Date(inquiry.created_at).toLocaleDateString("en-NG", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>

                <td>
                  <div className="dpr-action-dropdown">
                    <button type="button">Actions</button>

                    <div className="dpr-action-menu static">
                      <button
                        type="button"
                        onClick={() => setSelectedInquiry(inquiry)}
                      >
                        View
                      </button>

                      <button
                        type="button"
                        disabled={archivingId === inquiry.id}
                        onClick={() => handleArchiveToggle(inquiry)}
                      >
                        {inquiry.is_archived ? "Restore" : "Archive"}
                      </button>

                      <button
                        type="button"
                        className="danger"
                        disabled={deletingId === inquiry.id}
                        onClick={() => handleDelete(inquiry)}
                      >
                        {deletingId === inquiry.id ? "Deleting" : "Delete"}
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {filteredInquiries.length === 0 && (
        <section className="dpr-admin-empty">
          <h2>No inquiries found.</h2>
          <p>
            New buyer inquiries will appear here once users submit property
            forms.
          </p>
        </section>
      )}

      {selectedInquiry && (
        <div className="dpr-admin-modal-backdrop">
          <div className="dpr-admin-modal dpr-inquiry-modal">
            <div className="dpr-admin-modal-head">
              <div>
                <p>Inquiry Detail</p>
                <h2>{selectedInquiry.full_name}</h2>
              </div>

              <button type="button" onClick={() => setSelectedInquiry(null)}>
                Close
              </button>
            </div>

            <div className="dpr-inquiry-detail-grid">
              <article>
                <span>Client</span>
                <strong>{selectedInquiry.full_name}</strong>
              </article>

              <article>
                <span>Contact</span>
                <strong>{selectedInquiry.contact}</strong>
              </article>

              <article>
                <span>Property</span>
                <strong>
                  {selectedInquiry.property_title || "General Inquiry"}
                </strong>
                <p>{selectedInquiry.property_code || "No property code"}</p>
              </article>

              <article>
                <span>Inquiry Type</span>
                <strong>{selectedInquiry.inquiry_type}</strong>
              </article>

              <article>
                <span>Status</span>
                <select
                  className="dpr-admin-status-select"
                  value={selectedInquiry.status}
                  disabled={savingId === selectedInquiry.id}
                  onChange={async (event) => {
                    await handleStatusChange(
                      selectedInquiry.id,
                      event.target.value,
                    );

                    setSelectedInquiry({
                      ...selectedInquiry,
                      status: event.target.value,
                    });
                  }}
                >
                  {statuses.map((status) => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </article>

              <article>
                <span>State</span>
                <strong>
                  {selectedInquiry.is_archived ? "Archived" : "Active"}
                </strong>
              </article>

              <article>
                <span>Date Submitted</span>
                <strong>
                  {new Date(selectedInquiry.created_at).toLocaleDateString(
                    "en-NG",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </strong>
              </article>

              <article className="full">
                <span>Message</span>
                <p>{selectedInquiry.message || "No message provided."}</p>
              </article>

              <article className="full">
                <span>Actions</span>
                <div className="dpr-inquiry-modal-actions">
                  <button
                    type="button"
                    onClick={async () => {
                      await handleArchiveToggle(selectedInquiry);
                      setSelectedInquiry(null);
                    }}
                  >
                    {selectedInquiry.is_archived ? "Restore" : "Archive"}
                  </button>

                  <button
                    type="button"
                    className="danger"
                    onClick={async () => {
                      await handleDelete(selectedInquiry);
                      setSelectedInquiry(null);
                    }}
                  >
                    Delete Inquiry
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      )}
    </>
  );
}