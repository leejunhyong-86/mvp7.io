'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function QuantitySelector() {
  const [qty, setQty] = useState<number>(1);

  const dec = () => setQty((v) => Math.max(1, v - 1));
  const inc = () => setQty((v) => v + 1);

  return (
    <div className="inline-flex items-center gap-2">
      <Button type="button" variant="outline" onClick={dec} aria-label="decrease quantity">
        -
      </Button>
      <span className="min-w-8 text-center">{qty}</span>
      <Button type="button" variant="outline" onClick={inc} aria-label="increase quantity">
        +
      </Button>
    </div>
  );
}


