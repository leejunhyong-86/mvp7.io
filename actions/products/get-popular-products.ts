'use server'

import { createClerkSupabaseClient } from '@/lib/supabase/server';
import type { ProductSummary } from '@/types/product';

// 임시 인기상품: 최신 등록 순 8개
export async function getPopularProducts(limit: number = 8) {
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


