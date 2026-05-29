import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Consultation } from "@/types/consultation";

export async function getConsultations(): Promise<Consultation[]> {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("consultations")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("CONSULTATIONS_FETCH_ERROR:", error.message);
    return [];
  }

  return data ?? [];
}