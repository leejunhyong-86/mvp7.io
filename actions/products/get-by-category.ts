'use server'

import { createClerkSupabaseClient } from '@/lib/supabase/server';
import type { ProductSummary } from '@/types/product';

export async function getProductsByCategory(category: string, limit: number = 4) {
  const supabase = createClerkSupabaseClient();
  const { data, error } = await supabase
    .from('products')
    .select('id,name,price,category')
    .eq('is_active', true)
    .eq('category', category)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) return { data: null as ProductSummary[] | null, error };
  return { data: (data as ProductSummary[]) ?? [], error: null };
}


