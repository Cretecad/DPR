"use client";

import { useState } from "react";

const verificationTypes = [
  "Ownership Review",
  "Title Document Check",
  "Survey Review",
  "Acquisition Safety Review",
  "General Property Verification",
];

const documentTypes = [
  "Certificate of Occupancy",
  "Deed of Assignment",
  "Survey Plan",
  "Allocation Letter",
  "Receipt / Agreement",
  "Not Sure",
];

export default function VerificationForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setLoading(true);
    setMessage("");

    const response = await fetch("/api/verification/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: formData.get("full_name"),
        contact: formData.get("contact"),
        property_location: formData.get("property_location"),
        verification_type: formData.get("verification_type"),
        document_type: formData.get("document_type"),
        message: formData.get("message"),
      }),
    });

    const result = await response.json();

    setLoading(false);

    if (!result.success) {
      setMessage(result.message || "Unable to submit verification request.");
      return;
    }

    event.currentTarget.reset();
    setMessage("Verification request submitted successfully.");
  }

  return (
    <form className="dpr-verification-form" onSubmit={handleSubmit}>
      <label>
        Full Name
        <input name="full_name" required placeholder="Your name" />
      </label>

      <label>
        Phone or Email
        <input name="contact" required placeholder="How should we reach you?" />
      </label>

      <label>
        Property Location
        <input
          name="property_location"
          placeholder="Where is the property located?"
        />
      </label>

      <label>
        Verification Type
        <select name="verification_type" required defaultValue="">
          <option value="" disabled>
            Select verification type
          </option>

          {verificationTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>

      <label>
        Document Type
        <select name="document_type" defaultValue="">
          <option value="" disabled>
            Select document type
          </option>

          {documentTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </label>

      <label className="full">
        Message
        <textarea
          name="message"
          placeholder="Tell us what you want reviewed, confirmed, or clarified..."
        />
      </label>

      {message && <p className="dpr-verification-message">{message}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Verification Request"}
      </button>
    </form>
  );
}