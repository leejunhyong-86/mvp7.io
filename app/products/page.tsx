import Link from 'next/link';
import { getProducts } from '@/actions/products/get-products';
import { ProductCard } from '@/components/product/product-card';

export default async function ProductsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const page = Number(params.page ?? 1) || 1;
  const category = typeof params.category === 'string' ? params.category : null;

  const { data, count, error } = await getProducts({ page, pageSize: 12, category });
  const totalPages = Math.max(1, Math.ceil((count ?? 0) / 12));

  return (
    <main className="px-8 py-12">
      <section className="w-full max-w-7xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">상품 목록</h1>
          <CategoryChips active={category} />
        </header>

        {error ? (
          <div className="text-sm text-red-600 dark:text-red-400">상품을 불러오는 중 오류가 발생했습니다.</div>
        ) : data && data.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((p) => (
              <ProductCard key={p.id} name={p.name} price={p.price} category={p.category} />
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400">상품이 없습니다.</div>
        )}

        <div className="mt-8 flex items-center justify-center gap-4">
          <PageLink page={page - 1} disabled={page <= 1} category={category}>
            이전
          </PageLink>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {page} / {totalPages}
          </span>
          <PageLink page={page + 1} disabled={page >= totalPages} category={category}>
            다음
          </PageLink>
        </div>
      </section>
    </main>
  );
}

function PageLink({ page, disabled, category, children }: { page: number; disabled?: boolean; category: string | null; children: React.ReactNode }) {
  const search = new URLSearchParams();
  if (category) search.set('category', category);
  search.set('page', String(Math.max(1, page)));

  if (disabled) {
    return (
      <span className="px-3 py-1 rounded border border-gray-200 dark:border-gray-800 text-gray-400">
        {children}
      </span>
    );
  }

  return (
    <Link
      href={`/products?${search.toString()}`}
      className="px-3 py-1 rounded border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-zinc-900"
    >
      {children}
    </Link>
  );
}

async function CategoryChips({ active }: { active: string | null }) {
  // 단순 카테고리 목록: products 테이블에서 추출 (Home에서 구현된 getCategories 재활용 고려)
  const { getCategories } = await import('@/actions/products/get-categories');
  const { data } = await getCategories(12);

  const allHref = '/products?page=1';
  return (
    <div className="flex flex-wrap gap-2">
      <Chip href={allHref} active={!active}>
        전체
      </Chip>
      {(data ?? []).map((c) => {
        const params = new URLSearchParams();
        params.set('category', c);
        params.set('page', '1');
        const href = `/products?${params.toString()}`;
        return (
          <Chip key={c} href={href} active={active === c}>
            {toTitleCase(c)}
          </Chip>
        );
      })}
    </div>
  );
}

function Chip({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className={
        active
          ? 'px-3 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black'
          : 'px-3 py-1 rounded-full border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-zinc-900'
      }
    >
      {children}
    </Link>
  );
}

function toTitleCase(input: string) {
  if (!input) return '';
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}


