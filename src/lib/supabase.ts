import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. " +
    "Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env.local"
  );
}

// Only the anon/publishable key is used here — safe for the browser.
// All authorization is enforced by PostgreSQL Row Level Security (RLS).
// NEVER use the service_role key in this file or any frontend file.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ── Database Types ──────────────────────────────────────────────────────────

export type FeedbackStatus = "pending" | "approved" | "rejected";

export interface Feedback {
  id: string;
  student_name: string;
  display_name: string;
  course: string;
  rating: 1 | 2 | 3 | 4 | 5;
  feedback: string;
  display_name_public: boolean;
  status: FeedbackStatus;
  created_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  updated_at: string;
}

// Public-safe subset — only these fields are fetched for the public reviews section
export interface PublicReview {
  id: string;
  display_name: string;
  display_name_public: boolean;
  course: string;
  rating: number;
  feedback: string;
  created_at: string;
}
