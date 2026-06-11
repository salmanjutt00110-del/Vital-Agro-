import React from 'react';
import { motion } from 'framer-motion';
import vitalAgroLogo from '@/assets/vital agro logo.webp';

export default function PreloaderLogo({ mousePos, isExiting }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, filter: 'blur(20px)' }}
      animate={isExiting ? {
        scale: 1.35,
        opacity: 0,
        filter: 'blur(12px)',
        transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
      } : {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: { delay: 0.1, duration: 1.0, ease: [0.16, 1, 0.3, 1] }
      }}
      className="relative z-10 select-none pointer-events-none mb-8"
    >
      {/* 3D mouse parallax translation */}
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${mousePos.y * -8}deg) rotateY(${mousePos.x * 8}deg) translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
          transition: 'transform 0.15s ease-out'
        }}
        className="relative"
      >
        {/* Luxury Glass Card with pulsing glow */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 40px rgba(118, 201, 69, 0.12)',
              '0 0 60px rgba(118, 201, 69, 0.24)',
              '0 0 40px rgba(118, 201, 69, 0.12)'
            ]
          }}
          transition={{
            duration: 2.0,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="relative w-[200px] h-[160px] sm:w-[260px] sm:h-[200px] md:w-[320px] md:h-[240px] bg-white/[0.03] backdrop-blur-[24px] saturate-[180%] rounded-[2.5rem] flex flex-col items-center justify-center border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] overflow-hidden"
        >
          {/* Border Tracing SVG */}
          <svg className="absolute inset-0 w-full h-full rounded-[2.5rem]" pointerEvents="none">
            <motion.rect
              x="0.75"
              y="0.75"
              width="99.5%"
              height="99.5%"
              rx="39"
              ry="39"
              fill="transparent"
              stroke="rgba(118, 201, 69, 0.35)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.2, duration: 1.2, ease: "easeInOut" }}
            />
          </svg>

          {/* Sheen sweeping shine */}
          <motion.div
            animate={{
              x: ['-150%', '150%'],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "linear",
              repeatDelay: 1
            }}
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-12 pointer-events-none"
          />

          {/* Floating loop logo */}
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              delay: 0.6,
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10 flex items-center justify-center"
          >
            <img
              src={vitalAgroLogo}
              alt="Vital Agro Logo"
              width="120"
              height="48"
              className="h-20 sm:h-24 w-auto object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]"
              loading="eager"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
