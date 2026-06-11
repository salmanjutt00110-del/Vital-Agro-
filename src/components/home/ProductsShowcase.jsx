import React, { Suspense } from 'react';
const ProductSwipe3D = React.lazy(() => import('../sections/ProductSwipe3D'));
import { PRODUCTS_DATA } from '@/data/productsData';

export default function ProductsShowcase() {
  const products = Object.values(PRODUCTS_DATA).filter(p => p.id);
  
  return (
    <Suspense fallback={
      <div className="h-[400px] flex items-center justify-center bg-[#02140c] text-white/40 text-xs tracking-widest font-black uppercase">
        Loading Collection Stage...
      </div>
    }>
      <ProductSwipe3D products={products} />
    </Suspense>
  );
}