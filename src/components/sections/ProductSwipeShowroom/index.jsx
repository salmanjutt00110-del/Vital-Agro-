import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  ShoppingCart, 
  Heart, 
  Share2, 
  GitCompare
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { PRODUCTS_DATA } from '@/data/productsData';
import { useCart } from '@/lib/CartContext';
import PremiumButton from '@/components/ui/PremiumButton';
import AnimatedBackground from '@/components/Background/AnimatedBackground';
import useAutoRotate from '@/hooks/useAutoRotate';
import toast from 'react-hot-toast';
import CheckoutPage from '@/pages/Checkout';

const FEATURED_SLUGS = [
  "conference-gold",
  "easy-grow",
  "fatty",
  "output",
  "aaqaab",
  "vac-zinc",
  "sector",
  "purifizin-extra",
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
  "purifizin-extra": {
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

  // Load featured products list
  const products = useMemo(() => {
    return FEATURED_SLUGS.map(slug => PRODUCTS_DATA[slug]).filter(Boolean);
  }, []);

  const activeProduct = products[currentIndex];
  const theme = AMBIENT_THEMES[activeProduct?.slug] || AMBIENT_THEMES["fatty"];

  // Selected size state for dynamic price calculations
  const sizesList = useMemo(() => {
    if (!activeProduct) return [];
    return activeProduct.sizes 
      ? activeProduct.sizes.map(s => typeof s === 'object' ? s.size : s) 
      : [activeProduct.packaging || '100ML'];
  }, [activeProduct]);

  const [selectedSize, setSelectedSize] = useState('');

  // Reset selected size when product changes
  useEffect(() => {
    if (sizesList.length > 0) {
      setSelectedSize(sizesList[0]);
    }
  }, [currentIndex, sizesList]);

  // Find exact pricing matching selected size
  const activeSizeInfo = useMemo(() => {
    if (!activeProduct || !selectedSize) return null;
    if (activeProduct.sizes) {
      return activeProduct.sizes.find(s => (typeof s === 'object' ? s.size : s) === selectedSize);
    }
    return null;
  }, [activeProduct, selectedSize]);

  const price = useMemo(() => {
    const rawPrice = activeSizeInfo?.price || activeProduct?.price || 999;
    return formatPrice(rawPrice);
  }, [activeProduct, activeSizeInfo]);

  const oldPrice = useMemo(() => {
    const rawOldPrice = activeSizeInfo?.oldPrice || null;
    return rawOldPrice ? formatPrice(rawOldPrice) : null;
  }, [activeSizeInfo]);

  // Discount percentage helper
  const discountPercent = useMemo(() => {
    if (oldPrice && price) {
      return Math.round(((oldPrice - price) / oldPrice) * 100);
    }
    return null;
  }, [price, oldPrice]);

  const stockStatus = activeSizeInfo?.stockStatus || "In Stock";

  // Wishlist and comparison lists stored locally
  const [wishlist, setWishlist] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const items = localStorage.getItem('vital_wishlist');
      return items ? JSON.parse(items) : [];
    } catch { return []; }
  });

  const [compareList, setCompareList] = useState(() => {
    if (typeof window === 'undefined') return [];
    try {
      const items = localStorage.getItem('vital_compare');
      return items ? JSON.parse(items) : [];
    } catch { return []; }
  });

  const toggleWishlist = () => {
    if (!activeProduct) return;
    setWishlist(prev => {
      const next = prev.includes(activeProduct.id)
        ? prev.filter(id => id !== activeProduct.id)
        : [...prev, activeProduct.id];
      localStorage.setItem('vital_wishlist', JSON.stringify(next));
      if (next.includes(activeProduct.id)) {
        toast.success(lang === 'en' ? 'Added to Wishlist' : 'وش لسٹ میں شامل کر دیا گیا');
      } else {
        toast.success(lang === 'en' ? 'Removed from Wishlist' : 'وش لسٹ سے ہٹا دیا گیا');
      }
      return next;
    });
  };

  const toggleCompare = () => {
    if (!activeProduct) return;
    setCompareList(prev => {
      const next = prev.includes(activeProduct.id)
        ? prev.filter(id => id !== activeProduct.id)
        : [...prev, activeProduct.id];
      localStorage.setItem('vital_compare', JSON.stringify(next));
      if (next.includes(activeProduct.id)) {
        toast.success(lang === 'en' ? 'Added to Comparison' : 'موازنہ کی فہرست میں شامل کر دیا گیا');
      } else {
        toast.success(lang === 'en' ? 'Removed from Comparison' : 'موازنہ کی فہرست سے ہٹا دیا گیا');
      }
      return next;
    });
  };

  const handleShare = () => {
    if (!activeProduct) return;
    const url = `${window.location.origin}/products/${activeProduct.slug}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success(lang === 'en' ? 'Link copied to clipboard!' : 'لنک کاپی کر لیا گیا ہے!');
    }).catch(() => {
      toast.error('Failed to copy link');
    });
  };

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

  // Full screen checkout triggers
  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleQuickCheckout = () => {
    if (!activeProduct) return;
    setCheckoutProduct({
      ...activeProduct,
      price,
      sizes: sizesList,
      category: activeProduct.category.toUpperCase().replace('_', ' ')
    });
    setIsCheckoutOpen(true);
  };

  // 1. Auto-slide progress bar update (7 seconds)
  useEffect(() => {
    const step = 50; // ms
    const duration = 7000; // ms
    const totalSteps = duration / step;
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goNext();
          return 0;
        }
        return prev + (100 / totalSteps);
      });
    }, step);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // 2. Keyboard bindings
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // 3. Mouse Wheel controller (throttled to avoid rapid triggering)
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

  // 4. Parallax interactive hover
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  // 5. Touch swipe gestures
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => goNext(),
    onSwipedRight: () => goPrev(),
    trackMouse: false,
    preventScrollOnSwipe: true
  });

  // GSAP Autoplay hook
  useAutoRotate({ goNext, containerRef, interval: 7000 });

  if (!activeProduct) return null;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden transition-all duration-1000 select-none z-10 py-24 px-4 sm:px-6 lg:px-8"
      style={{ background: theme.bg }}
      {...swipeHandlers}
    >
      {/* Dynamic Animated Background */}
      <AnimatedBackground theme={theme} />

      {/* Floating Sparkle/Aura Background Elements */}
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

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 z-0"
        style={{ backgroundColor: theme.glow, filter: 'blur(130px)', opacity: 0.5 }}
      />

      {/* Clean Full-Width 3D Showcase Container */}
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: Luxurious Typography and Details (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 lg:space-y-8 order-2 lg:order-1 text-left">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={{
                hidden: { opacity: 0, x: -30, filter: 'blur(8px)' },
                visible: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { staggerChildren: 0.1, duration: 0.5, ease: [0.25, 1, 0.5, 1] } },
                exit: { opacity: 0, x: 30, filter: 'blur(8px)', transition: { duration: 0.3 } }
              }}
              className="space-y-6"
            >
              {/* Category Badging */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: -15 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-[#76C945] animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#8AD65A]">
                  {activeProduct.category.toUpperCase().replace('_', ' ')}
                </span>
              </motion.div>

              {/* Title Header */}
              <motion.h1
                variants={{
                  hidden: { opacity: 0, x: -40 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="text-5xl sm:text-6xl lg:text-7.5xl font-black tracking-tight text-white leading-none drop-shadow"
              >
                {activeProduct.name[lang]}
              </motion.h1>

              {/* Formulation Formulation */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-white/50"
              >
                <span className="px-3 py-1 rounded bg-[#76C945]/15 text-[#8AD65A] font-extrabold uppercase border border-[#76C945]/20 tracking-wider">
                  {activeProduct.formulation || 'SL Form'}
                </span>
                <span>•</span>
                <span className="font-bold tracking-wide">{activeProduct.activeIngredient}</span>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="text-sm sm:text-base text-white/70 leading-relaxed max-w-xl font-medium"
              >
                {activeProduct.description[lang].length > 220 
                  ? activeProduct.description[lang].substring(0, 220) + '...' 
                  : activeProduct.description[lang]}
              </motion.p>

              {/* Sizes Pill Selectors */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                className="space-y-2.5"
              >
                <span className="block text-[10px] font-black uppercase tracking-widest text-white/40">
                  {lang === 'en' ? 'Available Packaging Sizes' : 'دستیاب پیکنگ سائز'}
                </span>
                <div className="flex gap-2 flex-wrap">
                  {sizesList.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4.5 py-2.5 rounded-2xl text-[11px] font-black border transition-all duration-300 ${
                        selectedSize === size
                          ? 'bg-[#76C945] border-[#76C945] text-[#0A2E1F] shadow-[0_0_15px_rgba(118,201,69,0.35)] scale-105'
                          : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Price Segment & Stock Badge */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.95 },
                  visible: { opacity: 1, scale: 1 }
                }}
                className="flex items-center gap-6 py-2"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-mono font-black text-[#8AD65A] drop-shadow-md">
                    PKR {price.toLocaleString()}
                  </span>
                  {oldPrice && (
                    <span className="text-sm sm:text-base text-white/30 line-through font-mono">
                      PKR {oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Discount Badge */}
                {discountPercent && (
                  <span className="px-2.5 py-1 rounded bg-[#e63946]/20 border border-[#e63946]/30 text-[#e63946] text-[10px] font-black uppercase tracking-wider">
                    {discountPercent}% OFF
                  </span>
                )}

                {/* Stock Status Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  <span className={`w-1.5 h-1.5 rounded-full ${stockStatus === 'In Stock' ? 'bg-[#76C945] shadow-[0_0_8px_#76C945]' : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'} animate-pulse`} />
                  <span className="text-[9px] font-black uppercase tracking-wider text-white/60">
                    {stockStatus === 'In Stock' ? (lang === 'en' ? 'IN STOCK' : 'دستیاب ہے') : (lang === 'en' ? 'LOW STOCK' : 'محدود اسٹاک')}
                  </span>
                </div>
              </motion.div>

              {/* CTA Action Buttons */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="flex flex-wrap items-center gap-4 pt-3"
              >
                <button
                  onClick={handleQuickCheckout}
                  className="px-8 py-4 bg-gradient-to-r from-[#76C945] to-[#5cb85c] hover:shadow-[0_0_30px_rgba(92,184,92,0.45)] text-[#0A2E1F] font-black text-sm rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2 group z-10"
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

              {/* Utility Tools: Wishlist, Compare, Share */}
              <motion.div
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1 }
                }}
                className="flex items-center gap-3.5 pt-2 border-t border-white/5"
              >
                <button
                  onClick={toggleWishlist}
                  className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors ${
                    wishlist.includes(activeProduct.id) ? 'text-rose-500' : 'text-white/40 hover:text-white'
                  }`}
                >
                  <Heart size={14} className={wishlist.includes(activeProduct.id) ? 'fill-current' : ''} />
                  <span>{lang === 'en' ? 'Wishlist' : 'پسندیدہ'}</span>
                </button>

                <span className="text-white/10">•</span>

                <button
                  onClick={toggleCompare}
                  className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors ${
                    compareList.includes(activeProduct.id) ? 'text-[#76C945]' : 'text-white/40 hover:text-white'
                  }`}
                >
                  <GitCompare size={14} />
                  <span>{lang === 'en' ? 'Compare' : 'موازنہ کریں'}</span>
                </button>

                <span className="text-white/10">•</span>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors"
                >
                  <Share2 size={14} />
                  <span>{lang === 'en' ? 'Share' : 'شیئر کریں'}</span>
                </button>
              </motion.div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Luxurious Parallax 3D Image (6 Cols) */}
        <div className="lg:col-span-6 relative aspect-square w-full max-w-[420px] lg:max-w-[480px] mx-auto flex items-center justify-center order-1 lg:order-2">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              initial={{ scale: 0.75, rotate: -25, opacity: 0, filter: 'blur(10px)' }}
              animate={{ 
                scale: 1, 
                rotate: 0, 
                opacity: 1,
                filter: 'blur(0px)',
                x: mousePosition.x * 30,
                y: mousePosition.y * 30,
                rotateY: mousePosition.x * 20,
                rotateX: -mousePosition.y * 20
              }}
              exit={{ scale: 0.75, rotate: 25, opacity: 0, filter: 'blur(10px)' }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="relative w-[85%] h-auto z-10 cursor-pointer overflow-visible flex items-center justify-center"
              style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
            >
              {/* Floating Animation Wrapper */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full flex items-center justify-center"
              >
                {/* Clean Product Bottle Image */}
                <img
                  src={activeProduct.pngUrl || activeProduct.imageUrl}
                  alt={activeProduct.name[lang]}
                  className="w-full h-auto object-contain max-h-[360px] sm:max-h-[420px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)] select-none hover:scale-103 transition-transform duration-700"
                  loading="lazy"
                />
              </motion.div>

              {/* Realistic floating dynamic shadow */}
              <motion.div 
                className="absolute bottom-[-25px] left-[25%] right-[25%] h-[12px] bg-black/45 rounded-full blur-[10px] pointer-events-none transition-all duration-500 z-0"
                animate={{
                  scaleX: [1, 0.85, 1],
                  opacity: [0.8, 0.5, 0.8]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* dynamic sweep lighting glare */}
              <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none z-20">
                <motion.div 
                  className="w-[20%] h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 absolute left-0"
                  animate={{ x: ['-100%', '350%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav Controls Over Screen */}
          <button
            onClick={goPrev}
            className="absolute left-[-16px] lg:left-[-32px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-30"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={goNext}
            className="absolute right-[-16px] lg:right-[-32px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-30"
          >
            <ChevronRight size={20} />
          </button>
        </div>

      </div>

      {/* Bottom Interface: Progress indicator & Dot Navigation */}
      <div className="absolute bottom-8 left-0 right-0 max-w-7xl mx-auto px-6 flex justify-between items-center z-20">
        
        {/* Carousel indicator dots */}
        <div className="flex gap-2.5">
          {products.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
                setProgress(0);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === idx ? 'w-8 bg-[#8AD65A] shadow-[0_0_8px_#76C945]' : 'w-2.5 bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>

        {/* Cinematic Auto-play line progress bar */}
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

      {/* Step-by-Step Full-Screen Checkout Overlay Wrapper */}
      {isCheckoutOpen && checkoutProduct && (
        <AnimatePresence>
          <CheckoutPage
            product={checkoutProduct}
            defaultSize={selectedSize}
            defaultQuantity={1}
            onClose={() => setIsCheckoutOpen(false)}
          />
        </AnimatePresence>
      )}

    </div>
  );
}
