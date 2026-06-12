import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CropFilter from '@/components/products/CropFilter';
import { useLanguage } from '@/lib/LanguageContext';
import { PRODUCTS_DATA } from '@/data/productsData';
import { useCart } from '@/lib/CartContext';
import SEOHead from '@/lib/seo/SEOHead';
import vitalAgroLogo from '@/assets/vital agro logo.webp';
import ProductSwipe3D from '@/components/sections/ProductSwipe3D';
import CheckoutPage from './Checkout';
import { AnimatePresence } from 'framer-motion';

const CheckoutWrapper = ({ product, isOpen, setIsOpen }) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <CheckoutPage
        product={product}
        onClose={() => setIsOpen(false)}
      />
    </AnimatePresence>
  );
};

// Psychological Pricing Helper: Rounds up price to end with 99
const formatPsychologicalPrice = (price) => {
  const val = Math.round(price);
  if (isNaN(val) || val <= 0) return 99;
  if (val % 100 === 99) return val;
  if (val % 100 === 0) return val + 99;
  return Math.ceil(val / 100) * 100 - 1;
};

// Category label mappings
const getCategoryLabel = (category) => {
  switch (category) {
    case 'insecticide': return 'INSECTICIDE';
    case 'herbicide': return 'HERBICIDE';
    case 'fungicide': return 'FUNGICIDE';
    case 'plant_nutrition': return 'PLANT NUTRITION';
    case 'growth_promoter': return 'GROWTH PROMOTER';
    default: return 'SPECIAL PRODUCT';
  }
};

// Apple-style color mapping themes for V13 Trillion-Dollar Experience
const PRODUCT_COLOR_THEMES = {
  "aaqaab": { glow: "rgba(59, 130, 246, 0.4)", particle: "#3b82f6", themeName: "Blue Cosmic" },
  "vac-zinc": { glow: "rgba(74, 222, 128, 0.4)", particle: "#4ade80", themeName: "Emerald Forest" },
  "dr-pp": { glow: "rgba(234, 179, 8, 0.4)", particle: "#eab308", themeName: "Golden Aurum" },
  "easy-grow": { glow: "rgba(236, 72, 153, 0.45)", particle: "#ec4899", themeName: "Neon Pink" },
  "purifizin": { glow: "rgba(249, 115, 22, 0.4)", particle: "#f97316", themeName: "Sunset Orange" },
  "fatty": { glow: "rgba(118, 201, 69, 0.4)", particle: "#76C945", themeName: "Vital Green" },
  "conference-gold": { glow: "rgba(197, 160, 89, 0.4)", particle: "#C5A059", themeName: "Classic Gold" },
  "output": { glow: "rgba(192, 132, 252, 0.4)", particle: "#c084fc", themeName: "Amethyst Violet" },
  "sector": { glow: "rgba(163, 230, 53, 0.4)", particle: "#a3e635", themeName: "Lime Volt" },
  "farbasin": { glow: "rgba(167, 139, 250, 0.4)", particle: "#a78bfa", themeName: "Periwinkle" },
  "super-4g": { glow: "rgba(244, 63, 94, 0.4)", particle: "#f43f5e", themeName: "Rose Spark" }
};

// 60FPS High Performance Rolling Number Price Counter
const RollingCardPrice = ({ price }) => {
  const [displayVal, setDisplayVal] = useState(price);

  useEffect(() => {
    let start = displayVal;
    const end = price;
    if (start === end) return;

    const duration = 400; // ms
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress); // easeOutQuad
      const current = Math.round(start + (end - start) * ease);
      setDisplayVal(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [price]);

  return <span>PKR {displayVal.toLocaleString()}</span>;
};

// Stripe-style Premium Slide to Add Cart Component
const SlideToCart = ({ onSlideSuccess, lang }) => {
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(240);

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth);
    }
  }, []);

  const handleSize = 40; // px
  const maxSlideDist = trackWidth - handleSize - 8;

  const handleDragEnd = (event, info) => {
    if (info.offset.x >= maxSlideDist * 0.78) {
      onSlideSuccess();
    }
  };

  return (
    <div 
      ref={trackRef} 
      className="relative w-full h-11 bg-white/5 rounded-2xl border border-white/10 flex items-center p-1 overflow-hidden select-none"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">
          {lang === 'en' ? '→ Slide to Add Cart' : '← سلائیڈ کر کے کارٹ میں ڈالیں'}
        </span>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: maxSlideDist > 0 ? maxSlideDist : 180 }}
        dragElastic={0.06}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 35 }}
        dragSnapToOrigin
        onDragEnd={handleDragEnd}
        className="w-9 h-9 bg-gradient-to-r from-[#76C945] to-[#5cb85c] hover:shadow-[0_0_12px_#76C945] text-[#0A2E1F] rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md transition-shadow duration-200 z-10"
      >
        <ShoppingBag size={14} className="pointer-events-none" />
      </motion.div>
    </div>
  );
};

