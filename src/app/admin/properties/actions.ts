"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type UpdatePropertyPayload = {
  title: string;
  type: string;
  location: string;
  price_label: string;
  status: string;
  purpose: string;
  summary: string;
  highlights: string[];
  is_featured: boolean;
  is_published: boolean;
};

export async function updateProperty(
  id: string,
  payload: UpdatePropertyPayload,
) {
  const supabase = createSupabaseServerClient();

  await supabase.from("properties").update(payload).eq("id", id);

  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath("/");
}

export async function togglePropertyPublished(id: string, value: boolean) {
  const supabase = createSupabaseServerClient();

  await supabase
    .from("properties")
    .update({ is_published: value })
    .eq("id", id);

  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath("/");
}

export async function togglePropertyFeatured(id: string, value: boolean) {
  const supabase = createSupabaseServerClient();

  await supabase
    .from("properties")
    .update({ is_featured: value })
    .eq("id", id);

  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath("/");
}

export async function deleteProperty(id: string) {
  const supabase = createSupabaseServerClient();

  await supabase.from("properties").delete().eq("id", id);

  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath("/");
}

type PropertyImagePayload = {
  property_id: string;
  image_url: string;
  image_path: string;
  alt_text: string;
  sort_order: number;
  is_cover: boolean;
};

export async function addPropertyImages(images: PropertyImagePayload[]) {
  const supabase = createSupabaseServerClient();

  await supabase.from("property_images").insert(images);

  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath("/");
}

export async function setPropertyCoverImage(
  propertyId: string,
  imageId: string,
  imageUrl: string,
  imagePath: string,
) {
  const supabase = createSupabaseServerClient();

  await supabase
    .from("property_images")
    .update({ is_cover: false })
    .eq("property_id", propertyId);

  await supabase
    .from("property_images")
    .update({ is_cover: true })
    .eq("id", imageId);

  await supabase
    .from("properties")
    .update({
      image_url: imageUrl,
      image_path: imagePath,
    })
    .eq("id", propertyId);

  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath("/");
}

export async function deletePropertyImage(
  propertyId: string,
  imageId: string,
  imagePath: string,
  isCover: boolean,
) {
  const supabase = createSupabaseServerClient();

  await supabase.storage.from("property-images").remove([imagePath]);

  await supabase.from("property_images").delete().eq("id", imageId);

  if (isCover) {
    const { data: nextImage } = await supabase
      .from("property_images")
      .select("*")
      .eq("property_id", propertyId)
      .order("sort_order", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (nextImage) {
      await supabase
        .from("property_images")
        .update({ is_cover: true })
        .eq("id", nextImage.id);

      await supabase
        .from("properties")
        .update({
          image_url: nextImage.image_url,
          image_path: nextImage.image_path,
        })
        .eq("id", propertyId);
    } else {
      await supabase
        .from("properties")
        .update({
          image_url: null,
          image_path: null,
        })
        .eq("id", propertyId);
    }
  }

  revalidatePath("/admin/properties");
  revalidatePath("/properties");
  revalidatePath("/");
}