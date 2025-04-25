import { createClient } from "@supabase/supabase-js"

// These will be replaced with your actual Supabase URL and anon key
// when you add the Supabase integration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