// ProductGridCard — upgraded glassmorphic dark catalog card
const ProductGridCard = ({ product, openCheckout, lang }) => {
  const [qty, setQty] = useState(1);

  return (
    <motion.div
      className="group relative rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
      whileHover={{
        y: -4,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(92,184,92,0.15)',
      }}
      transition={{ duration: 0.3 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
    >
      {/* Top badges row */}
      <div className="flex justify-between items-center px-3 pt-3 pb-0">
        <span className="text-[9px] font-bold tracking-wider px-2 py-0.5
          rounded-full border border-white/10 text-white/40 uppercase">
          {product.badge || 'PRODUCT'}
        </span>
        <span className="text-[9px] font-bold tracking-wider text-[#5cb85c] uppercase font-black">
          {product.category}
        </span>
      </div>

      {/* Product Image — larger, better centered */}
      <div className="relative flex items-center justify-center py-5 px-4 h-40">
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100
            transition-opacity duration-500"
          style={{
            background: 'radial-gradient(circle at 50% 70%, rgba(92,184,92,0.08) 0%, transparent 70%)',
          }}
        />
        <motion.img
          src={product.image}
          alt={`${product.name} - ${product.category}`}
          className="h-32 w-full object-contain relative z-10"
          style={{
            filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.4))',
          }}
          whileHover={{ scale: 1.08, y: -4 }}
          transition={{ duration: 0.4 }}
          loading="lazy"
          width="200"
          height="128"
        />
      </div>

      {/* Info */}
      <div className="px-3 pb-3 flex-1 flex flex-col justify-between">
        <div>
          {/* Product name */}
          <h3 className="text-white font-extrabold text-sm leading-tight truncate">
            {product.name}
          </h3>
          <p className="text-white/35 text-[10px] mt-0.5 mb-2 truncate font-mono">
            {product.formula}
          </p>

          {/* Size pills */}
          <div className="flex gap-1 mb-3 flex-wrap">
            {product.sizes?.slice(0, 3).map(size => (
              <span key={size}
                className="px-2 py-0.5 rounded-lg text-[9px] font-black
                  bg-white/5 border border-white/10 text-white/50">
                {size}
              </span>
            ))}
          </div>
        </div>

        <div>
          {/* Price + Quantity */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[#5cb85c] font-black text-base font-mono">
                PKR {product.price?.toLocaleString()}
              </span>
              <p className="text-[#5cb85c]/60 text-[9px] font-bold tracking-wider">IN STOCK</p>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 rounded-full border border-white/10 p-0.5">
              <button 
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-6 h-6 rounded-full bg-white/5 hover:bg-white/10 text-white/70 text-sm flex items-center justify-center transition-colors font-bold"
              >
                −
              </button>
              <span className="text-white text-xs font-black w-4 text-center font-mono">{qty}</span>
              <button 
                onClick={() => setQty(q => q + 1)}
                className="w-6 h-6 rounded-full bg-[#2d6a2d] hover:bg-[#3d8c3d] text-white text-sm flex items-center justify-center transition-colors font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* BUY NOW COD Button */}
          <motion.button
            onClick={() => openCheckout({ ...product, defaultQty: qty })}
            whileTap={{ scale: 0.97 }}
            className="w-full py-2.5 rounded-xl font-black text-xs text-white uppercase tracking-wider
              bg-gradient-to-r from-[#1e5c1e] to-[#2d6a2d]
              border border-[rgba(92,184,92,0.3)]
              hover:shadow-[0_0_20px_rgba(92,184,92,0.25)] transition-all duration-300"
          >
            🛒 {lang === 'en' ? 'BUY NOW (COD)' : 'ابھی خریدیں (COD)'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Main Products Explorer View
export default function Products() {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [activeCrop, setActiveCrop] = useState(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [phIdx, setPhIdx] = useState(0);

  const containerRef = useRef(null);

  // Dynamic Fading Placeholder Texts
  const PLACEHOLDERS = [
    "Search premium insecticides...",
    "Search high-efficacy fungicides...",
    "Search imported herbicides...",
    "Search plant nutrients...",
    "Search Vital-C, Aaqaab..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPhIdx((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('vital_agro_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const toggleWishlist = (slug) => {
    setWishlist((prev) => {
      const next = prev.includes(slug)
        ? prev.filter((item) => item !== slug)
        : [...prev, slug];
      localStorage.setItem('vital_agro_wishlist', JSON.stringify(next));
      return next;
    });
  };

  const isRTL = lang === 'ur';

  const CATEGORY_LABELS = {
    all: lang === 'en' ? 'All Products' : 'تمام مصنوعات',
    insecticide: t.categories.insecticide,
    herbicide: t.categories.herbicide,
    fungicide: t.categories.fungicide,
    plant_nutrition: t.categories.plant_nutrition,
    growth_promoter: t.categories.growth_promoter,
    special_product: t.categories.special_product,
  };

  const products = useMemo(() => {
    return Object.values(PRODUCTS_DATA).filter(p => p.id);
  }, []);

  const [checkoutProduct, setCheckoutProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const openCheckout = (product) => {
    setCheckoutProduct(product);
    setIsCheckoutOpen(true);
  };

  const mappedProducts = useMemo(() => {
    return products.map(p => {
      const sizeInfo = p.sizes?.[0] || {};
      const price = sizeInfo.price || p.price || 999;
      const originalPrice = sizeInfo.oldPrice || null;
      const discount = sizeInfo.discount || (originalPrice ? Math.round((1 - price / originalPrice) * 100) : null);
      
      const categoryLabel = getCategoryLabel(p.category);
      const sizesList = p.sizes ? p.sizes.map(s => typeof s === 'object' ? s.size : s) : [p.packaging || '100ML'];

      return {
        ...p,
        name: typeof p.name === 'object' ? (p.name[lang] || p.name.en) : p.name,
        formula: p.activeIngredient || p.formulation || "",
        image: p.pngUrl || p.imageUrl,
        price,
        originalPrice,
        discount,
        category: categoryLabel,
        sizes: sizesList,
      };
    });
  }, [products, lang]);

  // Filter products matching active criteria
  const filtered = useMemo(() => {
    return mappedProducts.filter(p => {
      const matchCat = category === 'all' || p.category.toLowerCase().replace(' ', '_') === category;
      
      const searchLower = search.toLowerCase();
      const matchSearch = !search || 
        p.name.toLowerCase().includes(searchLower) ||
        p.description[lang].toLowerCase().includes(searchLower) ||
        p.activeIngredient.toLowerCase().includes(searchLower);

      const matchCrop = !activeCrop || activeCrop.keywords.some(kw =>
        p.crops?.some(c => c.name.en.toLowerCase().includes(kw) || c.name.ur.includes(kw)) ||
        p.description.en.toLowerCase().includes(kw) ||
        p.description.ur.includes(kw) ||
        p.name.toLowerCase().includes(kw)
      );
      
      return matchCat && matchSearch && matchCrop;
    });
  }, [mappedProducts, category, search, activeCrop, lang]);

  const bgStyle = {
    bg: "radial-gradient(circle at center, #02140c 0%, #000000 100%)",
    glow: "rgba(92, 184, 92, 0.15)",
    particleColor: "#5cb85c"
  };

  return (
    <div 
      className="min-h-screen pt-20 text-white font-body transition-all duration-1000 overflow-x-hidden relative bg-[#0a1f0a]"
      style={{ background: bgStyle.bg }}
    >
      <SEOHead
        title="Agricultural Products | Insecticides, Herbicides, Fungicides"
        description="Shop Vital Agro's complete range: Conference Gold, Fatty, Easy Grow, AAQAAB & more. Premium imported formulations for maximum crop yields."
        url="https://vital-agro.vercel.app/products"
        keywords="buy insecticide Pakistan, herbicide online, fungicide price Pakistan, agricultural chemicals COD"
      />

      {/* Dynamic Stripe-Inspired Mesh Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -40, 50, 0],
            scale: [1, 1.15, 0.9, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full blur-[100px] sm:blur-[130px] opacity-40 -top-40 -left-20"
          style={{ backgroundColor: bgStyle.particleColor + '22' }}
        />
        <motion.div 
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 60, -30, 0],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full blur-[100px] sm:blur-[130px] opacity-30 -bottom-40 -right-20"
          style={{ backgroundColor: bgStyle.particleColor + '18' }}
        />
      </div>

      {/* Noise overlay filter */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Ambient Glow Aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 z-0"
        style={{ backgroundColor: bgStyle.glow, opacity: 0.45 }}
      />
      
      {/* Page Header */}
      <section className="relative py-10 overflow-hidden z-10 select-none">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            {/* Logo cluster */}
            <div className="inline-block bg-white/5 backdrop-blur-md rounded-2xl px-5 py-2 border border-white/10">
              <img
                src={vitalAgroLogo}
                alt="Vital Agro Logo"
                className="h-10 sm:h-12 w-auto mx-auto object-contain"
              />
            </div>
            <span className="text-[10px] font-black tracking-widest uppercase text-[#76C945] block">
              {lang === 'en' ? 'Apple Store Premium Catalog' : 'پریمیئم پراڈکٹ کیٹلاگ'}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
              {lang === 'en' ? 'Product Explorer' : 'زرعی مصنوعات اور حل'}
            </h1>
            <p className="text-white/60 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
              {lang === 'en' 
                ? 'Discover our high-efficacy formulas utilizing imported formulations. Swipe or scroll horizontally to inspect profiles.'
                : 'ہماری بہترین کوالٹی کی کیڑے مار ادویات، فنگس کش، اور پلانٹ نیوٹریشن دیکھیں۔'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3D Swipe Showroom Hero (Top of Products Page) */}
      <ProductSwipe3D products={mappedProducts} openCheckout={openCheckout} />

      {/* Sticky Filtering Bar: Apple Store Navigation Pills */}
      <section className="py-4 border-y border-white/5 sticky top-20 z-30 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            
            {/* Category selection pills with horizontal scroll */}
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 w-full lg:w-auto flex-nowrap whitespace-nowrap select-none">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={`px-4.5 py-2.5 rounded-full text-xs font-black transition-all flex-shrink-0 ${
                    category === key
                      ? 'bg-white text-black shadow-lg shadow-white/10 scale-102'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white hover:scale-102'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Keyword Search Input with Dynamic placeholder transition */}
            <div className="relative w-full lg:w-80">
              <Search className={`absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 w-4 h-4 text-white/40`} />
              <Input
                placeholder={PLACEHOLDERS[phIdx]}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`h-11 border-white/10 focus:border-[#76C945] rounded-full focus:ring-2 focus:ring-[#76C945]/20 bg-white/5 text-white placeholder-white/35 transition-all ${isRTL ? "pr-11 pl-4 text-right" : "pl-11 pr-4"}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Crop Filter Selection inside premium glass container */}
      <section className="py-4 z-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/[0.03] p-4.5 sm:p-5 rounded-3xl border border-white/10 backdrop-blur-md shadow-xl">
          <CropFilter onCropSelect={setActiveCrop} activeCrop={activeCrop} />
        </div>
      </section>

      {/* Catalog grid section */}
      <section className="py-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fadeIn">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductGridCard
                  key={product.slug}
                  product={product}
                  openCheckout={openCheckout}
                  lang={lang}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 p-8 max-w-xl mx-auto shadow-2xl backdrop-blur-md">
              <p className="text-white/60 text-sm font-bold">
                {lang === 'en' ? 'No premium products found matching your filters.' : 'آپ کے معیار کے مطابق کوئی مصنوعات نہیں ملیں۔'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Checkout Wrapper */}
      {checkoutProduct && isCheckoutOpen && (
        <CheckoutWrapper
          key={checkoutProduct.slug}
          product={checkoutProduct}
          isOpen={isCheckoutOpen}
          setIsOpen={setIsCheckoutOpen}
        />
      )}
    </div>
  );
}