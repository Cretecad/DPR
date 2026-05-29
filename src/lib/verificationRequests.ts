import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { VerificationRequest } from "@/types/verification";

export async function getVerificationRequests(): Promise<VerificationRequest[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("verification_requests")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("VERIFICATION_REQUESTS_FETCH_ERROR:", error.message);
    return [];
  }

  return data ?? [];
}