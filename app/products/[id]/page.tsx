import { getProductById } from '@/actions/products/get-product-by-id';
import { formatCurrencyKRW } from '@/lib/utils';
import { QuantitySelector } from '@/components/product/quantity-selector';
import { addToCart } from '@/actions/cart/add-to-cart';
import { Button } from '@/components/ui/button';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data, error } = await getProductById(id);

  if (error || !data) {
    return (
      <main className="px-8 py-12">
        <section className="w-full max-w-5xl mx-auto">
          <div className="text-sm text-red-600 dark:text-red-400">상품을 불러오는 중 오류가 발생했습니다.</div>
        </section>
      </main>
    );
  }

  return (
    <main className="px-8 py-12">
      <section className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <div className="aspect-square w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900" />
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-semibold">{data.name}</h1>
            {data.category && (
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">{toTitleCase(data.category)}</div>
            )}
          </div>
          <div className="text-xl font-bold">{formatCurrencyKRW(data.price)}</div>
          {data.description && (
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">{data.description}</p>
          )}
          <div className="flex items-center gap-4">
            <QuantitySelector />
            <form action={async () => { "use server"; await addToCart({ productId: data.id, quantity: 1 }); }}>
              <Button type="submit">장바구니 추가</Button>
            </form>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">재고: {data.stock_quantity ?? 0}개</div>
        </div>
      </section>
    </main>
  );
}

function toTitleCase(input: string) {
  if (!input) return '';
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}


