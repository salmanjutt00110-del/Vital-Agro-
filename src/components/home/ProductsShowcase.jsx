import React, { Suspense } from 'react';
const ProductShowcase = React.lazy(() => import('../sections/ProductShowcase'));

export default function ProductsShowcase() {
  return (
    <Suspense fallback={
      <div className="h-[400px] flex items-center justify-center bg-[#02140c] text-white/40 text-xs tracking-widest font-black uppercase">
        Loading Collection Stage...
      </div>
    }>
      <ProductShowcase />
    </Suspense>
  );
}