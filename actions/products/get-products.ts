'use server'

import { createClerkSupabaseClient } from '@/lib/supabase/server';
import type { ProductSummary } from '@/types/product';

export interface GetProductsParams {
  page?: number;
  pageSize?: number;
  category?: string | null;
}

export async function getProducts({ page = 1, pageSize = 12, category = null }: GetProductsParams) {
  const supabase = createClerkSupabaseClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('products')
    .select('id,name,price,category', { count: 'exact' })
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error, count } = await query;

  if (error) {
    return { data: null as ProductSummary[] | null, count: 0, error };
  }

  return { data: (data as ProductSummary[]) ?? [], count: count ?? 0, error: null };
}


