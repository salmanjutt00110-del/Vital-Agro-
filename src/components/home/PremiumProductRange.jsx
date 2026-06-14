import React from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import ProductsShowcase from './ProductsShowcase';

/**
 * Premium collection component serving as the exclusive showcase mechanism on the Home page.
 */
export default function PremiumProductRange() {
  const { lang } = useLanguage();

  return (
    <section id="products" className="bg-[#061406] py-24 relative overflow-hidden">
      {/* Background ambient decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute w-[600px] h-[600px] bg-[#76C945]/5 rounded-full blur-[120px] -top-48 -left-48" />
        <div className="absolute w-[600px] h-[600px] bg-[#C5A059]/5 rounded-full blur-[120px] bottom-0 -right-48" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header with spacious, editorial typography */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full
            bg-[rgba(45,106,45,0.25)] border border-[rgba(92,184,92,0.35)]
            text-[#5cb85c] text-[11px] font-bold tracking-[0.25em] uppercase mb-5"
          >
            ✦ {lang === 'en' ? 'OUR PREMIUM RANGE' : 'ہماری بہترین پروڈکٹس'}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-none">
            {lang === 'en' ? 'Agricultural Solutions' : 'زرعی مصنوعات اور حل'}
          </h2>
          <p className="text-white/45 mt-4 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            {lang === 'en' 
              ? 'Premium imported formulations for maximum crop yield and protection' 
              : 'فصل کی زیادہ سے زیادہ پیداوار اور تحفظ کے لیے شاندار امپورٹڈ فارمولیشنز'}
          </p>
        </div>

        {/* Exclusive Interactive Slider/Carousel Showcase */}
        <div className="relative">
          <ProductsShowcase />
        </div>
      </div>
    </section>
  );
}
