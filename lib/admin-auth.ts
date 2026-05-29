import { createClient } from '@supabase/supabase-js';
import { adminEmails, getSupabaseAdmin } from '@/lib/supabase';

export async function requireAdmin(request: Request) {
  const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return { error: 'missing_token' as const, status: 401 };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return { error: 'missing_public_env' as const, status: 500 };

  const verifier = createClient(url, anonKey, { auth: { persistSession: false } });
  const { data, error } = await verifier.auth.getUser(token);
  const email = data.user?.email?.toLowerCase();

  if (error || !data.user || !email) {
    return { error: 'invalid_token' as const, status: 401 };
  }

  const allowed = adminEmails();
  if (!allowed.size || !allowed.has(email)) {
    return { error: 'forbidden' as const, status: 403 };
  }

  return { user: data.user, admin: getSupabaseAdmin() };
}
