import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { PropertyInquiry } from "@/types/inquiry";

export async function getPropertyInquiries(): Promise<PropertyInquiry[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("property_inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("PROPERTY_INQUIRIES_FETCH_ERROR:", error.message);
    return [];
  }

  return data ?? [];
}