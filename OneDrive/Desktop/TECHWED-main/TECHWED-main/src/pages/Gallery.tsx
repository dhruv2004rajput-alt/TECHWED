// Add this import
import { supabase } from "../integrations/supabase/client";

// Replace renderGallery function
async function loadPortfolio() {
  const { data, error } = await supabase
    .from('portfolio')
    .select('*')
    .order('display_order', { ascending: true });
  
  if (error) {
    console.error('Error loading:', error);
    return [];
  }
  return data;
}
