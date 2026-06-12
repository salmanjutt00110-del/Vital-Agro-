'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const LOADING_MESSAGES = [
  'Initializing Systems...',
  'Loading Product Assets...',
  'Preparing Premium Experience...',
  'Almost Ready...',
];

export const TruckPreloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setExiting(true);
            setTimeout(onComplete, 600);
          }, 400);
          return 100;
        }
        // Realistic loading curve
        const increment = p < 40 ? 3 : p < 70 ? 1.5 : p < 90 ? 0.8 : 2;
        return Math.min(100, p + increment);
      });
    }, 60);

    // Cycle loading messages
    const msgInterval = setInterval(() => {
      setMsgIndex((i) => (i + 1) % LOADING_MESSAGES.length);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearInterval(msgInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[999] flex flex-col items-center justify-center select-none"
      style={{
        background: 'radial-gradient(ellipse 120% 100% at 50% 60%, #0d2a0d 0%, #061406 55%, #020c02 100%)',
      }}
      animate={exiting ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: 'easeIn' }}
    >
      {/* Ambient top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '60vw',
          height: '40vh',
          background: 'radial-gradient(ellipse, rgba(45,106,45,0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      {/* LOGO */}
      <motion.div
        className="mb-10 relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="p-5 rounded-[28px] relative"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(92,184,92,0.2)',
            boxShadow: '0 0 60px rgba(92,184,92,0.10), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img
            src="/logo.png"
            alt="Vital Agro"
            className="h-20 w-auto object-contain"
            style={{ filter: 'drop-shadow(0 0 16px rgba(92,184,92,0.25))' }}
          />
          {/* Logo corner glow */}
          <div
            className="absolute -inset-4 rounded-[40px] -z-10"
            style={{
              background: 'rgba(92,184,92,0.04)',
              filter: 'blur(16px)',
            }}
          />
        </motion.div>

        {/* Company name */}
        <motion.p
          className="text-center text-white/50 text-[10px] tracking-[0.3em] uppercase mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          ✦ Vital Agro Chemical Industries ✦
        </motion.p>
      </motion.div>

      {/* BIG TRUCK SCENE */}
      <div className="relative z-10 mb-8" style={{ width: 320, height: 120 }}>
        {/* Road surface */}
        <div
          className="absolute bottom-0 inset-x-0 h-[3px] rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(92,184,92,0.2), transparent)',
          }}
        >
          {/* Moving road dashes */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 h-full rounded-full"
              style={{
                width: 24,
                height: 3,
                background: 'rgba(92,184,92,0.35)',
              }}
              initial={{ x: 320 + i * 60 }}
              animate={{ x: -60 }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'linear',
              }}
            />
          ))}
        </div>

        {/* TRUCK SVG — Large, detailed */}
        <motion.div
          className="absolute bottom-[3px]"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="200" height="90" viewBox="0 0 200 90" fill="none">
            {/* === TRAILER === */}
            {/* Trailer body */}
            <rect
              x="0"
              y="20"
              width="118"
              height="52"
              rx="5"
              fill="#0d2a0d"
              stroke="rgba(92,184,92,0.35)"
              strokeWidth="1"
            />
            {/* Trailer inner */}
            <rect x="3" y="23" width="112" height="46" rx="3" fill="rgba(92,184,92,0.06)" />
            {/* VITAL text on trailer */}
            <rect
              x="20"
              y="33"
              width="78"
              height="26"
              rx="4"
              fill="rgba(92,184,92,0.12)"
              stroke="rgba(92,184,92,0.25)"
              strokeWidth="0.5"
            />
            <text
              x="59"
              y="51"
              textAnchor="middle"
              fill="#5cb85c"
              fontSize="10"
              fontWeight="800"
              fontFamily="Arial, sans-serif"
              letterSpacing="2"
            >
              VITAL AGRO
            </text>
            {/* Trailer bottom detail */}
            <rect x="0" y="68" width="118" height="4" rx="2" fill="rgba(92,184,92,0.1)" />
            {/* Trailer connector */}
            <rect x="114" y="35" width="12" height="15" rx="2" fill="#1a4a1a" />

            {/* === CAB === */}
            {/* Cab body */}
            <rect
              x="122"
              y="28"
              width="68"
              height="44"
              rx="6"
              fill="#1a4a1a"
              stroke="rgba(92,184,92,0.4)"
              strokeWidth="1"
            />
            {/* Cab top curve */}
            <path
              d="M128 28 Q160 16 186 28"
              fill="#1e5c1e"
              stroke="rgba(92,184,92,0.3)"
              strokeWidth="0.5"
            />
            {/* Windshield */}
            <rect
              x="154"
              y="31"
              width="30"
              height="22"
              rx="3"
              fill="rgba(92,184,92,0.2)"
              stroke="rgba(92,184,92,0.5)"
              strokeWidth="0.5"
            />
            {/* Windshield glare */}
            <line x1="156" y1="33" x2="162" y2="51" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            {/* Side window */}
            <rect
              x="130"
              y="33"
              width="20"
              height="16"
              rx="2"
              fill="rgba(92,184,92,0.15)"
              stroke="rgba(92,184,92,0.3)"
              strokeWidth="0.5"
            />
            {/* Door line */}
            <line x1="148" y1="30" x2="148" y2="72" stroke="rgba(92,184,92,0.2)" strokeWidth="0.5" />
            {/* Door handle */}
            <rect x="140" y="52" width="6" height="2" rx="1" fill="rgba(92,184,92,0.5)" />
            {/* Headlight */}
            <circle
              cx="193"
              cy="48"
              r="5"
              fill="rgba(92,184,92,0.8)"
              style={{ filter: 'drop-shadow(0 0 8px rgba(92,184,92,1))' }}
            />
            <circle cx="193" cy="48" r="3" fill="#5cb85c" />
            {/* Exhaust pipe */}
            <rect
              x="155"
              y="15"
              width="5"
              height="14"
              rx="2.5"
              fill="#1a3a1a"
              stroke="rgba(92,184,92,0.2)"
              strokeWidth="0.5"
            />

            {/* === EXHAUST SMOKE === */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx="158"
                cy="14"
                r={3 + i * 2}
                fill="rgba(92,184,92,0.12)"
                initial={{ cy: 14, opacity: 0.5, r: 3 }}
                animate={{ cy: 14 - 20 - i * 8, opacity: 0, r: 10 + i * 4 }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.35,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* === WHEELS === */}
            {/* Trailer front wheel */}
            <circle cx="28" cy="75" r="14" fill="#0a1f0a" stroke="rgba(92,184,92,0.4)" strokeWidth="1.5" />
            <circle cx="28" cy="75" r="8" fill="#0d2a0d" stroke="rgba(92,184,92,0.3)" strokeWidth="1" />
            <circle cx="28" cy="75" r="4" fill="#1a4a1a" stroke="rgba(92,184,92,0.5)" strokeWidth="0.5" />
            <circle
              cx="28"
              cy="75"
              r="2"
              fill="#5cb85c"
              style={{ filter: 'drop-shadow(0 0 4px rgba(92,184,92,0.8))' }}
            />

            {/* Trailer rear wheel */}
            <circle cx="88" cy="75" r="14" fill="#0a1f0a" stroke="rgba(92,184,92,0.4)" strokeWidth="1.5" />
            <circle cx="88" cy="75" r="8" fill="#0d2a0d" stroke="rgba(92,184,92,0.3)" strokeWidth="1" />
            <circle cx="88" cy="75" r="4" fill="#1a4a1a" stroke="rgba(92,184,92,0.5)" strokeWidth="0.5" />
            <circle
              cx="88"
              cy="75"
              r="2"
              fill="#5cb85c"
              style={{ filter: 'drop-shadow(0 0 4px rgba(92,184,92,0.8))' }}
            />

            {/* Cab wheel */}
            <circle cx="160" cy="75" r="14" fill="#0a1f0a" stroke="rgba(92,184,92,0.4)" strokeWidth="1.5" />
            <circle cx="160" cy="75" r="8" fill="#0d2a0d" stroke="rgba(92,184,92,0.3)" strokeWidth="1" />
            <circle cx="160" cy="75" r="4" fill="#1a4a1a" stroke="rgba(92,184,92,0.5)" strokeWidth="0.5" />
            <circle
              cx="160"
              cy="75"
              r="2"
              fill="#5cb85c"
              style={{ filter: 'drop-shadow(0 0 4px rgba(92,184,92,0.8))' }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Progress */}
      <motion.div
        className="relative z-10 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Percentage */}
        <motion.p
          className="font-black text-5xl font-mono"
          style={{
            color: '#5cb85c',
            textShadow: '0 0 30px rgba(92,184,92,0.5)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {Math.round(progress)}%
        </motion.p>

        {/* Bar */}
        <div style={{ width: 280, height: 3, borderRadius: 99, background: 'rgba(255,255,255,0.07)' }}>
          <motion.div
            style={{
              height: '100%',
              borderRadius: 99,
              background: 'linear-gradient(90deg, #1a5c1a, #5cb85c)',
              boxShadow: '0 0 12px rgba(92,184,92,0.6)',
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>

        {/* Cycling message */}
        <motion.p
          key={msgIndex}
          className="text-white/30 text-xs tracking-widest font-semibold"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
        >
          {LOADING_MESSAGES[msgIndex]}
        </motion.p>
      </motion.div>

      {/* Bottom vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 45%, rgba(2,12,2,0.7) 100%)',
        }}
      />
    </motion.div>
  );
};
