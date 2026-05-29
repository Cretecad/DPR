"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { VerificationRequest } from "@/types/verification";

import {
  archiveVerificationRequest,
  deleteVerificationRequest,
  restoreVerificationRequest,
  updateVerificationStatus,
} from "@/app/admin/verification/actions";

type Props = {
  requests: VerificationRequest[];
};

const statuses = ["New", "Contacted", "In Progress", "Closed"];

const verificationTypes = [
  "All",
  "Ownership Review",
  "Title Document Check",
  "Survey Review",
  "Acquisition Safety Review",
  "General Property Verification",
];

export default function AdminVerificationTable({ requests }: Props) {
  const router = useRouter();

  const [selectedRequest, setSelectedRequest] =
    useState<VerificationRequest | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [archiveFilter, setArchiveFilter] = useState("Active");

  const [savingId, setSavingId] = useState<string | null>(null);
  const [workingId, setWorkingId] = useState<string | null>(null);

  const filteredRequests = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesSearch =
        !search ||
        [
          request.full_name,
          request.contact,
          request.property_location,
          request.verification_type,
          request.document_type,
          request.status,
          request.message,
        ]
          .join(" ")
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All" || request.status === statusFilter;

      const matchesType =
        typeFilter === "All" || request.verification_type === typeFilter;

      const matchesArchive =
        archiveFilter === "All" ||
        (archiveFilter === "Active" && !request.is_archived) ||
        (archiveFilter === "Archived" && request.is_archived);

      return matchesSearch && matchesStatus && matchesType && matchesArchive;
    });
  }, [requests, searchTerm, statusFilter, typeFilter, archiveFilter]);

  async function handleStatusChange(id: string, status: string) {
    setSavingId(id);
    await updateVerificationStatus(id, status);
    setSavingId(null);
    router.refresh();
  }

  async function handleArchiveToggle(request: VerificationRequest) {
    setWorkingId(request.id);

    if (request.is_archived) {
      await restoreVerificationRequest(request.id);
    } else {
      await archiveVerificationRequest(request.id);
    }

    setWorkingId(null);
    router.refresh();
  }

  async function handleDelete(request: VerificationRequest) {
    const confirmed = window.confirm(
      "Delete this verification request permanently?",
    );

    if (!confirmed) return;

    setWorkingId(request.id);
    await deleteVerificationRequest(request.id);
    setWorkingId(null);
    router.refresh();
  }

  return (
    <>
      <section className="dpr-admin-controls dpr-verification-controls">
        <label>
          Search
          <input
            type="search"
            placeholder="Search client, contact, location..."
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
            {verificationTypes.map((type) => (
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
              <th>Location</th>
              <th>Verification</th>
              <th>Document</th>
              <th>Status</th>
              <th>State</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id}>
                <td>
                  <strong>{request.full_name}</strong>
                  <span>{request.contact}</span>
                </td>

                <td>{request.property_location || "Not specified"}</td>

                <td>{request.verification_type}</td>

                <td>{request.document_type || "Not specified"}</td>

                <td>
                  <select
                    className="dpr-admin-status-select"
                    value={request.status}
                    disabled={savingId === request.id}
                    onChange={(event) =>
                      handleStatusChange(request.id, event.target.value)
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
                      request.is_archived
                        ? "dpr-admin-pill muted"
                        : "dpr-admin-pill"
                    }
                  >
                    {request.is_archived ? "Archived" : "Active"}
                  </span>
                </td>

                <td>
                  {new Date(request.created_at).toLocaleDateString("en-NG", {
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
                        onClick={() => setSelectedRequest(request)}
                      >
                        View
                      </button>

                      <button
                        type="button"
                        disabled={workingId === request.id}
                        onClick={() => handleArchiveToggle(request)}
                      >
                        {request.is_archived ? "Restore" : "Archive"}
                      </button>

                      <button
                        type="button"
                        className="danger"
                        disabled={workingId === request.id}
                        onClick={() => handleDelete(request)}
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

      {filteredRequests.length === 0 && (
        <section className="dpr-admin-empty">
          <h2>No verification requests found.</h2>
          <p>Requests will appear here after users submit verification forms.</p>
        </section>
      )}

      {selectedRequest && (
        <div className="dpr-admin-modal-backdrop">
          <div className="dpr-admin-modal dpr-inquiry-modal">
            <div className="dpr-admin-modal-head">
              <div>
                <p>Verification Detail</p>
                <h2>{selectedRequest.full_name}</h2>
              </div>

              <button type="button" onClick={() => setSelectedRequest(null)}>
                Close
              </button>
            </div>

            <div className="dpr-inquiry-detail-grid">
              <article>
                <span>Client</span>
                <strong>{selectedRequest.full_name}</strong>
              </article>

              <article>
                <span>Contact</span>
                <strong>{selectedRequest.contact}</strong>
              </article>

              <article>
                <span>Property Location</span>
                <strong>
                  {selectedRequest.property_location || "Not specified"}
                </strong>
              </article>

              <article>
                <span>Verification Type</span>
                <strong>{selectedRequest.verification_type}</strong>
              </article>

              <article>
                <span>Document Type</span>
                <strong>{selectedRequest.document_type || "Not specified"}</strong>
              </article>

              <article>
                <span>Status</span>
                <select
                  className="dpr-admin-status-select"
                  value={selectedRequest.status}
                  disabled={savingId === selectedRequest.id}
                  onChange={async (event) => {
                    await handleStatusChange(
                      selectedRequest.id,
                      event.target.value,
                    );

                    setSelectedRequest({
                      ...selectedRequest,
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
                  {selectedRequest.is_archived ? "Archived" : "Active"}
                </strong>
              </article>

              <article>
                <span>Date Submitted</span>
                <strong>
                  {new Date(selectedRequest.created_at).toLocaleDateString(
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
                <p>{selectedRequest.message || "No message provided."}</p>
              </article>

              <article className="full">
                <span>Actions</span>

                <div className="dpr-inquiry-modal-actions">
                  <button
                    type="button"
                    onClick={async () => {
                      await handleArchiveToggle(selectedRequest);
                      setSelectedRequest(null);
                    }}
                  >
                    {selectedRequest.is_archived ? "Restore" : "Archive"}
                  </button>

                  <button
                    type="button"
                    className="danger"
                    onClick={async () => {
                      await handleDelete(selectedRequest);
                      setSelectedRequest(null);
                    }}
                  >
                    Delete Request
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