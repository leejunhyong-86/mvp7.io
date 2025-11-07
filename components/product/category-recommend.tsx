import { getCategories } from '@/actions/products/get-categories';
import { getProductsByCategory } from '@/actions/products/get-by-category';
import { ProductCard } from './product-card';

export async function CategoryRecommend() {
  const { data: categories, error } = await getCategories(3);
  if (error) {
    return (
      <div className="text-sm text-red-600 dark:text-red-400">
        카테고리를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="text-sm text-gray-500 dark:text-gray-400">표시할 카테고리가 없습니다.</div>
    );
  }

  return (
    <div className="space-y-10">
      {await Promise.all(
        categories.map(async (cat) => {
          const { data: items } = await getProductsByCategory(cat, 4);
          return (
            <div key={cat}>
              <h3 className="mb-4 text-lg font-semibold">{toTitleCase(cat)}</h3>
              {items && items.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {items.map((p) => (
                    <ProductCard key={p.id} name={p.name} price={p.price} category={p.category} />
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 dark:text-gray-400">해당 카테고리 상품이 없습니다.</div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

function toTitleCase(input: string) {
  if (!input) return '';
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}


