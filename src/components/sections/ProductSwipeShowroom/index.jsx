import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShoppingCart } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { PRODUCTS_DATA } from '@/data/productsData';
import { useCart } from '@/lib/CartContext';
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

// Aesthetic backgrounds mapped to each product's branding
const AMBIENT_THEMES = {
  "fatty": {
    bg: "radial-gradient(circle at center, #0a2d1d 0%, #030e08 100%)",
    glow: "rgba(118, 201, 69, 0.4)",
    particleColor: "#76C945"
  },
  "conference-gold": {
    bg: "radial-gradient(circle at center, #2e240a 0%, #0e0b03 100%)",
    glow: "rgba(197, 160, 89, 0.4)",
    particleColor: "#C5A059"
  },
  "easy-grow": {
    bg: "radial-gradient(circle at center, #2d0a1e 0%, #0e030a 100%)",
    glow: "rgba(236, 72, 153, 0.45)",
    particleColor: "#ec4899"
  },
  "output": {
    bg: "radial-gradient(circle at center, #240a2d 0%, #0c030e 100%)",
    glow: "rgba(192, 132, 252, 0.4)",
    particleColor: "#c084fc"
  },
  "aaqaab": {
    bg: "radial-gradient(circle at center, #0a1e2d 0%, #03090e 100%)",
    glow: "rgba(59, 130, 246, 0.45)",
    particleColor: "#3b82f6"
  },
  "vac-zinc": {
    bg: "radial-gradient(circle at center, #0a2d16 0%, #030e07 100%)",
    glow: "rgba(74, 222, 128, 0.45)",
    particleColor: "#4ade80"
  },
  "sector": {
    bg: "radial-gradient(circle at center, #222d0a 0%, #0b0e03 100%)",
    glow: "rgba(163, 230, 53, 0.4)",
    particleColor: "#a3e635"
  },
  "purifizin": {
    bg: "radial-gradient(circle at center, #2d160a 0%, #0e0703 100%)",
    glow: "rgba(249, 115, 22, 0.45)",
    particleColor: "#f97316"
  },
  "dr-pp": {
    bg: "radial-gradient(circle at center, #2d240a 0%, #0e0b03 100%)",
    glow: "rgba(234, 179, 8, 0.45)",
    particleColor: "#eab308"
  },
  "farbasin": {
    bg: "radial-gradient(circle at center, #1b0a2d 0%, #08030e 100%)",
    glow: "rgba(167, 139, 250, 0.4)",
    particleColor: "#a78bfa"
  },
  "super-4g": {
    bg: "radial-gradient(circle at center, #2d0a21 0%, #0e030a 100%)",
    glow: "rgba(244, 63, 94, 0.4)",
    particleColor: "#f43f5e"
  }
};

const formatPrice = (price) => {
  const val = Math.round(price);
  if (isNaN(val) || val <= 0) return 999;
  if (val % 100 === 0) return val + 99;
  return val;
};

