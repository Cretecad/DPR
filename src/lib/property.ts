import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { PropertyWithImages } from "@/types/property";

export async function getPropertyBySlug(
  slug: string,
): Promise<PropertyWithImages | null> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("slug", slug)
    .eq("is_published", true)
    .order("sort_order", {
      referencedTable: "property_images",
      ascending: true,
    })
    .single();

  if (error) {
    console.error("PROPERTY_FETCH_ERROR:", error.message);
    return null;
  }

  return data;
}