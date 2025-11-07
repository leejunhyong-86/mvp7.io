'use server'

import { createClerkSupabaseClient } from '@/lib/supabase/server';

export async function getCategories(limit: number = 6) {
  const supabase = createClerkSupabaseClient();
  // distinct 카테고리 목록
  const { data, error } = await supabase
    .from('products')
    .select('category')
    .neq('category', null)
    .order('category', { ascending: true });

  if (error) return { data: null as string[] | null, error };

  const categories = Array.from(
    new Set((data || []).map((row: any) => row.category as string))
  )
    .filter(Boolean)
    .slice(0, limit);

  return { data: categories, error: null };
}


