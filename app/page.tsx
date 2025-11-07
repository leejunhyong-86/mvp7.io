import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RiSupabaseFill } from "react-icons/ri";
import { Suspense } from "react";
import { ProductGrid, ProductGridSkeleton } from "@/components/product/product-grid";
import { PopularGrid, PopularGridSkeleton } from "@/components/product/popular-grid";
import { CategoryRecommend } from "@/components/product/category-recommend";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-80px)] flex flex-col gap-16 px-8 py-16 lg:py-24">
      <section className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start lg:items-center">
        {/* 좌측: 히어로 카피 */}
        <div className="flex flex-col gap-8">
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
            새로운 상품을 만나보세요
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
            최신 아이템을 빠르게 둘러보고 간편하게 구매해 보세요.
          </p>
          <div>
            <Link href="/products">
              <Button size="lg">상품 전체보기</Button>
            </Link>
          </div>
        </div>

        {/* 우측: 안내 카드 */}
        <div className="flex flex-col gap-6">
          <div className="w-full h-28 flex items-center justify-center gap-4 text-xl rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-zinc-900 shadow-sm">
            지금 인기 상품과 카테고리별 추천을 확인하세요
          </div>
          <Link href="/auth-test" className="w-full">
            <Button
              className="w-full h-28 flex items-center justify-center gap-4 text-xl shadow-lg hover:shadow-xl transition-shadow"
              variant="outline"
            >
              <RiSupabaseFill className="w-8 h-8" />
              <span>Clerk + Supabase 인증 확인</span>
            </Button>
          </Link>
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">신규 상품</h2>
        </div>
        <Suspense fallback={<ProductGridSkeleton />}>
          {/* 최신 활성 상품 16개 */}
          <ProductGrid />
        </Suspense>
      </section>

      <section className="w-full max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">인기 상품</h2>
        </div>
        <Suspense fallback={<PopularGridSkeleton />}>
          <PopularGrid />
        </Suspense>
      </section>

      <section className="w-full max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">카테고리별 추천</h2>
        </div>
        {/* 상위 카테고리 몇 개만 노출 */}
        <CategoryRecommend />
      </section>
    </main>
  );
}
