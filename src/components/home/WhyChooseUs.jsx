import React from 'react';
import { motion } from 'framer-motion';
import { Shield, FlaskConical, Truck, Award, Users, HeartPulse, Globe, Zap } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedText from '@/components/ui/AnimatedText';

const cardColors = [
  { bg: 'from-[#76C945]/15 to-[#76C945]/5', icon: 'text-[#76C945]', glow: 'hover:shadow-[#76C945]/10' },
  { bg: 'from-[#C5A059]/15 to-[#C5A059]/5', icon: 'text-[#C5A059]', glow: 'hover:shadow-[#C5A059]/10' },
  { bg: 'from-blue-500/15 to-blue-500/5', icon: 'text-blue-500', glow: 'hover:shadow-blue-500/10' },
  { bg: 'from-emerald-500/15 to-emerald-500/5', icon: 'text-emerald-500', glow: 'hover:shadow-emerald-500/10' },
  { bg: 'from-purple-500/15 to-purple-500/5', icon: 'text-purple-500', glow: 'hover:shadow-purple-500/10' },
  { bg: 'from-rose-500/15 to-rose-500/5', icon: 'text-rose-500', glow: 'hover:shadow-rose-500/10' },
  { bg: 'from-amber-500/15 to-amber-500/5', icon: 'text-amber-500', glow: 'hover:shadow-amber-500/10' },
  { bg: 'from-teal-500/15 to-teal-500/5', icon: 'text-teal-500', glow: 'hover:shadow-teal-500/10' },
];

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const REASONS = [
    { icon: Globe, title: t.whyUs.r1Title, desc: t.whyUs.r1Desc },
    { icon: Shield, title: t.whyUs.r2Title, desc: t.whyUs.r2Desc },
    { icon: FlaskConical, title: t.whyUs.r3Title, desc: t.whyUs.r3Desc },
    { icon: Zap, title: t.whyUs.r4Title, desc: t.whyUs.r4Desc },
    { icon: Users, title: t.whyUs.r5Title, desc: t.whyUs.r5Desc },
    { icon: HeartPulse, title: t.whyUs.r6Title, desc: t.whyUs.r6Desc },
    { icon: Truck, title: t.whyUs.r7Title, desc: t.whyUs.r7Desc },
    { icon: Award, title: t.whyUs.r8Title, desc: t.whyUs.r8Desc },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Premium background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4F7F5]/50 via-white to-[#F4F7F5]/30 pointer-events-none" />
      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-black tracking-widest uppercase text-[#76C945] mb-4"
          >
            {t.whyUs.badge}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
            <AnimatedText text={t.whyUs.title} />
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            {t.whyUs.desc}
          </motion.p>
        </div>

        {/* Reason Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REASONS.map((reason, i) => {
            const colors = cardColors[i % cardColors.length];
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full flex"
              >
                <GlassCard
                  tilt={true}
                  maxTilt={8}
                  glow={true}
                  lift={true}
                  className="w-full p-6 bg-white/45 hover:bg-white/90 border-[#0A2E1F]/5 cursor-default hover:border-[#76C945]/30 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* Subtle color highlight glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                        <reason.icon className={`w-6 h-6 ${colors.icon}`} />
                      </div>
                      <h3 className="font-extrabold text-[#0A2E1F] mb-2 text-base">{reason.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}