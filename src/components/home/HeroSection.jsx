import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import useVideoAutoplay from '@/hooks/useVideoAutoplay';

// Import Assets properly via React
import vitalBg from '@/assets/vital bg.mp4';
import vitalAgroLogo from '@/assets/vital agro logo.webp';
import fatty from '@/assets/fatty.webp';
import super4g from '@/assets/super-4g.webp';
import aaqaab from '@/assets/Aaqaab.webp';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.15 } },
};

const wordVariant = {
  initial: { opacity: 0, y: 60, rotateX: -40 },
  animate: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroSection() {
  const { t } = useLanguage();
  const videoRef = useRef(null);
  useVideoAutoplay(videoRef);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background looping video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-70"
          style={{ objectFit: 'cover', transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}
        >
          <source src={vitalBg} type="video/mp4" />
        </video>
        {/* Dark Green Gradient Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#0A2E1F]/95 via-[#0A2E1F]/80 to-[#0A2E1F]/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E1F]/75 via-transparent to-transparent" />
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10 z-0">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-full bg-gradient-to-r from-transparent via-[#76C945] to-transparent"
            style={{ top: `${20 + i * 15}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, delay: i * 0.4 + 0.5, ease: 'easeInOut', repeat: Infinity, repeatDelay: 5 }}
          />
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${5 + i * 8}%`,
              top: `${15 + (i % 5) * 15}%`,
              width: i % 3 === 0 ? 8 : i % 3 === 1 ? 4 : 6,
              height: i % 3 === 0 ? 8 : i % 3 === 1 ? 4 : 6,
              background: i % 2 === 0 ? 'rgba(118,201,69,0.4)' : 'rgba(197,160,89,0.3)',
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-5, 5, -5],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 4 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            {/* Badge with Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-3.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-sm mb-8"
            >
              <div className="bg-white/20 rounded-md px-1.5 py-0.5">
                <img
                  src={vitalAgroLogo}
                  alt="Vital Agro Logo"
                  className="h-5 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                />
              </div>
              <span className="h-4 w-px bg-white/20" />
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="flex items-center"
              >
                <Leaf className="w-4 h-4 text-[#76C945]" />
              </motion.div>
              <span>{t.hero.badge}</span>
            </motion.div>

            {/* Animated Heading */}
            <div className="mb-6" style={{ perspective: '1000px' }}>
              <motion.div variants={staggerContainer} initial="initial" animate="animate">
                <div className="overflow-hidden">
                  <motion.div variants={wordVariant} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight">
                    {t.hero.heading1}
                  </motion.div>
                </div>
                <div className="overflow-hidden">
                  <motion.div variants={wordVariant} className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#76C945] to-[#C5A059]">
                      {t.hero.heading2}
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Sub */}
            <motion.p
              {...fadeUp(0.7)}
              className="text-lg sm:text-xl text-white/70 max-w-lg mb-10 leading-relaxed"
            >
              {t.hero.sub}
            </motion.p>

            {/* Buttons */}
            <motion.div {...fadeUp(0.9)} className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/products"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-[#76C945] text-[#0A2E1F] font-bold rounded-full hover:bg-[#8AD65A] transition-all shadow-xl shadow-[#76C945]/25 text-sm"
                >
                  {t.hero.explore}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-bold rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all text-sm"
                >
                  {t.hero.dealer}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="https://wa.me/923011837160"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-4 bg-green-500/20 text-green-300 font-bold rounded-full backdrop-blur-md border border-green-500/30 hover:bg-green-500/30 transition-all text-sm"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  {t.hero.whatsapp}
                </a>
              </motion.div>
            </motion.div>

            {/* Stats mini bar */}
            <motion.div
              {...fadeUp(1.1)}
              className="flex gap-8 mt-12 pt-8 border-t border-white/10"
            >
              {[['15+', t.hero.years], ['200+', t.hero.products], ['50K+', t.hero.farmers]].map(([num, label], i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.15 }}
                >
                  <div className="text-2xl font-extrabold text-[#76C945]">{num}</div>
                  <div className="text-xs text-white/50 mt-0.5">{label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right side - floating products */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-center items-center relative"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 rounded-full animate-pulse"
                style={{ background: 'radial-gradient(circle, rgba(118,201,69,0.2) 0%, transparent 70%)' }}
              />
              
              {/* Main Product Card - Fatty */}
              <Link to="/products/fatty">
                <motion.div
                  className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-white/20 shadow-2xl flex flex-col items-center w-[210px] h-[310px] justify-between cursor-pointer hover:shadow-[#76C945]/10 hover:border-[#76C945]/30 transition-all duration-350"
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex-1 flex items-center justify-center p-2">
                    <img
                      src={fatty}
                      alt="Fatty Product"
                      className="h-52 w-auto object-contain"
                    />
                  </div>
                  <span className="text-[#0A2E1F] font-bold text-xs bg-[#76C945]/20 px-3 py-1 rounded-full border border-[#76C945]/30 mt-2">
                    Fatty
                  </span>
                </motion.div>
              </Link>
              
              {/* Secondary Product Card (Right) - Super 4G */}
              <Link to="/products/super-4g">
                <motion.div
                  className="absolute -right-10 -top-4 z-0 bg-white/90 backdrop-blur-sm rounded-2xl p-3 border border-white/10 shadow-xl flex flex-col items-center w-[120px] h-[170px] justify-between cursor-pointer hover:shadow-[#76C945]/10 hover:border-[#76C945]/30 transition-all duration-350"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0, y: [5, -10, 5] }}
                  transition={{ opacity: { duration: 0.8, delay: 1.2 }, y: { duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 } }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex-1 flex items-center justify-center p-1">
                    <img
                      src={super4g}
                      alt="Super 4G"
                      className="h-28 w-auto object-contain"
                    />
                  </div>
                  <span className="text-[#0A2E1F] font-bold text-[10px] bg-[#C5A059]/20 px-2.5 py-0.5 rounded-full mt-1">
                    Super 4G
                  </span>
                </motion.div>
              </Link>
              
              {/* Third Product Card (Left) - AAQAAB */}
              <Link to="/products/aaqaab">
                <motion.div
                  className="absolute -left-10 bottom-4 z-20 bg-white/90 backdrop-blur-sm rounded-2xl p-3 border border-white/10 shadow-xl flex flex-col items-center w-[120px] h-[170px] justify-between cursor-pointer hover:shadow-[#76C945]/10 hover:border-[#76C945]/30 transition-all duration-350"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0, y: [-8, 12, -8] }}
                  transition={{ opacity: { duration: 0.8, delay: 1.4 }, y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 } }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex-1 flex items-center justify-center p-1">
                    <img
                      src={aaqaab}
                      alt="AAQAAB"
                      className="h-28 w-auto object-contain"
                    />
                  </div>
                  <span className="text-[#0A2E1F] font-bold text-[10px] bg-[#C5A059]/20 px-2.5 py-0.5 rounded-full mt-1">
                    AAQAAB
                  </span>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path d="M0 120L48 108C96 96 192 72 288 60C384 48 480 48 576 54C672 60 768 72 864 78C960 84 1056 84 1152 78C1248 72 1344 60 1392 54L1440 48V120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
}