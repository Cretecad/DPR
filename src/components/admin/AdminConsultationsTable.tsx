"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Consultation } from "@/types/consultation";

import {
  archiveConsultation,
  deleteConsultation,
  restoreConsultation,
  updateConsultationStatus,
} from "@/app/admin/leads/consultations/actions";

type Props = {
  consultations: Consultation[];
};

const statuses = ["New", "Contacted", "In Progress", "Closed"];

const consultationTypes = [
  "All",
  "Property Acquisition Strategy",
  "Land Banking Guidance",
  "Investment Positioning",
  "Relocation Planning",
  "Commercial Expansion",
  "General Consultation",
];

export default function AdminConsultationsTable({ consultations }: Props) {
  const router = useRouter();

  const [selectedConsultation, setSelectedConsultation] =
    useState<Consultation | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [archiveFilter, setArchiveFilter] = useState("Active");

  const [savingId, setSavingId] = useState<string | null>(null);
  const [workingId, setWorkingId] = useState<string | null>(null);

  const filteredConsultations = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return consultations.filter((consultation) => {
      const matchesSearch =
        !search ||
        [
          consultation.full_name,
          consultation.contact,
          consultation.consultation_type,
          consultation.budget,
          consultation.timeline,
          consultation.status,
          consultation.message,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" || consultation.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        consultation.consultation_type === typeFilter;

      const matchesArchive =
        archiveFilter === "All" ||
        (archiveFilter === "Active" && !consultation.is_archived) ||
        (archiveFilter === "Archived" && consultation.is_archived);

      return matchesSearch && matchesStatus && matchesType && matchesArchive;
    });
  }, [consultations, searchTerm, statusFilter, typeFilter, archiveFilter]);

  async function handleStatusChange(id: string, status: string) {
    setSavingId(id);
    await updateConsultationStatus(id, status);
    setSavingId(null);
    router.refresh();
  }

  async function handleArchiveToggle(consultation: Consultation) {
    setWorkingId(consultation.id);

    if (consultation.is_archived) {
      await restoreConsultation(consultation.id);
    } else {
      await archiveConsultation(consultation.id);
    }

    setWorkingId(null);
    router.refresh();
  }

  async function handleDelete(consultation: Consultation) {
    const confirmed = window.confirm(
      "Delete this consultation request permanently?",
    );

    if (!confirmed) return;

    setWorkingId(consultation.id);
    await deleteConsultation(consultation.id);
    setWorkingId(null);
    router.refresh();
  }

  return (
    <>
      <section className="dpr-admin-controls dpr-consultation-controls">
        <label>
          Search
          <input
            type="search"
            placeholder="Search client, contact, message..."
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
          Type
          <select
            value={typeFilter}
            onChange={(event) => setTypeFilter(event.target.value)}
          >
            {consultationTypes.map((type) => (
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
              <th>Type</th>
              <th>Budget</th>
              <th>Timeline</th>
              <th>Status</th>
              <th>State</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {filteredConsultations.map((consultation) => (
              <tr key={consultation.id}>
                <td>
                  <strong>{consultation.full_name}</strong>
                  <span>{consultation.contact}</span>
                </td>

                <td>{consultation.consultation_type}</td>

                <td>{consultation.budget || "Not specified"}</td>

                <td>{consultation.timeline || "Not specified"}</td>

                <td>
                  <select
                    className="dpr-admin-status-select"
                    value={consultation.status}
                    disabled={savingId === consultation.id}
                    onChange={(event) =>
                      handleStatusChange(consultation.id, event.target.value)
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
                      consultation.is_archived
                        ? "dpr-admin-pill muted"
                        : "dpr-admin-pill"
                    }
                  >
                    {consultation.is_archived ? "Archived" : "Active"}
                  </span>
                </td>

                <td>
                  {new Date(consultation.created_at).toLocaleDateString(
                    "en-NG",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    },
                  )}
                </td>

                <td>
                  <div className="dpr-action-dropdown">
                    <button type="button">Actions</button>

                    <div className="dpr-action-menu static">
                      <button
                        type="button"
                        onClick={() => setSelectedConsultation(consultation)}
                      >
                        View
                      </button>

                      <button
                        type="button"
                        disabled={workingId === consultation.id}
                        onClick={() => handleArchiveToggle(consultation)}
                      >
                        {consultation.is_archived ? "Restore" : "Archive"}
                      </button>

                      <button
                        type="button"
                        className="danger"
                        disabled={workingId === consultation.id}
                        onClick={() => handleDelete(consultation)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {filteredConsultations.length === 0 && (
        <section className="dpr-admin-empty">
          <h2>No consultations found.</h2>
          <p>Consultation requests will appear here after users submit forms.</p>
        </section>
      )}

      {selectedConsultation && (
        <div className="dpr-admin-modal-backdrop">
          <div className="dpr-admin-modal dpr-inquiry-modal">
            <div className="dpr-admin-modal-head">
              <div>
                <p>Consultation Detail</p>
                <h2>{selectedConsultation.full_name}</h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedConsultation(null)}
              >
                Close
              </button>
            </div>

            <div className="dpr-inquiry-detail-grid">
              <article>
                <span>Client</span>
                <strong>{selectedConsultation.full_name}</strong>
              </article>

              <article>
                <span>Contact</span>
                <strong>{selectedConsultation.contact}</strong>
              </article>

              <article>
                <span>Consultation Type</span>
                <strong>{selectedConsultation.consultation_type}</strong>
              </article>

              <article>
                <span>Budget</span>
                <strong>{selectedConsultation.budget || "Not specified"}</strong>
              </article>

              <article>
                <span>Timeline</span>
                <strong>
                  {selectedConsultation.timeline || "Not specified"}
                </strong>
              </article>

              <article>
                <span>Status</span>
                <select
                  className="dpr-admin-status-select"
                  value={selectedConsultation.status}
                  disabled={savingId === selectedConsultation.id}
                  onChange={async (event) => {
                    await handleStatusChange(
                      selectedConsultation.id,
                      event.target.value,
                    );

                    setSelectedConsultation({
                      ...selectedConsultation,
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
                  {selectedConsultation.is_archived ? "Archived" : "Active"}
                </strong>
              </article>

              <article>
                <span>Date Submitted</span>
                <strong>
                  {new Date(selectedConsultation.created_at).toLocaleDateString(
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
                <p>{selectedConsultation.message || "No message provided."}</p>
              </article>

              <article className="full">
                <span>Actions</span>

                <div className="dpr-inquiry-modal-actions">
                  <button
                    type="button"
                    onClick={async () => {
                      await handleArchiveToggle(selectedConsultation);
                      setSelectedConsultation(null);
                    }}
                  >
                    {selectedConsultation.is_archived ? "Restore" : "Archive"}
                  </button>

                  <button
                    type="button"
                    className="danger"
                    onClick={async () => {
                      await handleDelete(selectedConsultation);
                      setSelectedConsultation(null);
                    }}
                  >
                    Delete Consultation
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