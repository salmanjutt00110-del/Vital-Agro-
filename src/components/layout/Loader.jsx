import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import vitalAgroLogo from '@/assets/vital agro logo.webp';

export default function Loader({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // 2-second preloader duration + 300ms pause for smooth layout transitions
    const duration = 2000; 
    const interval = 20;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            if (onFinish) onFinish();
          }, 300);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] bg-[#02170f] flex flex-col items-center justify-center overflow-hidden">
      
      {/* 1. Aurora Gradient Backdrop */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute -top-[20%] -left-[20%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-[#76C945]/15 to-transparent blur-[140px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-[20%] -right-[20%] w-[60%] h-[60%] rounded-full bg-gradient-to-bl from-[#C5A059]/10 to-transparent blur-[140px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-[#76C945]/8 blur-[100px] pointer-events-none" />
      </div>

      {/* 2. Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#76C945]/30"
            style={{
              left: `${10 + (i * 4.5)}%`,
              bottom: `-20px`,
              width: `${(i % 3 === 0) ? 4 : (i % 3 === 1) ? 2 : 3}px`,
              height: `${(i % 3 === 0) ? 4 : (i % 3 === 1) ? 2 : 3}px`,
            }}
            animate={{
              y: ['0vh', '-120vh'],
              opacity: [0, 0.9, 0],
              x: [0, Math.sin(i) * 40, 0],
            }}
            transition={{
              duration: 4 + (i % 3) * 2,
              repeat: Infinity,
              ease: "linear",
              delay: (i * 0.15),
            }}
          />
        ))}
      </div>

      {/* 3. Floating Animated Leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-5">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#76C945]/15"
            style={{
              left: `${10 + i * 11}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              x: [-10, 10, -10],
              rotate: [0, 360],
              scale: [0.75, 1.1, 0.75],
              opacity: [0.1, 0.25, 0.1]
            }}
            transition={{
              duration: 5 + i * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3
            }}
          >
            <Leaf className="w-8 h-8 transform -rotate-45" />
          </motion.div>
        ))}
      </div>

      {/* 4. Glassmorphic Preloader Core */}
      <div className="relative z-10 flex flex-col items-center max-w-sm px-6">
        
        {/* Logo Frosted Glass Card Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-white/[0.02] backdrop-blur-2xl border border-white/[0.08] p-8 rounded-[2rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] flex items-center justify-center mb-8 group overflow-hidden"
        >
          {/* Edge gloss sheen effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] to-transparent pointer-events-none" />
          
          <motion.div
            animate={{
              scale: [1, 1.04, 1],
              opacity: [0.95, 1, 0.95],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative z-10"
          >
            <img
              src={vitalAgroLogo}
              alt="Vital Agro Logo"
              className="h-20 sm:h-24 w-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            />
          </motion.div>
        </motion.div>

        {/* Brand Text */}
        <motion.h2
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 0.8 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-white text-xs font-black tracking-[0.25em] uppercase text-center mb-8 font-heading"
        >
          Vital Agro Chemical Industries
        </motion.h2>

        {/* Loading Progress Group */}
        <div className="flex flex-col items-center">
          
          {/* Animated Counter Percentage */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-black text-[#76C945] mb-3 font-mono tracking-wider"
          >
            {Math.floor(progress)}%
          </motion.span>

          {/* Luxury Progress Bar */}
          <div className="w-56 h-[3px] bg-white/[0.08] border border-white/[0.03] rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-[#76C945] via-[#8AD65A] to-[#76C945] rounded-full relative"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            >
              {/* Inner glowing pulse */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
            </motion.div>
          </div>
        </div>

      </div>
    </div>
  );
}
