"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

type Props = {
  propertyId: string;
  propertyTitle: string;
  propertyCode: string;
};

export default function PropertyInquiryForm({
  propertyId,
  propertyTitle,
  propertyCode,
}: Props) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setSaving(true);
    setMessage("");

    const { error } = await supabase.from("property_inquiries").insert({
      property_id: propertyId,
      property_title: propertyTitle,
      property_code: propertyCode,
      full_name: String(formData.get("full_name") || ""),
      contact: String(formData.get("contact") || ""),
      inquiry_type: String(formData.get("inquiry_type") || ""),
      message: String(formData.get("message") || ""),
    });

    setSaving(false);

    if (error) {
      setMessage("Inquiry could not be sent. Please try again.");
      return;
    }

    event.currentTarget.reset();
    setMessage("Inquiry sent successfully.");
  }

  return (
    <section className="dpr-property-inquiry">
      <div>
        <p>Private Inquiry</p>
        <h2>Request guidance on this property.</h2>
        <span>
          Send your interest and Destiny Point Realty can follow up around
          inspection, documents, verification, or acquisition direction.
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Full Name
          <input name="full_name" required placeholder="Your name" />
        </label>

        <label>
          Phone or Email
          <input name="contact" required placeholder="How should we reach you?" />
        </label>

        <label>
          Inquiry Type
          <select name="inquiry_type" required defaultValue="">
            <option value="" disabled>
              Select inquiry type
            </option>
            <option>Request Inspection</option>
            <option>Ask for Documents</option>
            <option>Speak with Advisor</option>
            <option>Price / Payment Discussion</option>
          </select>
        </label>

        <label>
          Message
          <textarea name="message" placeholder="Optional message..." />
        </label>

        {message && <p className="dpr-inquiry-message">{message}</p>}

        <button type="submit" disabled={saving}>
          {saving ? "Sending..." : "Send Inquiry"}
        </button>
      </form>
    </section>
  );
}