/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const HARDCODED_URL = 'https://cgrmrqavyobzerntvnmf.supabase.co';
const HARDCODED_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNncm1ycWF2eW9iemVybnR2bm1mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxMjQ5NjUsImV4cCI6MjA5OTcwMDk2NX0.eGAWc7VC3wqkCVxKbL-xsLmrlitSecZPQIcQYMBjMZs';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || HARDCODED_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || HARDCODED_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Variabel lingkungan Supabase (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) belum disetel. Aplikasi mungkin tidak berfungsi dengan baik.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);
