import React from 'react';
import { motion } from 'framer-motion';

export const PageLoader = () => (
  <div
    className="fixed inset-0 z-[900] flex flex-col items-center justify-center select-none"
    style={{
      background: 'rgba(6,20,6,0.96)',
      backdropFilter: 'blur(8px)',
    }}
  >
    {/* Animated logo mark */}
    <div className="relative mb-6 flex items-center justify-center">
      {/* Rotating ring */}
      <motion.div
        className="w-20 h-20 rounded-full border-2 border-transparent"
        style={{
          background: 'conic-gradient(rgba(92,184,92,0.8) 0deg, transparent 120deg, transparent 360deg)',
          borderRadius: '50%',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
      />

      {/* Inner brand mark */}
      <div
        className="absolute inset-3 rounded-full flex items-center justify-center"
        style={{
          background: 'rgba(6,20,6,0.9)',
          border: '1px solid rgba(92,184,92,0.2)',
        }}
      >
        <img
          src="/logo-mark.png"
          alt=""
          className="w-8 h-8 object-contain"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        {/* Fallback: "V" letter mark */}
        <span className="text-[#5cb85c] font-black text-lg absolute font-mono">V</span>
      </div>
    </div>

    {/* Brand text */}
    <motion.p
      className="text-white/30 text-[10px] tracking-[0.4em] uppercase font-bold"
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    >
      Vital Agro
    </motion.p>
  </div>
);
