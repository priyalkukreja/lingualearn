const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseServiceKey || supabaseAnonKey || 'placeholder');

module.exports = supabase;
