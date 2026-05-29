"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updateVerificationStatus(id: string, status: string) {
  const supabase = createSupabaseServerClient();

  await supabase
    .from("verification_requests")
    .update({ status })
    .eq("id", id);

  revalidatePath("/admin/verification");
}

export async function archiveVerificationRequest(id: string) {
  const supabase = createSupabaseServerClient();

  await supabase
    .from("verification_requests")
    .update({ is_archived: true })
    .eq("id", id);

  revalidatePath("/admin/verification");
}

export async function restoreVerificationRequest(id: string) {
  const supabase = createSupabaseServerClient();

  await supabase
    .from("verification_requests")
    .update({ is_archived: false })
    .eq("id", id);

  revalidatePath("/admin/verification");
}

export async function deleteVerificationRequest(id: string) {
  const supabase = createSupabaseServerClient();

  await supabase.from("verification_requests").delete().eq("id", id);

  revalidatePath("/admin/verification");
}