import React, { Suspense } from 'react';
const ProductShowcase3D = React.lazy(() => import('../sections/ProductShowcase3D').then(m => ({ default: m.ProductShowcase3D })));

export default function ProductsShowcase() {
  return (
    <Suspense fallback={
      <div className="h-[400px] flex items-center justify-center bg-[#02140c] text-white/40 text-xs tracking-widest font-black uppercase">
        Loading 3D Showcase...
      </div>
    }>
      <ProductShowcase3D />
    </Suspense>
  );
}