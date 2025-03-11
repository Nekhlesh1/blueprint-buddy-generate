
import { createClient } from '@supabase/supabase-js';
import type { Database } from './database-types';

const SUPABASE_URL = "https://ojvswjkopuhoadzqtsqh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qdnN3amtvcHVob2FkenF0c3FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE2NzEzNzYsImV4cCI6MjA1NzI0NzM3Nn0.mM23UPT6S71oCClkKVimD5PNbiiv4osL8x0h8kpX8pE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
