import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Microscope, HeartHandshake } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import useVideoAutoplay from '@/hooks/useVideoAutoplay';

// Import Assets
import vitalBg from '@/assets/vital bg.mp4';
import vitalAgroLogo from '@/assets/vital agro logo.webp';
import tagLogo from '@/assets/tag logo.webp';

export default function AboutPreview() {
  const { t } = useLanguage();
  const videoRef = useRef(null);
  useVideoAutoplay(videoRef);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Video side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-xl border border-border">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
                style={{ objectFit: 'cover' }}
              >
                <source src={vitalBg} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[#0A2E1F]/25 mix-blend-overlay" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E1F]/50 to-transparent" />
            </div>
            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-6 border border-border"
            >
              <div className="text-3xl font-extrabold text-[#0A2E1F]">15+</div>
              <div className="text-sm text-muted-foreground font-medium">{t.about.yearsExcellence}</div>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Logo Banner */}
            <div className="flex items-center gap-4 mb-4">
              <img
                src={vitalAgroLogo}
                alt="Vital Agro Logo"
                className="h-9 w-auto object-contain"
              />
              <span className="h-5 w-px bg-border" />
              <img
                src={tagLogo}
                alt="Tag Logo"
                className="h-7 w-auto object-contain"
              />
            </div>

            <span className="text-sm font-bold tracking-widest uppercase text-[#76C945]">{t.about.badge}</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mt-2 mb-6 leading-tight">
              {t.about.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              {t.about.desc}
            </p>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              {[
                { icon: Shield, title: t.about.qualityTitle, desc: t.about.qualityDesc },
                { icon: Microscope, title: t.about.researchTitle, desc: t.about.researchDesc },
                { icon: HeartHandshake, title: t.about.supportTitle, desc: t.about.supportDesc },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#76C945]/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-[#76C945]" />
                  </div>
                  <h4 className="font-bold text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>

            <Link
              to="/about"
              className="group inline-flex items-center gap-2 text-[#0A2E1F] font-bold hover:text-[#76C945] transition-colors"
            >
              {t.about.learnMore}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}