import "server-only";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL ?? "";
const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

// Service-role client. Import only from server components and server actions.
export const supabaseAdmin = url
  ? createClient(url, key, { auth: { persistSession: false } })
  : (undefined as unknown as ReturnType<typeof createClient>);
