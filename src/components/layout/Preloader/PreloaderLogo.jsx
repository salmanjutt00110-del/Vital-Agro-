import React from 'react';
import { motion } from 'framer-motion';
import vitalAgroLogo from '@/assets/vital agro logo.webp';

export default function PreloaderLogo({ mousePos, isExiting }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
      animate={isExiting ? {
        scale: 1.25,
        opacity: 0,
        filter: 'blur(15px)',
        transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] }
      } : {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        transition: { delay: 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }
      }}
      className="relative z-10 select-none pointer-events-none mb-10"
    >
      {/* 3D mouse parallax translation */}
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1200px) rotateX(${mousePos.y * -10}deg) rotateY(${mousePos.x * 10}deg) translate3d(${mousePos.x * 15}px, ${mousePos.y * 15}px, 0)`,
          transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="relative"
      >
        {/* Animated Light Rays Background behind Logo */}
        <div className="absolute inset-0 -m-12 pointer-events-none overflow-hidden z-0">
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle,rgba(92,184,92,0.15)_0%,transparent_60%)]"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 bg-transparent flex items-center justify-center">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-[350px] bg-gradient-to-t from-transparent via-[#76C945]/10 to-transparent"
                style={{ rotate: i * 30 }}
                animate={{ rotate: [i * 30, i * 30 + 360] }}
                transition={{ duration: 18 + i * 2, repeat: Infinity, ease: 'linear' }}
              />
            ))}
          </div>
        </div>

        {/* Premium Noise Overlay Layer */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none rounded-[2.5rem] z-20 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
          }}
        />

        {/* Luxury Glass Card with pulsing glow */}
        <motion.div
          animate={{
            boxShadow: [
              '0 0 50px rgba(92, 184, 92, 0.15), inset 0 0 15px rgba(255, 255, 255, 0.05)',
              '0 0 85px rgba(92, 184, 92, 0.35), inset 0 0 25px rgba(255, 255, 255, 0.08)',
              '0 0 50px rgba(92, 184, 92, 0.15), inset 0 0 15px rgba(255, 255, 255, 0.05)'
            ]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="relative w-[220px] h-[170px] sm:w-[280px] sm:h-[210px] md:w-[340px] md:h-[250px] bg-black/40 backdrop-blur-[32px] saturate-[180%] rounded-[2.5rem] flex flex-col items-center justify-center border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden"
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
              stroke="rgba(138, 214, 90, 0.45)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 1.5, ease: "easeInOut" }}
            />
          </svg>

          {/* Sheen sweeping shine */}
          <motion.div
            animate={{
              x: ['-150%', '150%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1.5
            }}
            className="absolute inset-y-0 w-[40%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
          />

          {/* Floating loop logo */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, -2, 0]
            }}
            transition={{
              delay: 0.5,
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10 flex items-center justify-center"
          >
            <img
              src={vitalAgroLogo}
              alt="Vital Agro Logo"
              width="140"
              height="55"
              className="h-24 sm:h-28 w-auto object-contain drop-shadow-[0_0_35px_rgba(255,255,255,0.4)]"
              loading="eager"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
