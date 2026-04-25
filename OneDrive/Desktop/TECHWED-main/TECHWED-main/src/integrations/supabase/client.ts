import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://suyznuxcnadfdpchueyt.supabase.co';
const supabaseAnonKey = 'sb_publishable_70RK3G-AXCZxmIK_OpSnng_wH4Nwdeb';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
