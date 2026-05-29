"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updateContactRequestStatus(id: string, status: string) {
  const supabase = createSupabaseServerClient();

  await supabase.from("contact_requests").update({ status }).eq("id", id);

  revalidatePath("/admin/leads/contact");
}

export async function archiveContactRequest(id: string) {
  const supabase = createSupabaseServerClient();

  await supabase
    .from("contact_requests")
    .update({ is_archived: true })
    .eq("id", id);

  revalidatePath("/admin/leads/contact");
}

export async function restoreContactRequest(id: string) {
  const supabase = createSupabaseServerClient();

  await supabase
    .from("contact_requests")
    .update({ is_archived: false })
    .eq("id", id);

  revalidatePath("/admin/leads/contact");
}

export async function deleteContactRequest(id: string) {
  const supabase = createSupabaseServerClient();

  await supabase.from("contact_requests").delete().eq("id", id);

  revalidatePath("/admin/leads/contact");
}