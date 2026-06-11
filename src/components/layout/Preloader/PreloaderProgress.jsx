import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useSpring } from 'framer-motion';

export default function PreloaderProgress({ value, statusMsg, isExiting }) {
  const [displayPercent, setDisplayPercent] = useState(0);

  const springValue = useSpring(0, { stiffness: 45, damping: 14 });

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
        y: 15,
        transition: { duration: 0.5, ease: 'easeIn' }
      } : {}}
      className="flex flex-col items-center w-full max-w-[280px] sm:max-w-[360px] select-none"
    >
      {/* Percentage Counter */}
      <motion.span
        animate={isComplete ? {
          scale: [1, 1.1, 1],
          color: '#8AD65A',
          textShadow: '0 0 30px rgba(118, 201, 69, 0.8)',
          transition: { duration: 0.35, ease: 'easeOut' }
        } : {
          color: '#ffffff',
          textShadow: '0 0 20px rgba(118, 201, 69, 0.3)',
        }}
        className="font-black font-mono tracking-widest text-[2.5rem] sm:text-[3rem] tabular-nums leading-none select-none"
      >
        {displayPercent}
        <span className="text-sm font-bold text-white/30 ml-0.5">%</span>
      </motion.span>

      {/* Progress track */}
      <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden relative mt-4 mb-6 shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-[#2d6a2d] via-[#5cb85c] to-[#2d6a2d] rounded-full relative"
          style={{ width: `${displayPercent}%` }}
        >
          {/* Shimmer sweep line */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
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
