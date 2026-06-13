import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import FloatingProduct from './FloatingProduct';
import { useLanguage } from '@/lib/LanguageContext';

export default function SwipeCard3D({ product, isActive, isPeek, isDragging, openCheckout }) {
  const { lang } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const imageSrc = product.pngUrl || product.imageUrl || product.image;
  const prodName = typeof product.name === 'object' ? (product.name.en || product.name || product.name[lang]) : product.name;

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        swipe-card-3d relative
        w-full rounded-[32px] overflow-hidden
        flex flex-col items-center
        px-6 pt-8 pb-6
        transition-all duration-500
      `}
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
        backdropFilter: typeof window !== 'undefined' && window.innerWidth < 768 ? 'none' : 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: typeof window !== 'undefined' && window.innerWidth < 768 ? 'none' : 'blur(30px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: isActive
          ? typeof window !== 'undefined' && window.innerWidth < 768
            ? '0 12px 30px rgba(0,0,0,0.5)'
            : isHovered
              ? '0 50px 120px rgba(0,0,0,0.65), 0 0 100px rgba(92,184,92,0.2), inset 0 1px 0 rgba(255,255,255,0.12)'
              : '0 40px 100px rgba(0,0,0,0.55), 0 0 80px rgba(92,184,92,0.1), inset 0 1px 0 rgba(255,255,255,0.1)'
          : 'none',
        minHeight: '520px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Premium Rotating Gradient Border for Active Card */}
      {isActive && (
        <span className="absolute inset-0 rounded-[32px] pointer-events-none p-[1.5px] overflow-hidden z-0">
          <motion.div
            className="absolute inset-[-60%] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent 35%, rgba(92, 184, 92, 0.45) 50%, transparent 65%)',
              filter: 'blur(3px)',
            }}
            animate={typeof window !== 'undefined' && window.innerWidth < 768 ? {} : { rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-[1.5px] bg-[#02140c]/95 rounded-[30.5px] -z-10" />
        </span>
      )}

      {/* Top left: Category badge */}
      <div className="absolute top-5 left-5 z-10">
        <span className="
          px-3 py-1 rounded-full text-[9px] font-black tracking-[0.15em] uppercase
          bg-[rgba(92,184,92,0.12)] border border-[rgba(92,184,92,0.2)]
          text-[#5cb85c]
        ">
          {product.category}
        </span>
      </div>

      {/* Top right: Discount badge */}
      {product.discount && (
        <div className="absolute top-5 right-5 z-10">
          <span className="
            px-2.5 py-1 rounded-lg text-[9px] font-black
            bg-[#e63946] text-white shadow-md
          ">
            -{product.discount}%
          </span>
        </div>
      )}

      {/* 3D Floating Product Image */}
      <div className="mt-10 mb-6 w-full flex justify-center z-10">
        <FloatingProduct
          src={imageSrc}
          alt={prodName}
          isActive={isActive}
        />
      </div>

      {/* Divider line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6 z-10" />

      {/* Product Info */}
      <div className="w-full text-center z-10">
        <h3 className="text-white font-black text-xl leading-tight mb-1 truncate hover:text-[#76C945] transition-colors">
          {prodName}
        </h3>
        <p className="text-white/40 text-[10px] tracking-widest uppercase mb-4 font-mono font-bold truncate">
          {product.activeIngredient || product.formula || product.formulation}
        </p>

        {/* Price */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-[#5cb85c] font-black text-2xl font-mono">
            PKR {product.price?.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-white/30 text-xs line-through font-mono">
              PKR {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col gap-2.5 mt-auto z-10">
        {/* BUY NOW COD — opens checkout */}
        <motion.button
          onClick={() => openCheckout && openCheckout(product)}
          whileTap={{ scale: 0.97 }}
          className="w-full py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider text-white relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1e5c1e 0%, #2d7a2d 50%, #1e5c1e 100%)',
            backgroundSize: '200% 100%',
            boxShadow: '0 0 28px rgba(45,106,45,0.35)',
          }}
        >
          {/* Shimmer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5 }}
          />
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span>🛒</span> {lang === 'en' ? 'BUY NOW (COD)' : 'ابھی خریدیں (COD)'}
          </span>
        </motion.button>

        {/* View Details */}
        <Link
          to={`/products/${product.slug}`}
          className="w-full py-3 rounded-2xl text-center text-xs font-black uppercase tracking-wider text-white/50 border border-white/10 hover:text-white hover:border-white/25 hover:bg-white/[0.02] transition-all duration-300"
        >
          {lang === 'en' ? 'View Details →' : 'تفصیلات دیکھیں ←'}
        </Link>
      </div>
    </motion.div>
  );
}
