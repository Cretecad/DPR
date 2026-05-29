import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const supabase = createSupabaseServerClient();

    const { error } = await supabase.from("consultations").insert({
      full_name: body.full_name,
      contact: body.contact,
      consultation_type: body.consultation_type,
      budget: body.budget,
      timeline: body.timeline,
      message: body.message,
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit consultation request.",
      },
      { status: 500 },
    );
  }
}