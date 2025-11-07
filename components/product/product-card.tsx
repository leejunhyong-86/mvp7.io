import { cn } from '@/lib/utils';
import { formatCurrencyKRW } from '@/lib/utils';

interface ProductCardProps {
  name: string;
  price: number;
  category: string | null;
}

export function ProductCard({ name, price, category }: ProductCardProps) {
  return (
    <div className={cn(
      'rounded-lg border border-gray-200 dark:border-gray-800 p-4',
      'bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow'
    )}>
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-medium text-base line-clamp-2">{name}</h3>
        {category && (
          <span className="shrink-0 rounded-full bg-gray-100 dark:bg-zinc-800 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-300">
            {toTitleCase(category)}
          </span>
        )}
      </div>
      <div className="mt-3 text-lg font-semibold">{formatCurrencyKRW(price)}</div>
    </div>
  );
}

function toTitleCase(input: string) {
  if (!input) return '';
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
}


