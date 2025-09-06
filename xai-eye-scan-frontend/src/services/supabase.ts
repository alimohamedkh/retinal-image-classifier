import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://vlzqpsknkkfwxgzqkyly.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsenFwc2tua2tmd3hnenFreWx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3MjU5NTAsImV4cCI6MjA3MjMwMTk1MH0.UvY6HWt8qQaciKkfMRUWEKAkS1gDT2W_qHgr4h6Talg";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
