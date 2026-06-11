import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { PRODUCTS_DATA } from '@/data/productsData';
import PremiumButton from '@/components/ui/PremiumButton';

const FEATURED_SLUGS = [
  "conference-gold",
  "easy-grow",
  "fatty",
  "output",
  "aaqaab",
  "vac-zinc",
  "sector",
  "purifizin",
  "dr-pp",
  "farbasin",
  "super-4g"
];

const formatPsychologicalPrice = (price) => {
  const val = Math.round(price);
  if (isNaN(val) || val <= 0) return 99;
  if (val % 100 === 99) return val;
  if (val % 100 === 0) return val + 99;
  return Math.ceil(val / 100) * 100 - 1;
};

export default function ProductSwipeShowroom() {
  const { lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const products = useMemo(() => {
    return FEATURED_SLUGS.map(slug => PRODUCTS_DATA[slug]).filter(Boolean);
  }, []);

  const activeProduct = products[currentIndex];

  const goNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => goNext(),
    onSwipedRight: () => goPrev(),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  if (!activeProduct) return null;

  const currentSize = activeProduct.sizes?.[0] || activeProduct.pricing?.[0] || { price: 999, oldPrice: 1299, discount: 20 };
  const price = formatPsychologicalPrice(currentSize.price || 999);
  const oldPrice = currentSize.oldPrice ? formatPsychologicalPrice(currentSize.oldPrice) : null;
  const discount = currentSize.discount || (oldPrice ? Math.round((1 - price / oldPrice) * 100) : 20);

  const whatsappText = encodeURIComponent(`Hello Vital Agro,\n\nI am interested in ${activeProduct.name[lang]} (${activeProduct.activeIngredient}). Please share pricing and ordering info.\n\nThank you.`);
  const whatsappUrl = `https://wa.me/923011837160?text=${whatsappText}`;

  return (
    <section className="relative py-24 bg-[#02140c] text-white overflow-hidden flex flex-col items-center">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(118,201,69,0.15)_0%,transparent_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(197,160,89,0.08)_0%,transparent_70%)] pointer-events-none z-0" />

      {/* Section Header */}
      <div className="text-center mb-12 px-4 z-10">
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#76C945]/15 border border-[#76C945]/30 text-[#76C945] text-xs font-black uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          {lang === 'en' ? 'OUR PRODUCTS' : 'ہماری مصنوعات'}
        </span>
        <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-2">
          {lang === 'en' ? 'Premium Collection' : 'پریمیئم کلیکشن'}
        </h2>
        <p className="text-white/60 text-sm font-medium tracking-wide">
          {lang === 'en' ? '← Swipe to explore →' : '← دیکھنے کے لیے سوائپ کریں →'}
        </p>
      </div>

      {/* Card Stage area */}
      <div className="relative w-full max-w-[400px] h-[540px] flex items-center justify-center z-10" {...handlers}>
        {/* Background peek card */}
        <div className="absolute w-[320px] h-[460px] bg-white/5 border border-white/10 rounded-[28px] pointer-events-none z-0 scale-[0.93] opacity-40 translate-y-3 filter blur-[1px] transition-all duration-500" />

        {/* Active swiping card */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ x: direction > 0 ? 160 : -160, opacity: 0, scale: 0.95, rotate: direction > 0 ? 5 : -5 }}
            animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
            exit={{ x: direction > 0 ? -160 : 160, opacity: 0, scale: 0.95, rotate: direction > 0 ? -5 : 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="absolute z-10 bg-white/[0.04] backdrop-blur-[24px] saturate-[150%] border border-white/10 rounded-[28px] shadow-[0_32px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] p-8 flex flex-col justify-between items-center w-[340px] max-w-[88vw] h-[500px]"
          >
            {/* Top row: Category badge */}
            <div className="w-full flex justify-between items-center">
              <span className="px-2.5 py-0.5 rounded bg-[#76C945]/15 border border-[#76C945]/30 text-[#76C945] text-[9px] font-black uppercase tracking-wider">
                {activeProduct.category.toUpperCase().replace('_', ' ')}
              </span>
              <span className="text-[9px] font-black text-white/40 tracking-widest">
                {activeProduct.productCode}
              </span>
            </div>

            {/* Middle: Floating product image + Ground shadow */}
            <div className="relative flex-1 flex flex-col items-center justify-center my-4 overflow-visible">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateY: [0, 5, 0]
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
                className="relative z-10 flex items-center justify-center max-h-[160px]"
              >
                <img
                  src={activeProduct.pngUrl || activeProduct.imageUrl}
                  alt={activeProduct.name[lang]}
                  className="max-h-[165px] w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)]"
                />
              </motion.div>
              {/* Ground shadow beneath */}
              <div className="absolute bottom-1 w-24 h-2 bg-black/40 rounded-full blur-[6px] opacity-60 z-0 animate-pulse" style={{ transform: 'scale(1.2)' }} />
            </div>

            {/* Bottom details block */}
            <div className="w-full text-center space-y-2 mt-auto">
              <div>
                <h3 className="text-xl font-extrabold text-white leading-tight block truncate">
                  {activeProduct.name[lang]}
                </h3>
                <p className="text-[10px] text-white/50 font-bold block truncate max-w-full mt-0.5">
                  {activeProduct.genericName[lang] || activeProduct.genericName.en}
                </p>
              </div>

              {/* Price row */}
              <div className="flex items-center justify-center gap-2.5 py-1">
                <span className="text-lg font-black text-[#76C945] font-mono">
                  PKR {price}
                </span>
                {oldPrice && (
                  <>
                    <span className="text-xs text-white/40 font-mono line-through">
                      PKR {oldPrice}
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md bg-red-500/20 text-red-400 text-[8px] font-black uppercase tracking-wider">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-3.5 pt-2">
                <PremiumButton
                  variant="primary"
                  href={`/products/${activeProduct.slug}`}
                  isMagnetic={false}
                  showArrow={false}
                  className="px-4 py-2.5 text-xs h-[40px]"
                >
                  {lang === 'en' ? 'View Details' : 'تفصیلات دیکھیں'}
                </PremiumButton>
                <PremiumButton
                  variant="whatsapp"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  isMagnetic={false}
                  showArrow={false}
                  className="px-4 py-2.5 text-xs h-[40px]"
                >
                  {lang === 'en' ? 'WhatsApp' : 'واٹس ایپ'}
                </PremiumButton>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Desktop Arrow navigators */}
        <button
          onClick={goPrev}
          className="absolute left-[-60px] hidden md:flex w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 items-center justify-center text-white transition-all active:scale-95 z-20 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goNext}
          className="absolute right-[-60px] hidden md:flex w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 items-center justify-center text-white transition-all active:scale-95 z-20 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex gap-2.5 mt-8 z-10">
        {products.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentIndex === idx
                ? 'w-6 bg-[#76C945]'
                : 'w-2 bg-white/25 hover:bg-white/45'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
