// import { supabase } from '@/lib/supabase';

// async function getProduct(id: string): Promise<Product | null> {
//   const { data, error } = await supabase
//     .from('products')
//     .select('*')
//     .eq('id', id)
//     .single();

//   if (error || !data) return null;
//   return data as Product;
// }