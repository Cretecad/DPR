"use client";

import { useState } from "react";

const consultationOptions = [
  "Property Acquisition Strategy",
  "Land Banking Guidance",
  "Investment Positioning",
  "Relocation Planning",
  "Commercial Expansion",
  "General Consultation",
];

export default function ConsultationForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setLoading(true);
    setMessage("");

    const response = await fetch("/api/consultations/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        full_name: formData.get("full_name"),
        contact: formData.get("contact"),
        consultation_type: formData.get("consultation_type"),
        budget: formData.get("budget"),
        timeline: formData.get("timeline"),
        message: formData.get("message"),
      }),
    });

    const result = await response.json();

    setLoading(false);

    if (!result.success) {
      setMessage(result.message || "Unable to submit request.");
      return;
    }

    event.currentTarget.reset();

    setMessage("Consultation request submitted successfully.");
  }

  return (
    <section className="dpr-consultation-form-wrap">
      <form className="dpr-consultation-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input
            name="full_name"
            required
            placeholder="Your name"
          />
        </label>

        <label>
          Phone or Email
          <input
            name="contact"
            required
            placeholder="How should we reach you?"
          />
        </label>

        <label>
          Consultation Type
          <select name="consultation_type" required defaultValue="">
            <option value="" disabled>
              Select consultation type
            </option>

            {consultationOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>

        <label>
          Budget Range
          <input
            name="budget"
            placeholder="Optional budget range"
          />
        </label>

        <label>
          Timeline
          <input
            name="timeline"
            placeholder="Optional expected timeline"
          />
        </label>

        <label className="full">
          Message
          <textarea
            name="message"
            placeholder="Tell us about your property direction, goals, or current situation..."
          />
        </label>

        {message && (
          <p className="dpr-consultation-message">{message}</p>
        )}

        <button type="submit" disabled={loading}>
          {loading
            ? "Submitting..."
            : "Request Consultation"}
        </button>
      </form>
    </section>
  );
}