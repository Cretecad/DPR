import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ContactRequest } from "@/types/contact";

export async function getContactRequests(): Promise<ContactRequest[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("contact_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("CONTACT_REQUESTS_FETCH_ERROR:", error.message);
    return [];
  }

  return data ?? [];
}