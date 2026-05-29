import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let browserClient: SupabaseClient | null = null;
let publicServerClient: SupabaseClient | null = null;
let adminClient: SupabaseClient | null = null;

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function getSupabaseAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

export function hasSupabasePublicEnv() {
  return Boolean(getSupabaseUrl() && getSupabaseAnonKey());
}

export function getSupabaseBrowser() {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  }
  if (!browserClient) browserClient = createClient(url, anonKey);
  return browserClient;
}

export function getSupabasePublicServer() {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey) return null;
  if (!publicServerClient) {
    publicServerClient = createClient(url, anonKey, {
      auth: { persistSession: false },
    });
  }
  return publicServerClient;
}

export function getSupabaseAdmin() {
  const url = getSupabaseUrl();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }
  if (!adminClient) {
    adminClient = createClient(url, serviceRoleKey, {
      auth: { persistSession: false },
    });
  }
  return adminClient;
}

export function adminEmails() {
  return new Set(
    (process.env.ADMIN_EMAILS ?? '')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean),
  );
}
