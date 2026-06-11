import React from 'react';
import { motion } from 'framer-motion';

export default function PreloaderBackground() {
  return (
    <div className="absolute inset-0 bg-[#02140c] z-0 overflow-hidden">
      {/* Layer 2: Pulsing radial gradient */}
      <motion.div
        className="absolute inset-0 z-1 pointer-events-none select-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(118, 201, 69, 0.15) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Layer 3: Moving grain/noise texture */}
      <div className="absolute inset-0 opacity-[0.03] z-2 pointer-events-none noise-bg" />
    </div>
  );
}
