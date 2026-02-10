import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  // 1) Verify 3B session
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2) Load stored MFSN token
  const { data: session, error: sessionError } = await supabase
    .from("mfsn_sessions")
    .select("token")
    .eq("user_id", user.id)
    .single();

  if (sessionError || !session?.token) {
    return NextResponse.json({ error: "MFSN not connected" }, { status: 400 });
  }

  // 3) Call MFSN report endpoint
  const response = await fetch("https://api.myfreescorenow.com/api/report", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session.token}`,
      "Content-Type": "application/json",
    },
  });

  // Parse safely (MFSN sometimes returns non-JSON)
  const rawText = await response.text();
  let report: any = null;
  try {
    report = JSON.parse(rawText);
  } catch {
    report = { non_json_response: rawText?.slice(0, 500) };
  }

  if (!response.ok) {
    console.error("[MFSN REPORT FAILED]", report);
    return NextResponse.json(
      { error: "Failed to pull credit report", details: report },
      { status: 502 }
    );
  }

  // 4) Persist snapshot (Vault source of truth) — CHECK ERROR + RETURN ID
  const { data: inserted, error: insertError } = await supabase
    .from("credit_reports")
    .insert({
      user_id: user.id,
      provider: "mfsn",
      report_id: report?.report_id ?? null,
      status: report?.status ?? "received",
      payload: report,
    })
    .select("id")
    .single();

  if (insertError) {
    console.error("[VAULT INSERT FAILED]", insertError);
    return NextResponse.json(
      {
        error: "Vault write failed",
        details: insertError,
      },
      { status: 500 }
    );
  }

  // 5) Prove it exists now (optional but strong)
  const { data: confirm, error: confirmErr } = await supabase
    .from("credit_reports")
    .select("id")
    .eq("id", inserted.id)
    .single();

  if (confirmErr || !confirm) {
    console.error("[VAULT CONFIRM FAILED]", confirmErr);
    return NextResponse.json(
      { error: "Vault confirm failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, credit_report_id: inserted.id });
}
