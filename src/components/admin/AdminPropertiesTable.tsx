"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import type { PropertyWithImages } from "@/types/property";
import { supabase } from "@/lib/supabase/client";

import {
  addPropertyImages,
  deleteProperty,
  deletePropertyImage,
  setPropertyCoverImage,
  togglePropertyFeatured,
  togglePropertyPublished,
  updateProperty,
} from "@/app/admin/properties/actions";

type Props = {
  properties: PropertyWithImages[];
};

export default function AdminPropertiesTable({ properties }: Props) {
  const router = useRouter();

  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editingProperty, setEditingProperty] =
    useState<PropertyWithImages | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
const [typeFilter, setTypeFilter] = useState("All");
const [statusFilter, setStatusFilter] = useState("All");
const [publishFilter, setPublishFilter] = useState("All");
const [mediaFilter, setMediaFilter] = useState("All");

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingProperty) return;

    const formData = new FormData(event.currentTarget);

    setSaving(true);

    await updateProperty(editingProperty.id, {
      title: String(formData.get("title") || ""),
      type: String(formData.get("type") || ""),
      location: String(formData.get("location") || ""),
      price_label: String(formData.get("price_label") || ""),
      status: String(formData.get("status") || ""),
      purpose: String(formData.get("purpose") || ""),
      summary: String(formData.get("summary") || ""),
      highlights: String(formData.get("highlights") || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      is_featured: formData.get("is_featured") === "on",
      is_published: formData.get("is_published") === "on",
    });

    setSaving(false);
    setEditingProperty(null);
    router.refresh();
  }

  async function handleGalleryUpload() {
    if (!galleryFiles.length || !editingProperty) return;

    setUploadingImages(true);

    try {
      const uploadedImages = [];

      for (const [index, file] of galleryFiles.entries()) {
        const extension = file.name.split(".").pop() || "jpg";
        const path = `${editingProperty.id}/${editingProperty.slug}-${Date.now()}-${index}.${extension}`;

        const { error } = await supabase.storage
          .from("property-images")
          .upload(path, file);

        if (error) {
          alert("Image upload failed.");
          return;
        }

        const { data } = supabase.storage
          .from("property-images")
          .getPublicUrl(path);

        const hasExistingImages =
          (editingProperty.property_images?.length ?? 0) > 0;

        uploadedImages.push({
          property_id: editingProperty.id,
          image_url: data.publicUrl,
          image_path: path,
          alt_text: editingProperty.title,
          sort_order: (editingProperty.property_images?.length ?? 0) + index,
          is_cover: !editingProperty.image_url && !hasExistingImages && index === 0,
        });
      }

      await addPropertyImages(uploadedImages);

      if (!editingProperty.image_url && uploadedImages[0]) {
        await setPropertyCoverImage(
          editingProperty.id,
          uploadedImages[0].image_path,
          uploadedImages[0].image_url,
          uploadedImages[0].image_path,
        );
      }

      setGalleryFiles([]);
      setEditingProperty(null);
      router.refresh();
    } finally {
      setUploadingImages(false);
    }
  }

  const filteredProperties = useMemo(() => {
  const search = searchTerm.trim().toLowerCase();

  return properties.filter((property) => {
    const matchesSearch =
      !search ||
      [
        property.code,
        property.title,
        property.type,
        property.location,
        property.price_label,
        property.status,
        property.purpose,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search);

    const matchesType = typeFilter === "All" || property.type === typeFilter;
    const matchesStatus =
      statusFilter === "All" || property.status === statusFilter;

    const matchesPublish =
      publishFilter === "All" ||
      (publishFilter === "Live" && property.is_published) ||
      (publishFilter === "Hidden" && !property.is_published);

    const matchesMedia =
      mediaFilter === "All" ||
      (mediaFilter === "Has Image" && Boolean(property.image_url)) ||
      (mediaFilter === "No Image" && !property.image_url);

    return (
      matchesSearch &&
      matchesType &&
      matchesStatus &&
      matchesPublish &&
      matchesMedia
    );
  });
}, [properties, searchTerm, typeFilter, statusFilter, publishFilter, mediaFilter]);

  return (
    <>

    <section className="dpr-admin-controls">
  <label>
    Search
    <input
      type="search"
      placeholder="Search code, title, location..."
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
    />
  </label>

  <label>
    Type
    <select
      value={typeFilter}
      onChange={(event) => setTypeFilter(event.target.value)}
    >
      <option>All</option>
      <option>Land Banking</option>
      <option>Residential Living</option>
      <option>Investment Property</option>
    </select>
  </label>

  <label>
    Status
    <select
      value={statusFilter}
      onChange={(event) => setStatusFilter(event.target.value)}
    >
      <option>All</option>
      <option>Available</option>
      <option>Verification Required</option>
      <option>Reserved</option>
      <option>Sold</option>
    </select>
  </label>

  <label>
    Visibility
    <select
      value={publishFilter}
      onChange={(event) => setPublishFilter(event.target.value)}
    >
      <option>All</option>
      <option>Live</option>
      <option>Hidden</option>
    </select>
  </label>

  <label>
    Media
    <select
      value={mediaFilter}
      onChange={(event) => setMediaFilter(event.target.value)}
    >
      <option>All</option>
      <option>Has Image</option>
      <option>No Image</option>
    </select>
  </label>
</section>

      <section className="dpr-admin-table-wrap">
        <table className="dpr-admin-table">
          <thead>
            <tr>
              <th>Media</th>
              <th>Code</th>
              <th>Property</th>
              <th>Type</th>
              <th>Price</th>
              <th>Status</th>
              <th>Featured</th>
              <th>Published</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {filteredProperties.map((property) => (
              <tr key={property.id}>
                <td>
                <div className="dpr-admin-media-cell">
                  {property.image_url ? (
                    <img src={property.image_url} alt={property.title} />
                  ) : (
                    <span>No Image</span>
                  )}

                  <small>{property.property_images?.length ?? 0} image(s)</small>
                </div>
              </td>
                <td>{property.code}</td>

                <td>
                  <strong>{property.title}</strong>
                  <span>{property.location}</span>
                </td>

                <td>{property.type}</td>
                <td>{property.price_label}</td>
                <td>{property.status}</td>
                <td>{property.is_featured ? "Yes" : "No"}</td>
                <td>{property.is_published ? "Live" : "Hidden"}</td>

                <td>
                  <div className="dpr-action-dropdown">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === property.id ? null : property.id,
                        )
                      }
                    >
                      Actions
                    </button>

                    {openMenuId === property.id && (
                      <div className="dpr-action-menu">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProperty(property);
                            setGalleryFiles([]);
                            setOpenMenuId(null);
                          }}
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={async () => {
                            await togglePropertyPublished(
                              property.id,
                              !property.is_published,
                            );
                            setOpenMenuId(null);
                            router.refresh();
                          }}
                        >
                          {property.is_published ? "Disable" : "Enable"}
                        </button>

                        <button
                          type="button"
                          onClick={async () => {
                            await togglePropertyFeatured(
                              property.id,
                              !property.is_featured,
                            );
                            setOpenMenuId(null);
                            router.refresh();
                          }}
                        >
                          {property.is_featured ? "Unfeature" : "Feature"}
                        </button>

                        <button
                          type="button"
                          className="danger"
                          onClick={async () => {
                            const confirmed = window.confirm(
                              "Delete this property permanently?",
                            );

                            if (!confirmed) return;

                            await deleteProperty(property.id);
                            setOpenMenuId(null);
                            router.refresh();
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {filteredProperties.length === 0 && (
      <section className="dpr-admin-empty">
        <h2>No matching properties found.</h2>
        <p>Adjust your search or filters to see more results.</p>
      </section>
    )}

      {editingProperty && (
        <div className="dpr-admin-modal-backdrop">
          <div className="dpr-admin-modal">
            <div className="dpr-admin-modal-head">
              <div>
                <p>Edit Property</p>
                <h2>{editingProperty.title}</h2>
              </div>

              <button type="button" onClick={() => setEditingProperty(null)}>
                Close
              </button>
            </div>

            <form className="dpr-admin-form" onSubmit={handleUpdate}>
              <label>
                Property Title
                <input name="title" defaultValue={editingProperty.title} />
              </label>

              <label>
                Property Type
                <select name="type" defaultValue={editingProperty.type}>
                  <option>Land Banking</option>
                  <option>Residential Living</option>
                  <option>Investment Property</option>
                </select>
              </label>

              <label>
                Location
                <input name="location" defaultValue={editingProperty.location} />
              </label>

              <label>
                Price Label
                <input
                  name="price_label"
                  defaultValue={editingProperty.price_label}
                />
              </label>

              <label>
                Status
                <select name="status" defaultValue={editingProperty.status}>
                  <option>Available</option>
                  <option>Verification Required</option>
                  <option>Reserved</option>
                  <option>Sold</option>
                </select>
              </label>

              <label>
                Purpose
                <input name="purpose" defaultValue={editingProperty.purpose} />
              </label>

              <label className="full">
                Summary
                <textarea name="summary" defaultValue={editingProperty.summary} />
              </label>

              <label className="full">
                Highlights
                <textarea
                  name="highlights"
                  defaultValue={editingProperty.highlights.join("\n")}
                />
              </label>

              <div className="dpr-admin-checks full">
                <label>
                  <input
                    type="checkbox"
                    name="is_featured"
                    defaultChecked={editingProperty.is_featured}
                  />
                  Featured Property
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="is_published"
                    defaultChecked={editingProperty.is_published}
                  />
                  Publish Property
                </label>
              </div>

              <div className="dpr-admin-gallery-manager full">
                <p>Property Gallery</p>

                <div className="dpr-admin-gallery-preview">
                  {editingProperty.property_images?.map((image) => (
                    <div key={image.id} className="dpr-admin-gallery-item">
                      <img
                        src={image.image_url}
                        alt={image.alt_text || editingProperty.title}
                      />

                      {image.is_cover && <span>Cover</span>}

                      <div className="dpr-gallery-actions">
                        {!image.is_cover && (
                          <button
                            type="button"
                            onClick={async () => {
                              await setPropertyCoverImage(
                                editingProperty.id,
                                image.id,
                                image.image_url,
                                image.image_path,
                              );
                              setEditingProperty(null);
                              router.refresh();
                            }}
                          >
                            Set Cover
                          </button>
                        )}

                        <button
                          type="button"
                          className="danger"
                          onClick={async () => {
                            const confirmed =
                              window.confirm("Delete this image?");
                            if (!confirmed) return;

                            await deletePropertyImage(
                              editingProperty.id,
                              image.id,
                              image.image_path,
                              image.is_cover,
                            );

                            setEditingProperty(null);
                            router.refresh();
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <label>
                  Upload More Images
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => {
                      setGalleryFiles(Array.from(event.target.files ?? []));
                    }}
                  />
                </label>

                <button
                  type="button"
                  onClick={handleGalleryUpload}
                  disabled={uploadingImages || galleryFiles.length === 0}
                >
                  {uploadingImages ? "Uploading..." : "Upload Selected Images"}
                </button>
              </div>

              <button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}