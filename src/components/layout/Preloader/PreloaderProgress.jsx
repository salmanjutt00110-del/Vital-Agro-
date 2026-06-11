import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';

export default function PreloaderProgress({ value, statusMsg, isExiting }) {
  const [displayPercent, setDisplayPercent] = useState(0);

  const springValue = useSpring(0, { stiffness: 45, damping: 15 });

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayPercent(Math.round(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  const isComplete = displayPercent >= 100;

  return (
    <motion.div
      animate={isExiting ? {
        opacity: 0,
        y: 20,
        transition: { duration: 0.5, ease: 'easeIn' }
      } : {}}
      className="flex flex-col items-center w-full max-w-[280px] sm:max-w-[360px] select-none"
    >
      {/* Liquid Gooey SVG Filters */}
      <svg className="absolute w-0 h-0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="liquidGoo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" 
              result="goo" 
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Percentage Counter with Spring Motion */}
      <motion.span
        animate={isComplete ? {
          scale: [1, 1.12, 1],
          color: '#8AD65A',
          textShadow: '0 0 35px rgba(138, 214, 90, 0.85)',
          transition: { duration: 0.4, ease: 'easeOut' }
        } : {
          color: '#ffffff',
          textShadow: '0 0 25px rgba(138, 214, 90, 0.35)',
        }}
        className="font-black font-mono tracking-tight text-[3rem] sm:text-[4.5rem] tabular-nums leading-none select-none drop-shadow"
        style={{ fontVariantNumeric: 'tabular-nums', fontFeatureSettings: '"tnum"', letterSpacing: '-0.03em' }}
      >
        {displayPercent}%
      </motion.span>

      {/* Liquid Progress Track */}
      <div 
        className="w-full h-4 bg-white/5 border border-white/5 rounded-full relative mt-6 mb-6 overflow-hidden flex items-center p-0.5"
        style={{ filter: 'url(#liquidGoo)' }}
      >
        {/* Animated fluid bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-[#2d6a2d] via-[#76C945] to-[#2d6a2d] rounded-full relative flex items-center justify-end"
          style={{ width: `${Math.max(5, displayPercent)}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        >
          {/* Liquid droplet bubble indicator at end */}
          {displayPercent > 5 && displayPercent < 100 && (
            <motion.div 
              className="w-3.5 h-3.5 rounded-full bg-[#8AD65A] absolute right-0 shadow-[0_0_10px_#76C945]"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
          
          {/* Internal Shimmer Sweep */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </motion.div>
      </div>

      {/* Rotating loading status */}
      <div className="h-6 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={statusMsg}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="text-white/60 text-xs font-semibold tracking-wide"
          >
            {statusMsg}
          </motion.p>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
