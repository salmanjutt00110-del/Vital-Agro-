import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, FlaskConical, Microscope, ShieldCheck, Atom } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import researchLab from '@/assets/research_lab.png';

export default function QualitySection() {
  const { t } = useLanguage();

  const STEPS = [
    { step: '01', title: t.quality.s1Title, desc: t.quality.s1Desc, icon: FlaskConical },
    { step: '02', title: t.quality.s2Title, desc: t.quality.s2Desc, icon: Microscope },
    { step: '03', title: t.quality.s3Title, desc: t.quality.s3Desc, icon: ShieldCheck },
    { step: '04', title: t.quality.s4Title, desc: t.quality.s4Desc, icon: Atom },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#76C945]/[0.03] via-background to-[#C5A059]/[0.03]" />
      {/* Subtle floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#76C945]/5"
            style={{
              width: 80 + i * 40,
              height: 80 + i * 40,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-block text-sm font-black tracking-widest uppercase text-[#76C945] mb-4"
            >
              {t.quality.badge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-6 leading-tight"
            >
              {t.quality.title}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-muted-foreground text-lg leading-relaxed mb-10"
            >
              {t.quality.desc}
            </motion.p>

            <div className="space-y-5">
              {STEPS.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.6 }}
                  className="flex gap-5 group p-4 rounded-2xl hover:bg-card hover:shadow-lg hover:shadow-[#76C945]/5 border border-transparent hover:border-border transition-all duration-400"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A2E1F] to-[#0A2E1F]/80 text-white flex items-center justify-center font-black text-sm group-hover:from-[#76C945] group-hover:to-[#5BAD35] group-hover:text-[#0A2E1F] transition-all duration-400 shadow-lg">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1 text-base">{step.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Glass image container */}
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl border border-white/20">
              <img
                src={researchLab}
                alt="Research Laboratory"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0A2E1F]/40 via-transparent to-[#76C945]/10" />
              {/* Glass reflection effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                initial={{ x: '-100%' }}
                whileInView={{ x: '200%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.8, ease: 'easeInOut' }}
              />
            </div>

            {/* Floating chemistry icons */}
            <motion.div
              animate={{ y: [-5, 10, -5], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-border"
            >
              <FlaskConical className="w-7 h-7 text-[#76C945]" />
            </motion.div>

            <motion.div
              animate={{ y: [5, -8, 5], rotate: [0, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-3 -left-3 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center border border-border"
            >
              <Atom className="w-6 h-6 text-[#C5A059]" />
            </motion.div>

            {/* Quality badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#0A2E1F] to-[#0A2E1F]/90 text-white rounded-2xl p-6 shadow-2xl backdrop-blur-md border border-white/10"
            >
              <CheckCircle className="w-8 h-8 text-[#76C945] mb-2" />
              <div className="font-black text-lg">{t.quality.iso}</div>
              <div className="text-white/60 text-sm">{t.quality.isoDesc}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}