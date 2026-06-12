import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';
import HeroParticles from './HeroParticles';
import vitalBg from '@/assets/vital bg.mp4';
import vitalBgWebm from '@/assets/vital_bg.webm';
import vitalBgPoster from '@/assets/vital_bg_poster.webp';

export default function HeroBackground({ videoRef }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
      {/* Layer 1: Background video (only rendered on desktop for performance) */}
      {!isMobile ? (
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
      ) : (
        <img
          src={vitalBgPoster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-70 z-0"
          style={{ objectFit: 'cover' }}
        />
      )}

      {/* Layer 2: Animated gradient overlay — dark brand green for text readability */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[#031405]/95 via-[#031405]/80 to-[#031405]/20 lg:from-[#031405]/98 lg:via-[#031405]/85 lg:to-transparent z-[1]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Layer 3: Radial glow pulse at focal point */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E1F]/75 via-transparent to-transparent z-[2]" />

      {/* Layer 4: Noise/grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-[3] pointer-events-none noise-bg" />

      {/* Layer 4.5: Ambient Canvas Particles */}
      <HeroParticles />

      {/* Layer 5: Three.js canvas (only visible on desktop) */}
      <div className="absolute inset-0 z-[4]">
        <HeroCanvas />
      </div>
    </div>
  );
}
