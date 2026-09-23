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

  const { error } = await supabaseAdmin.from("waitlist").insert({
    email,
    source,
    platform_interest: platform ? String(platform) : null,
  });

  // 23505 = unique violation. Treat a repeat signup as success; don't leak
  // whether an address is already on the list.
  if (error && error.code !== "23505") {
    return { ok: false, error: "Something went wrong. Try again in a moment." };
  }

  if (!error) revalidateTag("waitlist-count");
  return { ok: true };
}
