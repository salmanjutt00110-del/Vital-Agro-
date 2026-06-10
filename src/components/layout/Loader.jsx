import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf } from 'lucide-react';
import vitalAgroLogo from '@/assets/vital agro logo.webp';

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2000; // 2 seconds loader
    const interval = 20;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 400); // Small pause at 100%
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0A2E1F] flex flex-col items-center justify-center overflow-hidden">
      {/* Soft central ambient glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#76C945]/10 blur-[120px] pointer-events-none" />

      {/* Floating Animated Leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#76C945]/20"
            style={{
              left: `${15 + i * 14}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
              opacity: [0.15, 0.35, 0.15]
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          >
            <Leaf className="w-10 h-10 transform -rotate-45" />
          </motion.div>
        ))}
      </div>

      {/* Center Logo Cluster */}
      <div className="relative z-10 flex flex-col items-center max-w-xs px-6">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl flex items-center justify-center mb-8 group"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#76C945]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
          <img
            src={vitalAgroLogo}
            alt="Vital Agro Logo"
            className="h-20 sm:h-24 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.45)]"
          />
        </motion.div>

        {/* Brand Text */}
        <motion.h2
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 0.9 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-white text-xs font-black tracking-widest uppercase text-center mb-6"
        >
          Vital Agro Chemical Industries
        </motion.h2>

        {/* Counter Percentage */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-black text-[#76C945] mb-2 font-mono tracking-wider"
        >
          {Math.floor(progress)}%
        </motion.span>

        {/* Progress Bar Container */}
        <div className="w-48 h-1.5 bg-white/10 border border-white/5 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-[#76C945] to-[#8AD65A] rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
