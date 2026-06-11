import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Helper: sleep
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

const OrderConfirmButton = ({ onConfirm, onValidate, onComplete, disabled }) => {
  const [state, setState] = useState('idle'); // 'idle' | 'packing' | 'shipping' | 'placed'

  const handleClick = async (e) => {
    if (e) e.preventDefault();
    if (state !== 'idle' || disabled) return;

    // Run form validation first
    if (onValidate && !onValidate()) {
      return;
    }

    // STATE 2: Packing — bag flies in
    setState('packing');
    await sleep(900);

    // STATE 3: Shipping — truck drives through
    setState('shipping');
    
    // Call the actual order function (Firebase save + WhatsApp URL redirection)
    const orderPromise = onConfirm();
    await sleep(1400);

    try {
      await orderPromise;
    } catch (err) {
      console.error("WhatsApp order dispatch error:", err);
    }

    // STATE 4: Order Placed — neon glow success
    setState('placed');
    await sleep(2000);

    // Reset states and close bottom sheets
    if (onComplete) {
      onComplete();
    }
    setState('idle');
  };

  return (
    <div className="relative flex items-center justify-center w-full select-none">
      <AnimatePresence mode="wait">

        {/* STATE 1 — IDLE BUTTON */}
        {state === 'idle' && (
          <motion.button
            key="idle"
            onClick={handleClick}
            disabled={disabled}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="relative w-full h-[56px] rounded-full overflow-hidden
              font-bold text-base text-white
              bg-gradient-to-r from-[#1e5c1e] via-[#2d7a2d] to-[#1e5c1e]
              border border-[rgba(92,184,92,0.4)]
              disabled:opacity-40 disabled:cursor-not-allowed
              flex items-center justify-center"
            style={{
              boxShadow: '0 0 30px rgba(92,184,92,0.25), inset 0 1px 0 rgba(255,255,255,0.1)',
              WebkitTapHighlightColor: 'transparent',
              touchAction: 'manipulation'
            }}
          >
            {/* Shimmer effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r
                from-transparent via-white/10 to-transparent
                -skew-x-12"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
            />
            <span className="relative flex items-center justify-center gap-2">
              {/* WhatsApp icon */}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.113 1.527 5.84L.057 23.886l6.235-1.635A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.368l-.359-.214-3.722.977.993-3.629-.234-.372A9.784 9.784 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182 17.42 2.182 21.818 6.58 21.818 12c0 5.42-4.398 9.818-9.818 9.818z"/>
              </svg>
              Send Order on WhatsApp
            </span>
          </motion.button>
        )}

        {/* STATE 2 — PACKING (bag enters from left) */}
        {state === 'packing' && (
          <motion.div
            key="packing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-[56px] rounded-full overflow-hidden
              border border-[rgba(92,184,92,0.3)] flex items-center"
            style={{
              background: 'rgba(10, 30, 10, 0.9)',
              boxShadow: '0 0 20px rgba(92,184,92,0.15)',
            }}
          >
            {/* Progress track fill */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ background: 'rgba(45,106,45,0.3)' }}
              initial={{ width: '0%' }}
              animate={{ width: '45%' }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
            />

            {/* Shopping bag icon entering from left */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2"
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 28, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <ShoppingBagIcon size={28} color="#5cb85c" />
            </motion.div>

            {/* "Preparing order..." label */}
            <motion.span
              className="absolute right-5 top-1/2 -translate-y-1/2
                text-white/50 text-xs font-medium tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Preparing...
            </motion.span>
          </motion.div>
        )}

        {/* STATE 3 — SHIPPING (truck drives through with neon glow) */}
        {state === 'shipping' && (
          <motion.div
            key="shipping"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-[56px] rounded-full overflow-hidden border flex items-center"
            style={{
              background: 'rgba(8, 20, 8, 0.95)',
              borderColor: 'rgba(92, 184, 92, 0.6)',
              boxShadow: `
                0 0 20px rgba(92,184,92,0.4),
                0 0 60px rgba(92,184,92,0.15),
                inset 0 0 20px rgba(92,184,92,0.05)
              `,
            }}
          >
            {/* Neon border pulse animation */}
            <NeonBorderPulse color="#5cb85c" />

            {/* Road dashes */}
            <div className="absolute bottom-3 left-0 right-0 flex items-center px-4">
              <RoadDashes />
            </div>

            {/* Truck entering from right, driving left */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2"
              initial={{ x: '120%' }}
              animate={{ x: '15%' }}
              transition={{
                duration: 1.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <div className="relative">
                {/* Speed lines behind truck */}
                <SpeedLines />
                <TruckIcon size={36} color="#5cb85c" />
              </div>
            </motion.div>

            {/* "On the way!" label */}
            <motion.span
              className="absolute right-5 top-1/2 -translate-y-1/2
                text-[#5cb85c] text-xs font-bold tracking-wider"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              On the way!
            </motion.span>
          </motion.div>
        )}

        {/* STATE 4 — ORDER PLACED (neon glow success) */}
        {state === 'placed' && (
          <motion.div
            key="placed"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="relative w-full"
          >
            {/* Particle burst */}
            <ParticleBurst color="#5cb85c" />

            {/* Main success button */}
            <div
              className="relative w-full h-[56px] rounded-full
                flex items-center justify-center
                border-2 overflow-hidden"
              style={{
                background: 'rgba(8, 20, 8, 0.95)',
                borderColor: '#5cb85c',
                boxShadow: `
                  0 0 30px rgba(92,184,92,0.7),
                  0 0 80px rgba(92,184,92,0.3),
                  0 0 120px rgba(92,184,92,0.15),
                  inset 0 0 30px rgba(92,184,92,0.08)
                `,
              }}
            >
              {/* Neon border animated trace */}
              <NeonBorderTrace color="#5cb85c" />

              {/* Text */}
              <motion.span
                className="relative z-10 font-bold tracking-[0.15em] text-sm"
                style={{
                  color: '#5cb85c',
                  textShadow: '0 0 20px rgba(92,184,92,0.8)',
                }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
              >
                ✓ ORDER PLACED
              </motion.span>
            </div>

            {/* Ambient glow behind */}
            <motion.div
              className="absolute inset-0 -z-10 rounded-full blur-2xl"
              style={{ background: 'rgba(92,184,92,0.2)' }}
              animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.3, 0.6] }}
              transition={{ duration: 1.5, repeat: 2 }}
            />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

// Sub-Components
const TruckIcon = ({ size = 32, color = '#5cb85c' }) => (
  <svg width={size} height={size} viewBox="0 0 64 40" fill="none">
    {/* Truck body */}
    <rect x="2" y="8" width="38" height="24" rx="3" fill={color} />
    {/* Cab */}
    <rect x="40" y="14" width="20" height="18" rx="3" fill={color} />
    {/* Windshield */}
    <rect x="42" y="16" width="14" height="10" rx="2" fill="rgba(0,0,0,0.4)" />
    {/* Wheels */}
    <circle cx="12" cy="34" r="6" fill="rgba(0,0,0,0.8)" />
    <circle cx="12" cy="34" r="3" fill={color} />
    <circle cx="48" cy="34" r="6" fill="rgba(0,0,0,0.8)" />
    <circle cx="48" cy="34" r="3" fill={color} />
  </svg>
);

const ShoppingBagIcon = ({ size = 28, color = '#5cb85c' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M6 2 3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6" stroke="rgba(0,0,0,0.3)" strokeWidth="1"/>
    <path d="M16 10a4 4 0 01-8 0" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5"/>
  </svg>
);

const SpeedLines = () => (
  <div className="absolute right-full top-1/2 -translate-y-1/2 pr-2 flex flex-col gap-1">
    {[16, 12, 8].map((w, i) => (
      <motion.div
        key={i}
        className="rounded-full"
        style={{
          width: w,
          height: 2,
          background: 'rgba(92,184,92,0.5)',
          marginLeft: i * 4,
        }}
        animate={{ opacity: [0.7, 0.2, 0.7], scaleX: [1, 0.6, 1] }}
        transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
      />
    ))}
  </div>
);

const RoadDashes = () => (
  <div className="w-full flex gap-3 items-center">
    {Array.from({ length: 8 }).map((_, i) => (
      <motion.div
        key={i}
        className="h-[2px] flex-1 rounded-full"
        style={{ background: 'rgba(92,184,92,0.2)' }}
        animate={{ opacity: [0.2, 0.6, 0.2] }}
        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.06 }}
      />
    ))}
  </div>
);

const NeonBorderPulse = ({ color }) => (
  <motion.div
    className="absolute inset-0 rounded-full pointer-events-none"
    style={{ border: `2px solid ${color}` }}
    animate={{
      boxShadow: [
        `0 0 10px ${color}60, inset 0 0 10px ${color}20`,
        `0 0 30px ${color}90, inset 0 0 20px ${color}30`,
        `0 0 10px ${color}60, inset 0 0 10px ${color}20`,
      ],
    }}
    transition={{ duration: 0.8, repeat: Infinity }}
  />
);

const NeonBorderTrace = ({ color }) => (
  <motion.div
    className="absolute inset-0 rounded-full pointer-events-none overflow-hidden"
  >
    <motion.div
      className="absolute inset-[-2px] rounded-full"
      style={{
        background: `conic-gradient(${color} 0deg, transparent 60deg, transparent 360deg)`,
        filter: 'blur(4px)',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
    />
  </motion.div>
);

const ParticleBurst = ({ color }) => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    angle: i * 30,
    distance: 50 + Math.random() * 30,
    size: 3 + Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: color,
            boxShadow: `0 0 6px ${color}`,
          }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
            opacity: 0,
            scale: 0,
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}
    </div>
  );
};

export default OrderConfirmButton;
