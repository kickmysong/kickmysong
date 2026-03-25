import { createClient } from '@supabase/supabase-js'

// Ye dono cheezein aapne jo copy ki hain wahan se replace kar do
const supabaseUrl = 'https://aiikadiartwabjinfcup.supabase.co'
const supabaseAnonKey = 'sb_publishable_roqKLsqnrNA-mLOPpBjbXA_xuzw0Pch'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
