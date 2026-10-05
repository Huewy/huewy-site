"use server";

import { revalidateTag } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase-server";

export type JoinState = { ok: true } | { ok: false; error: string } | null;

export async function joinWaitlist(_prev: JoinState, form: FormData): Promise<JoinState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase();
  const source = String(form.get("source") ?? "hero");
  const platform = form.get("platform_interest");

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  // supabaseAdmin is undefined when SUPABASE_URL isn't set in this environment.
  // Log it server-side (visible in Vercel logs) instead of throwing an opaque
  // TypeError that the client swallows.
  if (!supabaseAdmin) {
    console.error("[waitlist] Supabase not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY missing). Signup not stored.", { source });
    return { ok: false, error: "Something went wrong. Try again in a moment." };
  }

  const { error } = await supabaseAdmin.from("waitlist").insert({
    email,
    source,
    platform_interest: platform ? String(platform) : null,
  });

  // 23505 = unique violation. Treat a repeat signup as success; don't leak
  // whether an address is already on the list.
  if (error && error.code !== "23505") {
    console.error("[waitlist] Supabase insert failed", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
      source,
    });
    return { ok: false, error: "Something went wrong. Try again in a moment." };
  }

  if (!error) revalidateTag("waitlist-count", "max");
  return { ok: true };
}
