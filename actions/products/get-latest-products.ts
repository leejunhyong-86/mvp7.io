'use server'

import { createClerkSupabaseClient } from '@/lib/supabase/server';
import type { ProductSummary } from '@/types/product';

export async function getLatestProducts(limit: number = 16) {
  const supabase = createClerkSupabaseClient();

  const { data, error } = await supabase
    .from('products')
    .select('id,name,price,category')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    return { data: null as ProductSummary[] | null, error };
  }

  return { data: (data as ProductSummary[]) ?? [], error: null };
}


