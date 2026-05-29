"use client";

import { useState } from "react";

const subjectOptions = [
  "General Support",
  "Business Inquiry",
  "Partnership Inquiry",
  "Property Follow-up",
  "Platform Assistance",
  "Other",
];

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setLoading(true);
    setMessage("");

    const response = await fetch("/api/contact/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        full_name: formData.get("full_name"),
        contact: formData.get("contact"),
        subject: formData.get("subject"),
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
    setMessage("Contact request submitted successfully.");
  }

  return (
    <form className="dpr-contact-form" onSubmit={handleSubmit}>
      <label>
        Full Name
        <input name="full_name" required placeholder="Your name" />
      </label>

      <label>
        Phone or Email
        <input name="contact" required placeholder="How should we reach you?" />
      </label>

      <label>
        Subject
        <select name="subject" required defaultValue="">
          <option value="" disabled>
            Select request subject
          </option>

          {subjectOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>

      <label>
        Message
        <textarea
          name="message"
          placeholder="Tell us what you need help with..."
        />
      </label>

      {message && <p className="dpr-contact-message">{message}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}