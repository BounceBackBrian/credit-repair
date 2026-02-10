import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("credit_reports")
    .select("id, created_at, provider, status, report_id")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("select credit_reports error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({
    latest: data?.[0] ?? null,
    user: { id: user.id, email: user.email },
  });
}
