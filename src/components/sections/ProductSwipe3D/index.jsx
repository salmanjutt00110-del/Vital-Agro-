import React, { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import SwipeCard3D from './SwipeCard3D';
import DotIndicator from './DotIndicator';
import SwipeArrows from './SwipeArrows';
import { useLanguage } from '@/lib/LanguageContext';
import './styles.css';

/**
 * Main interactive 3D Product Swipe section.
 * Organizes touch swipe gestures, background cards overlay offsets,
 * desktop navigation buttons, and responsive layouts.
 */
export default function ProductSwipe3D({ products: rawProducts }) {
  const { lang } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 = next, -1 = prev
  const [isDragging, setIsDragging] = useState(false);

  // Map raw database products structure to V4 expected UI formats
  const products = useMemo(() => {
    if (!rawProducts) return [];
    return rawProducts.map(p => {
      // Find the first size details
      const sizeInfo = p.sizes?.[0] || {};
      const price = sizeInfo.price || 999;
      const originalPrice = sizeInfo.oldPrice || null;
      const discount = sizeInfo.discount || (originalPrice ? Math.round((1 - price / originalPrice) * 100) : null);
      
      const categoryLabel = p.category ? p.category.replace('_', ' ').toUpperCase() : '';

      return {
        ...p,
        name: typeof p.name === 'object' ? (p.name[lang] || p.name.en) : p.name,
        formula: p.activeIngredient || p.formulation || "",
        image: p.pngUrl || p.imageUrl,
        price,
        originalPrice,
        discount,
        category: categoryLabel,
      };
    });
  }, [rawProducts, lang]);

  const total = products.length;

  const goNext = () => {
    if (currentIndex < total - 1) {
      setDirection(1);
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Touch swipe support
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goNext(),
    onSwipedRight: () => goPrev(),
    onSwipeStart: () => setIsDragging(true),
    onSwiped: () => setIsDragging(false),
    trackMouse: true,
    preventScrollOnSwipe: true,
    delta: 50,
  });

  if (total === 0) return null;

  return (
    <section className="product-swipe-section relative overflow-hidden
      bg-[#02140c] py-20 px-4 min-h-[90vh] flex flex-col items-center justify-center"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
          w-[500px] h-[500px] rounded-full opacity-20
          bg-[radial-gradient(circle,#2d6a2d_0%,transparent_70%)]
          blur-[60px]"
        />
      </div>

      {/* Section Header */}
      <motion.div
        className="section-header text-center mb-16 z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full
          bg-[rgba(45,106,45,0.2)] border border-[rgba(92,184,92,0.3)]
          text-[#5cb85c] text-xs tracking-[0.15em] uppercase font-semibold mb-6"
        >
          ✦ {lang === 'en' ? 'OUR PRODUCTS' : 'ہماری مصنوعات'}
        </span>

        <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
          {lang === 'en' ? 'Premium Collection' : 'پریمیئم کلیکشن'}
        </h2>
        <p className="text-white/50 mt-3 text-sm tracking-wide">
          {lang === 'en' ? 'Swipe to explore ←→' : 'دیکھنے کے لیے سوائپ کریں ←→'}
        </p>
      </motion.div>

      {/* 3D Card Stage */}
      <div
        className="card-stage relative z-10 w-full max-w-sm mx-auto"
        style={{ perspective: '1200px', perspectiveOrigin: '50% 40%' }}
        {...swipeHandlers}
      >
        {/* Background cards (peek effect) */}
        {[currentIndex + 1, currentIndex + 2].map((peekIdx, i) => {
          if (peekIdx >= total) return null;
          return (
            <motion.div
              key={`peek-${peekIdx}`}
              className="absolute inset-0"
              style={{
                zIndex: -1 - i,
                transform: `translateX(${(i + 1) * 14}px) translateY(${(i + 1) * 10}px) scale(${0.95 - i * 0.04})`,
                filter: `blur(${(i + 1) * 2}px)`,
                opacity: 0.5 - i * 0.2,
              }}
            >
              <SwipeCard3D
                product={products[peekIdx]}
                isActive={false}
                isPeek={true}
              />
            </motion.div>
          );
        })}

        {/* Active card with AnimatePresence */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={{
              enter: (dir) => ({
                x: dir > 0 ? 320 : -320,
                opacity: 0,
                rotateY: dir > 0 ? 25 : -25,
                scale: 0.85,
              }),
              center: {
                x: 0,
                opacity: 1,
                rotateY: 0,
                scale: 1,
              },
              exit: (dir) => ({
                x: dir > 0 ? -320 : 320,
                opacity: 0,
                rotateY: dir > 0 ? -25 : 25,
                scale: 0.85,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 28,
              opacity: { duration: 0.25 },
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <SwipeCard3D
              product={products[currentIndex]}
              isActive={true}
              isPeek={false}
              isDragging={isDragging}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots + Count */}
      <div className="mt-10 z-10 flex flex-col items-center gap-4">
        <DotIndicator
          total={total}
          current={currentIndex}
          onChange={(i) => {
            setDirection(i > currentIndex ? 1 : -1);
            setCurrentIndex(i);
          }}
        />
        <p className="text-white/30 text-xs font-semibold">
          {currentIndex + 1} of {total} {lang === 'en' ? 'products' : 'مصنوعات'}
        </p>
      </div>

      {/* Desktop arrows */}
      <SwipeArrows
        onPrev={goPrev}
        onNext={goNext}
        canPrev={currentIndex > 0}
        canNext={currentIndex < total - 1}
      />
    </section>
  );
}
