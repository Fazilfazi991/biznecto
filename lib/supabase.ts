import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Only create the client if we have valid credentials to avoid "Invalid URL" crashes
export const supabase = (supabaseUrl && supabaseUrl.startsWith('http')) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as any; 

if (!supabase) {
  console.warn("Supabase credentials missing or invalid. Storage features will not work.");
}
