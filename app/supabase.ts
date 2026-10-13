import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

// One shared connection to Supabase. It is null when the two settings are
// missing, so the page can say so instead of crashing.
export const supabase = url && key ? createClient(url, key) : null;
