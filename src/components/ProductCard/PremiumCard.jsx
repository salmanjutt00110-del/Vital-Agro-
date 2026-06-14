import React from 'react';
import { motion } from 'framer-motion';
import PremiumButton from '@/components/ui/PremiumButton';

/**
 * PremiumCard – a glass‑morphic 3D product card.
 * Props:
 *   - product: product object from PRODUCTS_DATA
 *   - mousePosition: {x, y} values (‑0.5..0.5) for tilt effect
 *   - lang: current language code for text
 */
export default function PremiumCard({ product, mousePosition = { x: 0, y: 0 }, lang }) {
  const firstSize = product.sizes?.[0];
  const price = Math.round(firstSize?.price || product.price || Number(product.pricing?.[0]?.rate) || 999);
  const oldPrice = firstSize?.oldPrice ? Math.round(firstSize.oldPrice) : null;

  const tiltStyle = {
    transform: `rotateX(${ -mousePosition.y * 15 }deg) rotateY(${ mousePosition.x * 15 }deg)`,
    perspective: '1000px'
  };

  return (
    <motion.div
      className="glass premium-card-3d premium-card-3d-reflection p-6 rounded-2xl shadow-lg cursor-pointer"
      style={tiltStyle}
      whileHover={{ scale: 1.02, y: -8 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image */}
      <img
        src={product.pngUrl || product.imageUrl}
        alt={product.name[lang]}
        className="w-full h-auto object-contain max-h-[300px] mx-auto rounded-xl transition-transform duration-500 hover:scale-105"
      />
      {/* Details */}
      <div className="mt-4 text-center">
        <h2 className="text-xl font-bold text-white drop-shadow-sm">{product.name[lang]}</h2>
        <p className="text-sm text-white/70 mt-1">{product.formulation || 'SL Form'} • {product.activeIngredient}</p>
        <div className="flex items-baseline justify-center gap-2 mt-2">
          <span className="text-2xl font-mono text-[#8AD65A]">PKR {price.toLocaleString()}</span>
          {oldPrice && (
            <span className="text-sm text-white/30 line-through font-mono">PKR {oldPrice.toLocaleString()}</span>
          )}
        </div>
        <div className="flex justify-center gap-3 mt-4">
          <PremiumButton
            variant="primary"
            onClick={() => {
              // Hook into cart context if needed – placeholder for quick add
            }}
            className="px-5 py-2 text-sm font-bold"
          >
            Quick Checkout
          </PremiumButton>
          <PremiumButton
            variant="secondary"
            href={`/products/${product.slug}`}
            className="px-5 py-2 text-sm font-bold"
          >
            Product Profile
          </PremiumButton>
        </div>
      </div>
    </motion.div>
  );
}
