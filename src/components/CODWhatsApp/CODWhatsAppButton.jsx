import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useWhatsAppOrder } from './useWhatsAppOrder';
import { useLanguage } from '@/lib/LanguageContext';

const CODBottomSheet = React.lazy(() => import('./CODBottomSheet'));

export default function CODWhatsAppButton({ product, className = "", defaultSize = null, defaultQuantity = 1 }) {
  const orderState = useWhatsAppOrder(product, defaultSize, defaultQuantity);
  const { lang } = useLanguage();

  return (
    <>
      <motion.button
        onClick={() => orderState.setIsOpen(true)}
        whileTap={{ scale: 0.96 }}
        className={`
          w-full py-4 rounded-2xl
          flex items-center justify-center gap-2
          font-bold text-sm text-white
          relative overflow-hidden
          bg-gradient-to-r from-[#2d6a2d] via-[#3d8c3d] to-[#2d6a2d]
          bg-[length:200%_100%]
          shadow-[0_0_30px_rgba(45,106,45,0.4)]
          transition-all duration-500
          hover:shadow-[0_0_50px_rgba(45,106,45,0.6)]
          hover:bg-right
          ${className}
        `}
        style={{ backgroundPosition: '0% 0%' }}
      >
        {/* Shimmer overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
        />
        <ShoppingBag size={16} />
        <span>{lang === 'en' ? 'Order Now (COD)' : 'آرڈر کریں (COD)'}</span>
      </motion.button>

      <Suspense fallback={null}>
        <CODBottomSheet product={product} {...orderState} />
      </Suspense>
    </>
  );
}
