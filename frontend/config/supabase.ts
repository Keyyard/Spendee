import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bwhtzaixmmndrusigggw.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ3aHR6YWl4bW1uZHJ1c2lnZ2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE5NTkzMDUsImV4cCI6MjA1NzUzNTMwNX0.qlkSoKKFrDabwsXxwObLdF5hjSju65SA-F0EfZ2Aoqc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  global: { fetch: fetch.bind(globalThis) },
});
