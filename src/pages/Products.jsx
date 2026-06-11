import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Heart, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CropFilter from '@/components/products/CropFilter';
import { useLanguage } from '@/lib/LanguageContext';
import { PRODUCTS_DATA } from '@/data/productsData';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/components/ui/use-toast';
import CODWhatsAppButton from '@/components/CODWhatsApp/CODWhatsAppButton';
import SEOHead from '@/lib/seo/SEOHead';
import vitalAgroLogo from '@/assets/vital agro logo.webp';

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

// Apple-style color mapping themes for V10 Ultra Premium Glow Experience
const PRODUCT_COLOR_THEMES = {
  "aaqaab": { glow: "rgba(59, 130, 246, 0.4)", particle: "#3b82f6", themeName: "Blue Space" },
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

// Apple Style Slide to Add Cart Component
const SlideToCart = ({ onSlideSuccess, lang }) => {
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(240);

  useEffect(() => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth);
    }
  }, []);

  const handleSize = 42; // px
  const maxSlideDist = trackWidth - handleSize - 8;

  const handleDragEnd = (event, info) => {
    if (info.offset.x >= maxSlideDist * 0.8) {
      onSlideSuccess();
    }
  };

  return (
    <div 
      ref={trackRef} 
      className="relative w-full h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center p-1 overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">
          {lang === 'en' ? '→ Slide to Add Cart' : '← سلائیڈ کر کے کارٹ میں ڈالیں'}
        </span>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: maxSlideDist > 0 ? maxSlideDist : 180 }}
        dragElastic={0.08}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 35 }}
        dragSnapToOrigin
        onDragEnd={handleDragEnd}
        className="w-10 h-10 bg-[#76C945] hover:bg-[#8AD65A] text-[#0A2E1F] rounded-xl flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md transition-colors duration-200 z-10 font-bold"
      >
        <ShoppingBag size={16} />
      </motion.div>
    </div>
  );
};

