import React from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';
import vitalBg from '@/assets/vital bg.mp4';
import vitalBgWebm from '@/assets/vital_bg.webm';
import vitalBgPoster from '@/assets/vital_bg_poster.webp';

export default function HeroBackground({ videoRef }) {
  return (
    <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
      {/* Layer 1: Existing background video (untouched) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={vitalBgPoster}
        className="absolute inset-0 w-full h-full object-cover opacity-70 z-0"
        style={{ objectFit: 'cover', transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}
      >
        <source src={vitalBgWebm} type="video/webm" />
        <source src={vitalBg} type="video/mp4" />
      </video>

      {/* Layer 2: Animated gradient overlay — slow 8s shift */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#0A2E1F]/95 via-[#0A2E1F]/80 to-[#0A2E1F]/40 z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Layer 3: Radial glow pulse at focal point */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E1F]/75 via-transparent to-transparent z-[2]" />

      {/* Layer 4: Noise/grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-[3] pointer-events-none noise-bg" />

      {/* Layer 5: Three.js canvas */}
      <div className="absolute inset-0 z-[4]">
        <HeroCanvas />
      </div>
    </div>
  );
}
