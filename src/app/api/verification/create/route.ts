import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const supabase = createSupabaseServerClient();

    const { error } = await supabase.from("verification_requests").insert({
      full_name: body.full_name,
      contact: body.contact,
      property_location: body.property_location,
      verification_type: body.verification_type,
      document_type: body.document_type,
      message: body.message,
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit verification request.",
      },
      { status: 500 },
    );
  }
}