// Premium Apple-Style Product Explorer Card Component
const ProductCard = ({ product, index, lang, wishlist, toggleWishlist, addToCart }) => {
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const { toast } = useToast();

  const sizes = product.sizes || [];
  const currentSize = sizes[sizeIdx] || { size: product.packaging, price: 999, oldPrice: 1299, sku: product.productCode, stockStatus: 'In Stock' };

  const promoBadge = useMemo(() => {
    if (product.featured) return "BEST SELLER";
    const badgesList = ["NEW", "HOT", "LIMITED", "BEST SELLER"];
    return badgesList[index % badgesList.length];
  }, [product, index]);

  const displayedPrice = formatPsychologicalPrice(currentSize.price);
  const isWishlisted = wishlist.includes(product.slug);

  const handleSlideSuccess = () => {
    addToCart(product, currentSize, qty);
    toast({
      title: lang === 'en' ? "Added to Cart" : "کارٹ میں شامل کر دیا گیا",
      description: `${qty}x ${product.name[lang]} (${currentSize.size}) added to your checkout drawer.`
    });
    setQty(1);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    toggleWishlist(product.slug);
    toast({
      title: isWishlisted 
        ? (lang === 'en' ? "Removed from Wishlist" : "خواہش کی فہرست سے خارج") 
        : (lang === 'en' ? "Added to Wishlist" : "خواہش کی فہرست میں شامل"),
      description: `${product.name[lang]} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`
    });
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: x * 18, y: y * 18 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const activeTheme = PRODUCT_COLOR_THEMES[product.slug] || PRODUCT_COLOR_THEMES["fatty"];

  return (
    <div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="product-explorer-card w-[310px] sm:w-[370px] h-[585px] flex-shrink-0 snap-center rounded-[32px] p-6 bg-gradient-to-b from-white/[0.06] to-white/[0.01] border border-white/10 backdrop-blur-3xl shadow-[0_25px_50px_rgba(0,0,0,0.5)] hover:shadow-[0_35px_60px_rgba(0,0,0,0.8)] hover:border-white/20 flex flex-col justify-between transition-all duration-500 overflow-hidden relative group select-none text-white"
    >
      {/* Background themed glow orb */}
      <div 
        className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-[65px] pointer-events-none opacity-25 group-hover:opacity-40 transition-all duration-700 group-hover:scale-125"
        style={{ backgroundColor: activeTheme.particle }}
      />

      {/* Header bar within card */}
      <div className="flex justify-between items-center z-10">
        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-[10px] font-black uppercase tracking-widest">
          {promoBadge}
        </span>
        <span className="text-[10px] font-black tracking-widest" style={{ color: activeTheme.particle }}>
          {getCategoryLabel(product.category)}
        </span>
      </div>

      {/* Floating Interactive 3D Image Area */}
      <Link 
        to={`/products/${product.slug}`}
        className="relative flex-1 flex items-center justify-center max-h-[230px] my-3 overflow-visible cursor-pointer z-10"
      >
        <motion.div
          animate={{
            x: mouseOffset.x,
            y: mouseOffset.y,
            rotateX: -mouseOffset.y * 1.5,
            rotateY: mouseOffset.x * 1.5
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="relative w-[70%] h-full flex items-center justify-center"
        >
          {/* Subtle bottom shadow under the bottle */}
          <div className="absolute -bottom-2 w-[80%] h-4 bg-black/40 rounded-full blur-[8px] pointer-events-none" />
          
          <img
            src={product.pngUrl || product.imageUrl}
            alt={product.name[lang]}
            className="max-h-full w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </motion.div>
      </Link>

      {/* Info block */}
      <div className="space-y-1 z-10">
        <Link 
          to={`/products/${product.slug}`}
          className="font-black text-2xl text-white leading-tight block truncate hover:text-[#8AD65A] transition-colors"
        >
          {product.name[lang]}
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/50 font-bold block truncate max-w-[200px]">
            {product.genericName[lang] || product.genericName.en}
          </span>
          {product.formulation && (
            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 font-mono text-[9px] text-white/60">
              {product.formulation}
            </span>
          )}
        </div>
      </div>

      {/* Sizes list */}
      {sizes.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2.5 z-10">
          {sizes.slice(0, 4).map((sz, idx) => (
            <button
              key={idx}
              onClick={() => setSizeIdx(idx)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black border transition-all ${
                sizeIdx === idx
                  ? 'bg-white text-black border-white shadow-lg'
                  : 'bg-white/5 text-white/70 border-white/5 hover:bg-white/10 hover:border-white/10'
              }`}
            >
              {sz.size}
            </button>
          ))}
        </div>
      )}

      {/* Price row */}
      <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-3 z-10">
        <div className="flex flex-col">
          <span className="text-xl font-black font-mono tracking-tight text-[#8AD65A]">
            <RollingCardPrice price={displayedPrice} />
          </span>
          <span className="text-[9px] font-black uppercase tracking-widest mt-0.5" style={{ color: activeTheme.particle }}>
            {currentSize.stockStatus === 'In Stock' ? 'IN STOCK' : 'LOW STOCK'}
          </span>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-2 bg-white/5 rounded-xl border border-white/10 p-1">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-sm text-white font-black transition-all active:scale-90"
          >
            -
          </button>
          <span className="w-5 text-center text-sm font-black text-white font-mono">{qty}</span>
          <button
            onClick={() => setQty(q => q + 1)}
            className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-sm text-white font-black transition-all active:scale-90"
          >
            +
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3.5 z-10 flex gap-2.5 items-center">
        {/* Wishlist toggle */}
        <button
          onClick={handleWishlistClick}
          className={`p-3 rounded-2xl border transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center ${
            isWishlisted
              ? 'border-red-500 bg-red-500/10 text-red-500'
              : 'border-white/10 hover:bg-white/10 text-white/70'
          }`}
        >
          <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* COD WhatsApp Button */}
        <div className="flex-1">
          <CODWhatsAppButton
            product={product}
            defaultSize={currentSize.size}
            defaultQuantity={qty}
            className="py-3 text-xs font-black rounded-2xl bg-green-600/10 hover:bg-green-600/20 border border-green-500/20 text-green-400"
          />
        </div>
      </div>

      <div className="mt-2.5 z-10">
        <SlideToCart onSlideSuccess={handleSlideSuccess} lang={lang} />
      </div>
    </div>
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

  const containerRef = useRef(null);

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

  // Filter products matching active criteria
  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchCat = category === 'all' || p.category === category;
      
      const searchLower = search.toLowerCase();
      const matchSearch = !search || 
        p.name[lang].toLowerCase().includes(searchLower) ||
        p.description[lang].toLowerCase().includes(searchLower) ||
        p.activeIngredient.toLowerCase().includes(searchLower);

      const matchCrop = !activeCrop || activeCrop.keywords.some(kw =>
        p.crops?.some(c => c.name.en.toLowerCase().includes(kw) || c.name.ur.includes(kw)) ||
        p.description.en.toLowerCase().includes(kw) ||
        p.description.ur.includes(kw) ||
        p.name.en.toLowerCase().includes(kw)
      );
      
      return matchCat && matchSearch && matchCrop;
    });
  }, [products, category, search, activeCrop, lang]);

  const activeProduct = filtered[activeIdx];

  // Dynamically compute layout background details from current card
  const bgStyle = useMemo(() => {
    if (!activeProduct) {
      return {
        bg: "radial-gradient(circle at center, #02140c 0%, #000000 100%)",
        glow: "rgba(118, 201, 69, 0.25)",
        particleColor: "#76C945"
      };
    }
    const theme = PRODUCT_COLOR_THEMES[activeProduct.slug] || PRODUCT_COLOR_THEMES["fatty"];
    return {
      bg: `radial-gradient(circle at center, ${theme.glow.replace('0.4', '0.07')} 0%, #010604 100%)`,
      glow: theme.glow,
      particleColor: theme.particle
    };
  }, [activeProduct]);

  // Track currently centered product index via scroll listener
  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const cards = container.querySelectorAll('.product-explorer-card');
    if (!cards || cards.length === 0) return;

    const containerCenter = container.scrollLeft + container.offsetWidth / 2;
    let closestIdx = 0;
    let minDiff = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(containerCenter - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    if (closestIdx >= 0 && closestIdx < filtered.length && closestIdx !== activeIdx) {
      setActiveIdx(closestIdx);
    }
  };

  // Setup scroll listener on lane
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [filtered, activeIdx]);

  // Reset indices on filtering changes
  useEffect(() => {
    setActiveIdx(0);
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0;
    }
  }, [category, search, activeCrop]);

  const scrollLane = (dir) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const card = container.querySelector('.product-explorer-card');
    if (!card) return;
    const scrollAmount = (card.offsetWidth + 32) * dir;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div 
      className="min-h-screen pt-20 text-white font-body transition-all duration-1000 overflow-x-hidden relative"
      style={{ background: bgStyle.bg }}
    >
      <SEOHead
        title="Agricultural Products | Insecticides, Herbicides, Fungicides"
        description="Shop Vital Agro's complete range: Conference Gold, Fatty, Easy Grow, AAQAAB & more. Premium imported formulations for maximum crop yields."
        url="https://vital-agro.vercel.app/products"
        keywords="buy insecticide Pakistan, herbicide online, fungicide price Pakistan, agricultural chemicals COD"
      />

      {/* Background Floating Particles mapping the active theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              backgroundColor: bgStyle.particleColor,
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              boxShadow: `0 0 20px ${bgStyle.particleColor}`
            }}
            animate={{
              y: [0, Math.random() * -150 - 50],
              x: [0, Math.random() * 50 - 25],
              opacity: [0.1, 0.35, 0]
            }}
            transition={{
              duration: Math.random() * 6 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 4
            }}
          />
        ))}
      </div>

      {/* Ambient Glow Aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 z-0"
        style={{ backgroundColor: bgStyle.glow, opacity: 0.5 }}
      />
      
      {/* Page Header: Dark Green premium backdrop */}
      <section className="relative py-12 overflow-hidden z-10">
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
            <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              {lang === 'en' 
                ? 'Discover our high-efficacy formulas utilizing imported formulations. Swipe or scroll horizontally to inspect profiles.'
                : 'ہماری بہترین کوالٹی کی کیڑے مار ادویات، فنگس کش، اور پلانٹ نیوٹریشن دیکھیں۔'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky Filtering Bar: Apple Store Navigation Pills */}
      <section className="py-5 border-y border-white/5 sticky top-20 z-30 bg-black/60 backdrop-blur-xl">
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
                      ? 'bg-white text-black shadow-lg shadow-white/10'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className={`absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 w-4 h-4 text-white/40`} />
              <Input
                placeholder={lang === 'en' ? "Search premium products..." : "پروڈکٹ تلاش کریں..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`h-11 border-white/10 focus:border-[#76C945] rounded-full focus:ring-2 focus:ring-[#76C945]/20 bg-white/5 text-white placeholder-white/35 ${isRTL ? "pr-11 pl-4 text-right" : "pl-11 pr-4"}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Crop Filter Selection inside premium glass container */}
      <section className="py-6 z-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/[0.03] p-5 rounded-3xl border border-white/10 backdrop-blur-md shadow-xl">
          <CropFilter onCropSelect={setActiveCrop} activeCrop={activeCrop} />
        </div>
      </section>

      {/* Horizontal Product Explorer Section */}
      <section className="py-10 relative z-20 overflow-visible">
        <div className="max-w-7xl mx-auto relative px-4 sm:px-6 lg:px-8">
          
          {/* Active Product Theme Indicator Badge */}
          {filtered.length > 0 && activeProduct && (
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: bgStyle.particleColor }} />
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                Vision Aura: <span className="font-bold text-white" style={{ color: bgStyle.particleColor }}>{PRODUCT_COLOR_THEMES[activeProduct.slug]?.themeName || "Vital Green"}</span>
              </span>
            </div>
          )}

          {/* Explorer Lane Container */}
          <div className="relative group/lane">
            {/* Arrow Overlays for desktop */}
            {filtered.length > 0 && (
              <>
                <button
                  onClick={() => scrollLane(-1)}
                  className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/50 hover:bg-black/75 border border-white/10 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-30 opacity-0 group-hover/lane:opacity-100 shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer hidden md:flex"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={() => scrollLane(1)}
                  className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-black/50 hover:bg-black/75 border border-white/10 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-30 opacity-0 group-hover/lane:opacity-100 shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer hidden md:flex"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Horizontal Snap Row */}
            <div 
              ref={containerRef}
              className="flex overflow-x-auto snap-x snap-mandatory gap-8 py-6 px-2 md:px-6 scrollbar-none scroll-smooth relative z-20 w-full"
              style={{ scrollPaddingLeft: '1rem', scrollPaddingRight: '1rem' }}
            >
              {filtered.map((product, i) => (
                <div
                  key={product.slug}
                  className="snap-center flex-shrink-0"
                >
                  <ProductCard
                    product={product}
                    index={i}
                    lang={lang}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                    addToCart={addToCart}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator showing the active scroll position */}
          {filtered.length > 1 && (
            <div className="flex justify-center gap-2 mt-8 z-20 relative select-none">
              {filtered.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (containerRef.current) {
                      const container = containerRef.current;
                      const card = container.querySelector('.product-explorer-card');
                      if (card) {
                        container.scrollTo({
                          left: (card.offsetWidth + 32) * idx,
                          behavior: 'smooth'
                        });
                        setActiveIdx(idx);
                      }
                    }
                  }}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    activeIdx === idx 
                      ? 'w-8 bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]' 
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Empty state details */}
          {filtered.length === 0 && (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 p-8 max-w-xl mx-auto shadow-2xl backdrop-blur-md z-20 relative">
              <p className="text-white/60 text-sm font-bold">
                {lang === 'en' ? 'No premium products found matching your filters.' : 'آپ کے معیار کے مطابق کوئی مصنوعات نہیں ملیں۔'}
              </p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}