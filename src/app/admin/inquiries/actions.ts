"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updateInquiryStatus(id: string, status: string) {
  const supabase = createSupabaseServerClient();

  await supabase.from("property_inquiries").update({ status }).eq("id", id);

  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}

export async function archiveInquiry(id: string) {
  const supabase = createSupabaseServerClient();

  await supabase
    .from("property_inquiries")
    .update({ is_archived: true })
    .eq("id", id);

  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}

export async function restoreInquiry(id: string) {
  const supabase = createSupabaseServerClient();

  await supabase
    .from("property_inquiries")
    .update({ is_archived: false })
    .eq("id", id);

  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}

export async function deleteInquiry(id: string) {
  const supabase = createSupabaseServerClient();

  await supabase.from("property_inquiries").delete().eq("id", id);

  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
}