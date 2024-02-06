import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabaseLawyersUrl = process.env.NEXT_PUBLIC_SUPABASE_LAWYERS_URL
const supabaseLawyersAnonKey = process.env.NEXT_PUBLIC_SUPABASE_LAWYERS_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const supabaseLawyers = createClient(
  supabaseLawyersUrl,
  supabaseLawyersAnonKey,
)
