import React from 'react';
import { Link } from 'react-router-dom';
import FloatingProduct from './FloatingProduct';
import CODWhatsAppButton from '@/components/CODWhatsApp/CODWhatsAppButton';

export default function SwipeCard3D({ product, isActive, isPeek, isDragging }) {
  const imageSrc = product.pngUrl || product.imageUrl || product.image;
  const prodName = typeof product.name === 'object' ? (product.name.en || product.name) : product.name;

  return (
    <div
      className={`
        swipe-card-3d relative
        w-full rounded-[32px] overflow-hidden
        flex flex-col items-center
        px-6 pt-8 pb-6
        cursor-grab active:cursor-grabbing
        transition-shadow duration-500
        ${isActive ? 'shadow-[0_40px_100px_rgba(0,0,0,0.6),0_0_0_1px_rgba(92,184,92,0.12)]' : ''}
      `}
      style={{
        // Glassmorphism
        background: 'rgba(255,255,255,0.035)',
        backdropFilter: 'blur(32px) saturate(160%)',
        WebkitBackdropFilter: 'blur(32px) saturate(160%)',
        border: '1px solid rgba(255,255,255,0.09)',
        // 3D depth feel
        boxShadow: isActive
          ? '0 40px 100px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.10), 0 0 80px rgba(45,106,45,0.08)'
          : 'none',
        minHeight: '500px',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Top left: Category badge */}
      <div className="absolute top-5 left-5">
        <span className="
          px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.12em] uppercase
          bg-[rgba(45,106,45,0.35)] border border-[rgba(92,184,92,0.25)]
          text-[#5cb85c]
        ">
          {product.category}
        </span>
      </div>

      {/* Top right: Discount badge */}
      {product.discount && (
        <div className="absolute top-5 right-5">
          <span className="
            px-2 py-1 rounded-lg text-[10px] font-bold
            bg-[#e63946] text-white
          ">
            -{product.discount}%
          </span>
        </div>
      )}

      {/* 3D Floating Product Image */}
      <div className="mt-8 mb-6 w-full flex justify-center">
        <FloatingProduct
          src={imageSrc}
          alt={prodName}
          isActive={isActive}
        />
      </div>

      {/* Divider line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

      {/* Product Info */}
      <div className="w-full text-center">
        <h3 className="text-white font-bold text-xl leading-tight mb-1">
          {prodName}
        </h3>
        <p className="text-white/40 text-xs tracking-wider uppercase mb-4 font-mono">
          {product.activeIngredient || product.formula || product.formulation}
        </p>

        {/* Price */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="text-[#5cb85c] font-bold text-2xl font-mono">
            PKR {product.price?.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-white/30 text-sm line-through font-mono">
              PKR {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col gap-3 mt-auto">
        {/* COD WhatsApp Order Button */}
        <CODWhatsAppButton product={product} />

        {/* View Details */}
        <Link
          to={`/products/${product.slug}`}
          className="
            w-full py-3.5 rounded-2xl text-center text-sm font-semibold
            text-white/60 border border-white/10
            hover:text-white hover:border-white/25
            transition-all duration-300
          "
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
