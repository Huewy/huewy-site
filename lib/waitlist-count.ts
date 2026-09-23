import "server-only";
import { unstable_cache } from "next/cache";
import { supabaseAdmin } from "./supabase-server";

// Cached count, tagged so the insert action can bust it.
// Cheap even on cold hits: head:true returns only the count header.
export const getWaitlistCount = unstable_cache(
  async () => {
    if (!supabaseAdmin) return 0;
    const { count, error } = await supabaseAdmin
      .from("waitlist")
      .select("*", { count: "exact", head: true });
    if (error) return 0;
    return count ?? 0;
  },
  ["waitlist-count"],
  { tags: ["waitlist-count"], revalidate: 300 }
);
