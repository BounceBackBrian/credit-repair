import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    { status: 'stripe webhook route alive (GET)' },
    { status: 200 }
  );
}

export async function POST() {
  return NextResponse.json(
    { status: 'stripe webhook route alive (POST)' },
    { status: 200 }
  );
}
// app/api/stripe/webhook/route.ts

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// Make this route dynamic to avoid build-time errors
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  // Initialize Stripe inside the function to avoid build-time env var issues
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-12-15.clover",
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing Supabase service role configuration");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  const sig = req.headers.get("stripe-signature");
  
  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.user_id;
    const planTier = session.metadata?.plan_tier;

    if (!userId || !planTier) {
      console.error("Missing metadata in webhook");
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase
      .from("Customer")
      .update({ plan_tier: planTier })
      .eq("user_id", userId);

    if (error) {
      console.error("Failed to update plan tier:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log(`Updated user ${userId} to plan ${planTier}`);
  }

  return NextResponse.json({ received: true });
}
