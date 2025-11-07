import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrencyKRW(value: number) {
  try {
    return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value)
  } catch {
    return `${value.toLocaleString('ko-KR')}원`
  }
}
