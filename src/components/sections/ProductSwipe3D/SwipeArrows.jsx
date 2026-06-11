import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function SwipeArrows({ onPrev, onNext, canPrev, canNext }) {
  return (
    <>
      {/* Left Arrow */}
      <motion.button
        onClick={onPrev}
        disabled={!canPrev}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="
          hidden md:flex absolute left-4 top-1/2 -translate-y-1/2
          w-12 h-12 rounded-full items-center justify-center
          bg-white/5 border border-white/10
          text-white/60 hover:text-white hover:bg-white/10
          disabled:opacity-20 disabled:cursor-not-allowed
          transition-all duration-300 z-20
          backdrop-blur-xl
        "
      >
        <ChevronLeft size={20} />
      </motion.button>

      {/* Right Arrow */}
      <motion.button
        onClick={onNext}
        disabled={!canNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="
          hidden md:flex absolute right-4 top-1/2 -translate-y-1/2
          w-12 h-12 rounded-full items-center justify-center
          bg-white/5 border border-white/10
          text-white/60 hover:text-white hover:bg-white/10
          disabled:opacity-20 disabled:cursor-not-allowed
          transition-all duration-300 z-20
          backdrop-blur-xl
        "
      >
        <ChevronRight size={20} />
      </motion.button>
    </>
  );
}
