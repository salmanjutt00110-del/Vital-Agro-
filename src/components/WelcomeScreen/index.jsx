'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const WelcomeScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState(0);
  // phase 0 = welcome text
  // phase 1 = logo reveal
  // phase 2 = exit to preloader

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1400);
    const t2 = setTimeout(() => setPhase(2), 2600);
    const t3 = setTimeout(() => onComplete(), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center overflow-hidden select-none"
      style={{
        background: 'radial-gradient(ellipse 100% 80% at 50% 50%, #0d2a0d 0%, #061406 50%, #020c02 100%)',
      }}
      animate={phase === 2 ? { opacity: 0, scale: 1.05 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeIn' }}
    >
      {/* Particle field */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            background: '#5cb85c',
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [0, -(20 + Math.random() * 40)],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Horizontal scan line — cinematic effect */}
      <motion.div
        className="absolute inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(92,184,92,0.4), transparent)' }}
        animate={{ top: ['0%', '100%'] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />

      {/* WELCOME TO */}
      <motion.p
        className="text-white/40 text-[11px] tracking-[0.5em] uppercase mb-4 font-mono"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: phase >= 0 ? 1 : 0, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Welcome to
      </motion.p>

      {/* VITAL AGRO — Giant reveal */}
      <div className="overflow-hidden mb-2">
        <motion.h1
          className="text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tight leading-none"
          style={{ textShadow: '0 0 60px rgba(92,184,92,0.3)' }}
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          VITAL <span style={{ color: '#5cb85c', textShadow: '0 0 40px rgba(92,184,92,0.6)' }}>AGRO</span>
        </motion.h1>
      </div>

      {/* CHEMICAL INDUSTRIES */}
      <motion.p
        className="text-white/50 text-base md:text-xl tracking-[0.3em] uppercase mb-12"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Chemical Industries
      </motion.p>

      {/* LOGO with 3D burst */}
      <div className="h-40 flex items-center justify-center">
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              className="relative flex items-center justify-center"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            >
              {/* Burst rings */}
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-[rgba(92,184,92,0.3)]"
                  initial={{ width: 80, height: 80, opacity: 0.8 }}
                  animate={{ width: 80 + i * 80, height: 80 + i * 80, opacity: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: 'easeOut' }}
                />
              ))}

              {/* Logo card */}
              <motion.div
                className="relative z-10 p-5 rounded-[28px] shrink-0"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(92,184,92,0.3)',
                  boxShadow: '0 0 60px rgba(92,184,92,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
                animate={{ rotateY: [0, 360] }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              >
                <img
                  src="/logo.png"
                  alt="Vital Agro"
                  className="h-24 w-auto object-contain"
                  style={{ filter: 'drop-shadow(0 0 20px rgba(92,184,92,0.4))' }}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tagline */}
      <motion.p
        className="mt-8 text-white/30 text-xs tracking-widest font-semibold"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 1 ? 1 : 0 }}
        transition={{ delay: 0.3 }}
      >
        🇵🇰 Premium Agricultural Solutions · Pakistan
      </motion.p>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgba(2,12,2,0.8) 100%)',
        }}
      />
    </motion.div>
  );
};
