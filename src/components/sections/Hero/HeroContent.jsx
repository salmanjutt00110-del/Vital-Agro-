import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import PremiumButton from '@/components/ui/PremiumButton';
import CountUp from '@/components/ui/CountUp';
import AnimatedText from '@/components/ui/AnimatedText';
import useParallax from '@/hooks/useParallax';

import vitalAgroLogo from '@/assets/vital agro logo.webp';
import fatty from '@/assets/fatty.webp';
import super4g from '@/assets/super-4g.webp';
import aaqaab from '@/assets/Aaqaab.webp';

export default function HeroContent() {
  const { t } = useLanguage();

  const parallaxCentral = useParallax(0.02);
  const parallaxRight = useParallax(0.04);
  const parallaxLeft = useParallax(-0.035);

  const whatsappText = encodeURIComponent("Hello Vital Agro,\n\nI am interested in your agricultural products and solutions. Please provide more details.\n\nThank you.");
  const whatsappUrl = `https://wa.me/923011837160?text=${whatsappText}`;

  const containerReveal = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const itemReveal = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pt-32 lg:pb-24 w-full">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Typography & Actions */}
        <motion.div
          variants={containerReveal}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Tagline Badge */}
          <motion.div
            variants={itemReveal}
            className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-xs sm:text-sm mb-4 lg:mb-8"
          >
            <div className="bg-white/20 rounded-md px-1.5 py-0.5">
              <img
                src={vitalAgroLogo}
                alt="Vital Agro Logo"
                width="80"
                height="20"
                loading="eager"
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
 
          {/* Large Clip Reveal Heading */}
          <h1 className="mb-4 lg:mb-6 tracking-tight">
            <AnimatedText
              text={t.hero.heading1}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight block"
            />
            <AnimatedText
              text={t.hero.heading2}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight block text-transparent bg-clip-text bg-gradient-to-r from-[#76C945] to-[#C5A059]"
              delay={0.2}
            />
          </h1>
 
          {/* Subheading */}
          <motion.p
            variants={itemReveal}
            className="text-base sm:text-lg lg:text-xl text-white/70 max-w-lg mb-6 lg:mb-10 leading-relaxed mx-auto lg:mx-0"
          >
            {t.hero.sub}
          </motion.p>
 
          {/* Buttons CTA Group */}
          <motion.div variants={itemReveal} className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
            <PremiumButton variant="primary" href="/products" isMagnetic={true}>
              {t.hero.explore}
            </PremiumButton>
            <PremiumButton variant="secondary" href="/contact" isMagnetic={true} showArrow={false}>
              {t.hero.dealer}
            </PremiumButton>
            <PremiumButton variant="whatsapp" href={whatsappUrl} target="_blank" rel="noopener noreferrer" isMagnetic={true} showArrow={false}>
              <svg className="w-5 h-5 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t.hero.whatsapp}
            </PremiumButton>
          </motion.div>
 
          {/* Staggered Stats Counters */}
          <motion.div
            variants={itemReveal}
            className="flex gap-6 mt-8 pt-6 lg:mt-12 lg:pt-8 border-t border-white/10 w-full justify-center lg:justify-start"
          >
            {[
              { to: 15, suffix: '+', label: t.hero.years },
              { to: 50, suffix: '+', label: t.hero.products },
              { to: 50000, suffix: '+', label: t.hero.farmers }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-2xl sm:text-3xl font-black text-[#8AD65A]">
                  <CountUp from={0} to={stat.to} suffix={stat.suffix} />
                </div>
                <div className="text-white/50 mt-1 font-semibold tracking-wide" style={{ fontSize: 'clamp(11px, 3vw, 13px)' }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side: Floating Elastic Product Showcases */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center items-center relative mt-12 lg:mt-0"
        >
          <div className="relative">
            {/* Soft Radial Ambient Glow */}
            <div
              className="absolute inset-0 rounded-full blur-[90px] opacity-25 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(118,201,69,0.3) 0%, transparent 70%)' }}
            />

            {/* Central Product card */}
            <motion.div style={{ x: parallaxCentral.x, y: parallaxCentral.y }} className="relative z-10">
              <motion.div
                className="bg-white/95 backdrop-blur-md rounded-3xl p-5 border border-white/20 shadow-2xl flex flex-col items-center w-[180px] h-[270px] sm:w-[210px] sm:h-[310px] justify-between cursor-pointer hover:shadow-[#76C945]/15 hover:border-[#76C945]/30 transition-all duration-300"
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{ scale: 1.03 }}
              >
                <Link to="/products/fatty" className="flex-1 flex flex-col items-center justify-between w-full h-full">
                  <div className="flex-1 flex items-center justify-center p-2">
                    <img
                      src={fatty}
                      alt="Fatty Product"
                      width="150"
                      height="208"
                      loading="eager"
                      className="h-40 sm:h-52 w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.08)]"
                    />
                  </div>
                  <span className="text-[#0A2E1F] font-bold text-xs bg-[#76C945]/20 px-3 py-1 rounded-full border border-[#76C945]/30 mt-2">
                    Fatty
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Floating Secondary Card (Right) */}
            <motion.div
              style={{ x: parallaxRight.x, y: parallaxRight.y }}
              className="absolute -right-10 -top-4 z-0 hidden lg:block"
            >
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 border border-white/10 shadow-xl flex flex-col items-center w-[120px] h-[170px] justify-between cursor-pointer hover:shadow-[#76C945]/10 hover:border-[#76C945]/30 transition-all duration-300"
                animate={{ y: [4, -8, 4] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link to="/products/super-4g" className="flex-1 flex flex-col items-center justify-between w-full h-full">
                  <div className="flex-1 flex items-center justify-center p-1">
                    <img
                      src={super4g}
                      alt="Super 4G"
                      width="80"
                      height="112"
                      className="h-28 w-auto object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.06)]"
                    />
                  </div>
                  <span className="text-[#0A2E1F] font-bold text-[10px] bg-[#C5A059]/20 px-2.5 py-0.5 rounded-full mt-1">
                    Super 4G
                  </span>
                </Link>
              </motion.div>
            </motion.div>

            {/* Floating Tertiary Card (Left) */}
            <motion.div
              style={{ x: parallaxLeft.x, y: parallaxLeft.y }}
              className="absolute -left-10 bottom-4 z-20 hidden lg:block"
            >
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 border border-white/10 shadow-xl flex flex-col items-center w-[120px] h-[170px] justify-between cursor-pointer hover:shadow-[#76C945]/10 hover:border-[#76C945]/30 transition-all duration-300"
                animate={{ y: [-6, 10, -6] }}
                transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link to="/products/aaqaab" className="flex-1 flex flex-col items-center justify-between w-full h-full">
                  <div className="flex-1 flex items-center justify-center p-1">
                    <img
                      src={aaqaab}
                      alt="AAQAAB"
                      width="80"
                      height="112"
                      className="h-28 w-auto object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.06)]"
                    />
                  </div>
                  <span className="text-[#0A2E1F] font-bold text-[10px] bg-[#C5A059]/20 px-2.5 py-0.5 rounded-full mt-1">
                    AAQAAB
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