export default function ProductSwipeShowroom() {
  const { lang } = useLanguage();
  const { addToCart, setIsCartOpen } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [progress, setProgress] = useState(0);

  const containerRef = useRef(null);
  const scrollTimeout = useRef(null);

  const products = useMemo(() => {
    return FEATURED_SLUGS.map(slug => PRODUCTS_DATA[slug]).filter(Boolean);
  }, []);

  const activeProduct = products[currentIndex];
  const theme = AMBIENT_THEMES[activeProduct?.slug] || AMBIENT_THEMES["fatty"];

  const goNext = () => {
    setDirection(1);
    setProgress(0);
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setProgress(0);
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  // 1. Auto-slide sequence every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goNext();
          return 0;
        }
        return prev + 1;
      });
    }, 50); // 100 steps of 50ms = 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  // 2. Keyboard control bindings
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 3. Mouse Wheel controller (throttled to avoid double slide)
  const handleWheel = (e) => {
    if (scrollTimeout.current) return;
    scrollTimeout.current = setTimeout(() => {
      scrollTimeout.current = null;
    }, 1200);

    if (e.deltaY > 50) {
      goNext();
    } else if (e.deltaY < -50) {
      goPrev();
    }
  };

  // 4. Cursor parallax interaction
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  // 5. Swipe gesture support
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goNext(),
    onSwipedRight: () => goPrev(),
    trackMouse: false,
    preventScrollOnSwipe: true
  });

  if (!activeProduct) return null;

  const currentSize = activeProduct.sizes?.[0] || activeProduct.pricing?.[0] || { price: 999 };
  const price = formatPrice(currentSize.price || 999);
  const oldPrice = currentSize.oldPrice ? formatPrice(currentSize.oldPrice) : null;

  const whatsappText = encodeURIComponent(`Hello Vital Agro,\n\nI am interested in buying ${activeProduct.name[lang]}. Please share details.\n\nThank you.`);
  const whatsappUrl = `https://wa.me/923011837160?text=${whatsappText}`;

  // Handle immediate purchase checkout setup
  const handleQuickBuy = () => {
    addToCart(activeProduct, currentSize, 1);
    setIsCartOpen(true);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden transition-all duration-1000 select-none z-10 py-16 px-4 sm:px-6 lg:px-8"
      style={{ background: theme.bg }}
      {...swipeHandlers}
    >
      {/* Background Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-25"
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              backgroundColor: theme.particleColor,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              boxShadow: `0 0 20px ${theme.particleColor}`
            }}
            animate={{
              y: [0, Math.random() * -120 - 40],
              x: [0, Math.random() * 40 - 20],
              opacity: [0.15, 0.4, 0]
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      {/* Ambient Glow Aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 z-0"
        style={{ backgroundColor: theme.glow, filter: 'blur(120px)', opacity: 0.6 }}
      />

      {/* Fullscreen Grid Layout */}
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-8 items-center relative z-10">
        
        {/* Left Column: Premium Reveal Details */}
        <div className="text-left space-y-6 md:space-y-8 order-2 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
                exit: { opacity: 0, transition: { duration: 0.3 } }
              }}
              className="space-y-5"
            >
              {/* Sparkle Badge */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -20 },
                  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
                }}
                className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-[#76C945] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#8AD65A]">
                  {activeProduct.category.toUpperCase().replace('_', ' ')}
                </span>
              </motion.div>

              {/* Reveal Name */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0, transition: { type: 'spring', damping: 12 } }
                }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white drop-shadow"
              >
                {activeProduct.name[lang]}
              </motion.h1>

              {/* Formula Formula */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                className="flex items-center gap-3 font-mono text-xs text-white/50"
              >
                <span className="px-2.5 py-1 rounded bg-[#76C945]/15 text-[#8AD65A] font-extrabold uppercase border border-[#76C945]/20">
                  {activeProduct.formulation || 'SL Form'}
                </span>
                <span>•</span>
                <span className="font-bold">{activeProduct.activeIngredient}</span>
              </motion.div>

              {/* Reveal Description */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl font-medium"
              >
                {activeProduct.description[lang].length > 220 
                  ? activeProduct.description[lang].substring(0, 220) + '...' 
                  : activeProduct.description[lang]}
              </motion.p>

              {/* Reveal Price */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { opacity: 1, scale: 1 }
                }}
                className="flex items-baseline gap-4 py-2"
              >
                <span className="text-3xl sm:text-4xl font-mono font-black text-[#8AD65A]">
                  PKR {price.toLocaleString()}
                </span>
                {oldPrice && (
                  <span className="text-sm sm:text-base text-white/30 line-through font-mono">
                    PKR {oldPrice.toLocaleString()}
                  </span>
                )}
              </motion.div>

              {/* Buttons Row */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <button
                  onClick={handleQuickBuy}
                  className="px-8 py-4 bg-gradient-to-r from-[#76C945] to-[#5cb85c] hover:shadow-[0_0_30px_rgba(92,184,92,0.4)] text-[#0A2E1F] font-black text-sm rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 group"
                >
                  <ShoppingCart size={18} className="group-hover:rotate-12 transition-transform" />
                  <span>{lang === 'en' ? 'Quick Checkout' : 'فوری خریدیں'}</span>
                </button>

                <PremiumButton
                  variant="secondary"
                  href={`/products/${activeProduct.slug}`}
                  className="px-8 py-4 text-sm font-extrabold rounded-full border border-white/20 bg-white/5 hover:bg-white/10"
                >
                  <span>{lang === 'en' ? 'Product Profile' : 'تفصیلات دیکھیں'}</span>
                  <ArrowRight size={16} />
                </PremiumButton>
              </motion.div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: 3D Parallax floating Image */}
        <div className="relative aspect-square w-full max-w-[420px] lg:max-w-[500px] mx-auto flex items-center justify-center order-1 lg:order-2">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ scale: 0.6, rotate: -45, opacity: 0 }}
              animate={{ 
                scale: 1, 
                rotate: 0, 
                opacity: 1,
                x: mousePosition.x * 35,
                y: mousePosition.y * 35,
                rotateY: mousePosition.x * 25,
                rotateX: -mousePosition.y * 25
              }}
              exit={{ scale: 0.6, rotate: 45, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              className="relative w-[75%] sm:w-[80%] h-auto z-10 cursor-pointer overflow-visible flex items-center justify-center"
            >
              
              {/* Product Bottle Shadow */}
              <div 
                className="absolute bottom-[-15px] w-[50%] h-[15px] bg-black/40 rounded-full blur-[10px] pointer-events-none transition-all duration-500 scale-x-[1.2] opacity-80" 
              />

              {/* Dynamic Sweep Glare Overlay */}
              <div className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none z-20">
                <motion.div 
                  className="w-[30%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 absolute left-0"
                  animate={{ x: ['-100%', '300%'] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 3 }}
                />
              </div>

              {/* Image Node */}
              <img
                src={activeProduct.pngUrl || activeProduct.imageUrl}
                alt={activeProduct.name[lang]}
                className="w-full h-auto object-contain max-h-[350px] sm:max-h-[440px] drop-shadow-[0_20px_45px_rgba(0,0,0,0.5)] select-none hover:scale-105 transition-all duration-700"
              />

            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls over stage */}
          <button
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-20"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-20"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>

      {/* Bottom Interface: Progress indicator & Dots */}
      <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-6 flex justify-between items-center z-20">
        
        {/* Carousel Dots */}
        <div className="flex gap-2">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
                setProgress(0);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                currentIndex === idx 
                  ? 'w-8 bg-[#8AD65A] shadow-[0_0_8px_#76C945]' 
                  : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* 5-second automatic Reveal Progress Bar */}
        <div className="flex items-center gap-3.5 text-white/40 font-mono text-xs">
          <span>0{currentIndex + 1}</span>
          <div className="w-36 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
            <div 
              className="h-full bg-[#8AD65A] transition-all duration-[50ms]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span>0{products.length}</span>
        </div>

      </div>

    </div>
  );
}
