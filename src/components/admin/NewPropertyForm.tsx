"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function NewPropertyForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [priceLabel, setPriceLabel] = useState("");
  const [status, setStatus] = useState("Available");
  const [purpose, setPurpose] = useState("");
  const [summary, setSummary] = useState("");
  const [highlights, setHighlights] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublished, setIsPublished] = useState(true);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  const previewUrls = useMemo(() => {
    return imageFiles.map((file) => URL.createObjectURL(file));
  }, [imageFiles]);

  async function uploadPropertyImages(propertyId: string, slug: string) {
    const uploadedImages = [];

    for (const [index, file] of imageFiles.entries()) {
      const extension = file.name.split(".").pop();
      const imagePath = `${propertyId}/${slug}-${Date.now()}-${index}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("property-images")
        .upload(imagePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from("property-images")
        .getPublicUrl(imagePath);

      uploadedImages.push({
        property_id: propertyId,
        image_url: data.publicUrl,
        image_path: imagePath,
        alt_text: title,
        sort_order: index,
        is_cover: index === 0,
      });
    }

    return uploadedImages;
  }

  async function handleSubmit() {
    setMessage("");

    if (!title || !type || !location || !priceLabel || !purpose || !summary) {
      setMessage("Please complete all required fields.");
      return;
    }

    setIsSaving(true);

    try {
      const slug = slugify(title);
      const code = `DPR-${Date.now()}`;

      const highlightsArray = highlights
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      const { data: property, error: propertyError } = await supabase
        .from("properties")
        .insert({
          slug,
          code,
          title,
          type,
          location,
          price_label: priceLabel,
          status,
          purpose,
          summary,
          highlights: highlightsArray,
          image_url: null,
          image_path: null,
          is_featured: isFeatured,
          is_published: isPublished,
        })
        .select("*")
        .single();

      if (propertyError) {
        throw propertyError;
      }

      if (imageFiles.length > 0) {
        const uploadedImages = await uploadPropertyImages(property.id, slug);

        const { error: imagesError } = await supabase
          .from("property_images")
          .insert(uploadedImages);

        if (imagesError) {
          throw imagesError;
        }

        const coverImage = uploadedImages[0];

        const { error: coverError } = await supabase
          .from("properties")
          .update({
            image_url: coverImage.image_url,
            image_path: coverImage.image_path,
          })
          .eq("id", property.id);

        if (coverError) {
          throw coverError;
        }
      }

      router.push("/admin/properties");
      router.refresh();
    } catch (error) {
      console.error(error);
      setMessage("Property could not be saved. Check Supabase policies.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="dpr-admin-form">
      <label className="full">
        Property Images
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(event) => {
            setImageFiles(Array.from(event.target.files ?? []));
          }}
        />
      </label>

      {previewUrls.length > 0 && (
        <div className="dpr-admin-gallery-preview full">
          {previewUrls.map((url, index) => (
            <div key={url} className="dpr-admin-gallery-item">
              <img src={url} alt={`Property preview ${index + 1}`} />
              {index === 0 && <span>Cover</span>}
            </div>
          ))}
        </div>
      )}

      <label>
        Property Title
        <input
          type="text"
          placeholder="Emerging Residential Corridor"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </label>

      <label>
        Property Type
        <select value={type} onChange={(event) => setType(event.target.value)}>
          <option value="" disabled>
            Select property type
          </option>
          <option>Land Banking</option>
          <option>Residential Living</option>
          <option>Investment Property</option>
        </select>
      </label>

      <label>
        Location
        <input
          type="text"
          placeholder="Lagos Expansion Axis"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
      </label>

      <label>
        Price Label
        <input
          type="text"
          placeholder="From ₦8.5M"
          value={priceLabel}
          onChange={(event) => setPriceLabel(event.target.value)}
        />
      </label>

      <label>
        Status
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option>Available</option>
          <option>Verification Required</option>
          <option>Reserved</option>
          <option>Sold</option>
        </select>
      </label>

      <label>
        Purpose
        <input
          type="text"
          placeholder="Family / Investment"
          value={purpose}
          onChange={(event) => setPurpose(event.target.value)}
        />
      </label>

      <label className="full">
        Summary
        <textarea
          placeholder="Short property summary..."
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
        />
      </label>

      <label className="full">
        Highlights
        <textarea
          placeholder="Enter one highlight per line"
          value={highlights}
          onChange={(event) => setHighlights(event.target.value)}
        />
      </label>

      <div className="dpr-admin-checks full">
        <label>
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(event) => setIsFeatured(event.target.checked)}
          />
          Featured Property
        </label>

        <label>
          <input
            type="checkbox"
            checked={isPublished}
            onChange={(event) => setIsPublished(event.target.checked)}
          />
          Publish Property
        </label>
      </div>

      {message && <p className="dpr-admin-message full">{message}</p>}

      <button type="button" onClick={handleSubmit} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Property"}
      </button>
    </form>
  );
}