import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Package, Users, Tractor, ThumbsUp } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-3xl sm:text-4xl font-extrabold text-foreground tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const statColors = [
  { bg: 'bg-[#76C945]/10', icon: 'text-[#76C945]', glow: 'hover:shadow-[#76C945]/5' },
  { bg: 'bg-[#C5A059]/10', icon: 'text-[#C5A059]', glow: 'hover:shadow-[#C5A059]/5' },
  { bg: 'bg-blue-500/10', icon: 'text-blue-500', glow: 'hover:shadow-blue-500/5' },
  { bg: 'bg-emerald-500/10', icon: 'text-emerald-500', glow: 'hover:shadow-emerald-500/5' },
  { bg: 'bg-purple-500/10', icon: 'text-purple-500', glow: 'hover:shadow-purple-500/5' },
];

export default function StatsSection() {
  const { t } = useLanguage();

  const STATS = [
    { icon: Award, value: 15, suffix: '+', label: t.stats.experience },
    { icon: Package, value: 50, suffix: '+', label: t.stats.products },
    { icon: Users, value: 500, suffix: '+', label: t.stats.dealers },
    { icon: Tractor, value: 10000, suffix: '+', label: t.stats.farmers },
    { icon: ThumbsUp, value: 25000, suffix: '+', label: t.stats.customers },
  ];

  return (
    <section className="py-16 -mt-1 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/5 border border-border/60 p-8 sm:p-12 relative overflow-hidden"
        >
          {/* Subtle gradient shine */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#76C945]/[0.03] via-transparent to-[#C5A059]/[0.03] rounded-3xl" />

          <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`text-center group cursor-default p-4 rounded-2xl transition-all duration-300 hover:bg-card ${statColors[i].glow} hover:shadow-xl`}
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`w-14 h-14 rounded-2xl ${statColors[i].bg} flex items-center justify-center mx-auto mb-4`}
                >
                  <stat.icon className={`w-6 h-6 ${statColors[i].icon}`} />
                </motion.div>
                <Counter target={stat.value} suffix={stat.suffix} />
                <p className="text-sm text-muted-foreground mt-2 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}