'use server'

import { createClerkSupabaseClient } from '@/lib/supabase/server';

export interface ProductDetail {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string | null;
  stock_quantity: number | null;
}

export async function getProductById(id: string) {
  const supabase = createClerkSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('id,name,description,price,category,stock_quantity')
    .eq('id', id)
    .single();

  if (error) return { data: null as ProductDetail | null, error };
  return { data: data as ProductDetail, error: null };
}


