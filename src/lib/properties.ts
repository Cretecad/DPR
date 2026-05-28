import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { PropertyWithImages } from "@/types/property";

export async function getPublishedProperties(): Promise<PropertyWithImages[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("PROPERTIES_FETCH_ERROR:", error.message);
    return [];
  }

  return data ?? [];
}

export async function getAllProperties(): Promise<PropertyWithImages[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*, property_images(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("ADMIN_PROPERTIES_FETCH_ERROR:", error.message);
    return [];
  }

  return data ?? [];
}