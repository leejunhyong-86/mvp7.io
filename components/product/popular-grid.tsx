import { getPopularProducts } from '@/actions/products/get-popular-products';
import { ProductCard } from './product-card';

export async function PopularGrid() {
  const { data, error } = await getPopularProducts(8);

  if (error) {
    return (
      <div className="text-sm text-red-600 dark:text-red-400">
        인기 상품을 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">
        인기 상품이 없습니다.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((p) => (
        <ProductCard key={p.id} name={p.name} price={p.price} category={p.category} />
      ))}
    </div>
  );
}

export function PopularGridSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="rounded-lg border border-gray-200 dark:border-gray-800 p-4 bg-white dark:bg-zinc-900"
        >
          <div className="h-4 w-2/3 bg-gray-100 dark:bg-zinc-800 animate-pulse rounded" />
          <div className="mt-2 h-4 w-1/3 bg-gray-100 dark:bg-zinc-800 animate-pulse rounded" />
          <div className="mt-4 h-5 w-1/4 bg-gray-100 dark:bg-zinc-800 animate-pulse rounded" />
        </div>
      ))}
    </div>
  );
}


