import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, Leaf } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import useVideoAutoplay from '@/hooks/useVideoAutoplay';
import vitalBg from '@/assets/vital bg.mp4';

export default function CTASection() {
  const { t } = useLanguage();
  const videoRef = useRef(null);
  useVideoAutoplay(videoRef);

  const whatsappText = encodeURIComponent("Hello Vital Agro,\n\nI am interested in your agricultural products and solutions. Please provide more details.\n\nThank you.");
  const whatsappUrl = `https://wa.me/923011837160?text=${whatsappText}`;

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Video background instead of broken remote image */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={vitalBg} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2E1F]/95 via-[#0A2E1F]/90 to-[#0A2E1F]/80" />

          {/* Floating leaves */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${15 + i * 18}%`,
                  top: `${20 + (i % 3) * 20}%`,
                }}
                animate={{
                  y: [-10, 15, -10],
                  rotate: [0, 10, -5, 0],
                  opacity: [0.1, 0.25, 0.1],
                }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
              >
                <Leaf className="w-6 h-6 text-[#76C945]/30" />
              </motion.div>
            ))}
          </div>

          <div className="relative px-8 sm:px-16 py-16 sm:py-24 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-block text-sm font-black tracking-widest uppercase text-[#76C945] mb-4"
            >
              Partner With Us
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight"
            >
              {t.cta.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-white/70 text-lg max-w-2xl mx-auto mb-10"
            >
              {t.cta.desc}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.div whileTap={{ scale: 0.97 }}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-8 py-4 btn-premium-primary rounded-full text-sm font-extrabold shadow-xl"
                >
                  {t.cta.btnGetInTouch}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
              <motion.div whileTap={{ scale: 0.97 }}>
                <a
                  href="tel:+920632253137"
                  className="inline-flex items-center gap-2 px-8 py-4 btn-premium-secondary rounded-full text-sm font-extrabold"
                >
                  <Phone className="w-4 h-4" />
                  {t.cta.btnCallNow}
                </a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}