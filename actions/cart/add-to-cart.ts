'use server'

// Phase 2 범위에서는 버튼/형태만 제공하고, 실제 장바구니 저장은 Phase 3에서 구현합니다.
// 여기서는 입력 검증만 수행하고 항상 에러 없이 성공으로 응답합니다.

export interface AddToCartInput {
  productId: string;
  quantity: number;
}

export async function addToCart(_input: AddToCartInput) {
  // TODO (Phase 3): Clerk userId로 cart_items insert 구현
  return { ok: true } as const;
}


