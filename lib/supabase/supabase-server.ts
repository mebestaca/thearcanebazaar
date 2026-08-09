import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.warn(
    'Supabase server env vars are missing. Set SUPABASE_SERVICE_ROLE_KEY in .env.local (server-only, never exposed to the browser).'
  );
}

// SERVER-ONLY client. Bypasses RLS via the service role key — never import this
// file from a "use client" component.
export const supabaseServer = createClient(supabaseUrl ?? '', serviceRoleKey ?? '', {
  auth: { persistSession: false },
});
