import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingProduct({ src, alt, isActive }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="relative flex items-center justify-center">
      {/* Glow beneath product */}
      <motion.div
        className="absolute bottom-0 w-28 h-6 rounded-full blur-xl"
        style={{ background: 'radial-gradient(ellipse, rgba(92,184,92,0.4) 0%, transparent 70%)' }}
        animate={isActive && !isMobile ? {
          opacity: [0.4, 0.7, 0.4],
          scaleX: [1, 1.15, 1],
        } : { opacity: 0.2 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Product image — 3D float */}
      <motion.div
        animate={isActive && !isMobile ? {
          y: [0, -14, 0],
          rotateX: [0, 3, 0],
          rotateY: [0, 5, 0, -5, 0],
        } : {}}
        transition={{
          y:       { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
          rotateX: { duration: 5,   repeat: Infinity, ease: 'easeInOut' },
          rotateY: { duration: 8,   repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <img
          src={src}
          alt={alt}
          className="w-44 h-44 object-contain"
          style={{
            filter: isActive && !isMobile
              ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.5)) drop-shadow(0 0 30px rgba(92,184,92,0.15))'
              : 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))',
            transition: 'filter 0.5s ease',
          }}
          loading="lazy"
        />
      </motion.div>
    </div>
  );
}
