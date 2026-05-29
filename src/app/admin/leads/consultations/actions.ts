"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updateConsultationStatus(
  id: string,
  status: string,
) {
  const supabase = createSupabaseServerClient();

  await supabase
    .from("consultations")
    .update({ status })
    .eq("id", id);

  revalidatePath("/admin/leads/consultations");
}

export async function archiveConsultation(id: string) {
  const supabase = createSupabaseServerClient();

  await supabase
    .from("consultations")
    .update({ is_archived: true })
    .eq("id", id);

  revalidatePath("/admin/leads/consultations");
}

export async function restoreConsultation(id: string) {
  const supabase = createSupabaseServerClient();

  await supabase
    .from("consultations")
    .update({ is_archived: false })
    .eq("id", id);

  revalidatePath("/admin/leads/consultations");
}

export async function deleteConsultation(id: string) {
  const supabase = createSupabaseServerClient();

  await supabase
    .from("consultations")
    .delete()
    .eq("id", id);

  revalidatePath("/admin/leads/consultations");
}