import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';

import PreloaderBackground from './PreloaderBackground';
import PreloaderParticles from './PreloaderParticles';
import PreloaderLogo from './PreloaderLogo';
import PreloaderText from './PreloaderText';
import PreloaderProgress from './PreloaderProgress';

// Import assets for actual background disk caching
import vitalAgroLogo from '@/assets/vital agro logo.webp';
import fatty from '@/assets/fatty.webp';
import super4g from '@/assets/super-4g.webp';
import aaqaab from '@/assets/Aaqaab.webp';
import vitalBgWebm from '@/assets/vital_bg.webm';

const STATUS_MESSAGES = {
  en: [
    "Preparing Premium Agricultural Experience...",
    "Loading Product Assets...",
    "Optimizing Product Images...",
    "Initializing Product Database...",
    "Loading Product Categories...",
    "Preparing Glass Interface...",
    "Optimizing Performance...",
    "Loading Hero Video...",
    "Connecting Smart WhatsApp...",
    "Finalizing Experience...",
    "Almost Ready..."
  ],
  ur: [
    "اعلیٰ زرعی تجربہ تیار کیا جا رہا ہے...",
    "مصنوعات کے اثاثے لوڈ ہو رہے ہیں...",
    "مصنوعات کی تصاویر کو بہتر بنایا جا رہا ہے...",
    "پروڈکٹ ڈیٹا بیس شروع کیا جا رہا ہے...",
    "مصنوعات کے زمرے لوڈ ہو رہے ہیں...",
    "گلاس انٹرفیس تیار کیا جا رہا ہے...",
    "کارکردگی کو بہتر بنایا جا رہا ہے...",
    "ہیرو ویڈیو لوڈ ہو رہی ہے...",
    "سمارٹ واٹس ایپ منسلک ہو رہا ہے...",
    "زرعی تجربہ حتمی مراحل میں ہے...",
    "بس تیار ہے..."
  ]
};

export default function Preloader({ onFinish }) {
  const { lang } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isExiting, setIsExiting] = useState(false);

  // Mouse Parallax movement tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      const xc = window.innerWidth / 2;
      const yc = window.innerHeight / 2;
      const x = (e.clientX - xc) / xc; // Range: [-1, 1]
      const y = (e.clientY - yc) / yc; // Range: [-1, 1]
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Status messages rotation
  useEffect(() => {
    const list = STATUS_MESSAGES[lang] || STATUS_MESSAGES.en;
    const interval = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % list.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [lang]);

  // Preloading routine
  useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();
    
    const preloadResources = async () => {
      if (isMounted) setTargetProgress(15);

      // Preload Fonts
      try {
        await document.fonts.ready;
      } catch (e) {
        console.warn("Fonts loading bypassed", e);
      }
      if (isMounted) setTargetProgress(35);

      // Preload Images
      try {
        const imageAssets = [vitalAgroLogo, fatty, super4g, aaqaab];
        await Promise.all(
          imageAssets.map((src) => {
            return new Promise((resolve) => {
              const img = new Image();
              img.src = src;
              img.onload = () => resolve(true);
              img.onerror = () => resolve(false);
            });
          })
        );
      } catch (e) {
        console.warn("Images preloading error", e);
      }
      if (isMounted) setTargetProgress(65);

      // Preload WebM Video
      try {
        const response = await fetch(vitalBgWebm);
        if (response.ok) {
          await response.blob();
        }
      } catch (e) {
        console.warn("Video preloading error", e);
      }
      if (isMounted) setTargetProgress(90);

      // Minimum visual time of 3.0s to let animations breath (strictly 2-5s range)
      const elapsed = Date.now() - startTime;
      const delay = Math.max(200, 3000 - elapsed);
      setTimeout(() => {
        if (isMounted) setTargetProgress(100);
      }, delay);
    };

    preloadResources();

    // Safety fallback of 5 seconds
    const safetyTimeout = setTimeout(() => {
      if (isMounted) setTargetProgress(100);
    }, 5000);

    return () => {
      isMounted = false;
      clearTimeout(safetyTimeout);
    };
  }, []);

  // Linear interpolation progress ticker
  useEffect(() => {
    let animId;
    const tick = () => {
      setProgress((prev) => {
        if (prev < targetProgress) {
          const diff = targetProgress - prev;
          const step = Math.max(0.4, diff * 0.08);
          const next = prev + step;
          return next >= 100 ? 100 : next;
        }
        return prev;
      });
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [targetProgress]);

  // Handle final reveal exit timing
  useEffect(() => {
    if (progress >= 100) {
      setIsExiting(true);
      const exitTimer = setTimeout(() => {
        if (onFinish) onFinish();
      }, 800);
      return () => clearTimeout(exitTimer);
    }
  }, [progress, onFinish]);

  const messagesList = STATUS_MESSAGES[lang] || STATUS_MESSAGES.en;
  const currentMsg = messagesList[statusIdx];

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={isExiting ? {
        opacity: 0,
        transition: { duration: 0.6, delay: 0.2, ease: 'easeIn' }
      } : {}}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden font-body"
    >
      {/* Base background color & gradients */}
      <PreloaderBackground />

      {/* GPU particle canvas */}
      <PreloaderParticles />

      {/* Center Layout Container */}
      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center select-none">
        
        {/* Parallax glass card */}
        <PreloaderLogo mousePos={mousePos} isExiting={isExiting} />

        {/* Character stagger title */}
        <PreloaderText isExiting={isExiting} />

        {/* Progress track & counter */}
        <PreloaderProgress value={progress} statusMsg={currentMsg} isExiting={isExiting} />

      </div>
    </motion.div>
  );
}
