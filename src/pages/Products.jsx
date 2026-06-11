import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import CropFilter from '@/components/products/CropFilter';
import { useLanguage } from '@/lib/LanguageContext';
import { PRODUCTS_DATA } from '@/data/productsData';
import { useCart } from '@/lib/CartContext';
import { useToast } from '@/components/ui/use-toast';
import useVideoAutoplay from '@/hooks/useVideoAutoplay';
import CODWhatsAppButton from '@/components/CODWhatsApp/CODWhatsAppButton';
import SEOHead from '@/lib/seo/SEOHead';

// Import Assets
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
      // easeOutQuad curve
      const ease = progress * (2 - progress);
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
  const maxSlideDist = trackWidth - handleSize - 8; // Adjust for left/right paddings

  const handleDragEnd = (event, info) => {
    if (info.offset.x >= maxSlideDist * 0.82) {
      onSlideSuccess();
    }
  };

  return (
    <div 
      ref={trackRef} 
      className="relative w-full h-12 bg-white/5 rounded-full border border-white/10 flex items-center p-1 overflow-hidden"
    >
      {/* Slider Label Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[10px] font-black text-white/50 uppercase tracking-widest hidden sm:inline-block">
          {lang === 'en' ? '← Slide to Add Cart →' : '← سلائیڈ کر کے کارٹ میں ڈالیں →'}
        </span>
        <span className="text-[10px] font-black text-white/50 uppercase tracking-widest sm:hidden inline-block">
          {lang === 'en' ? '← Slide →' : '← سلائیڈ کریں →'}
        </span>
      </div>

      {/* Draggable knob handle */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: maxSlideDist > 0 ? maxSlideDist : 180 }}
        dragElastic={0.08}
        dragTransition={{ bounceStiffness: 600, bounceDamping: 35 }}
        dragSnapToOrigin
        onDragEnd={handleDragEnd}
        className="w-10 h-10 bg-[#76C945] hover:bg-[#8AD65A] text-[#0A2E1F] rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md transition-colors duration-200 z-10 font-bold"
      >
        →
      </motion.div>
    </div>
  );
};

// Redesigned Apple Store Product Card
const ProductCard = ({ product, index, lang, wishlist, toggleWishlist, addToCart }) => {
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const { toast } = useToast();

  const sizes = product.sizes || [];
  const currentSize = sizes[sizeIdx] || { size: product.packaging, price: 999, oldPrice: 1299, sku: product.productCode, stockStatus: 'In Stock' };

  // Calculate dynamic marketing badge (NEW, HOT, BEST SELLER, LIMITED)
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
    setQty(1); // Reset quantity
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    toggleWishlist(product.slug);
    toast({
      title: isWishlisted ? (lang === 'en' ? "Removed from Wishlist" : "خواہش کی فہرست سے نکال دیا گیا") : (lang === 'en' ? "Added to Wishlist" : "خواہش کی فہرست میں شامل کیا گیا"),
      description: `${product.name[lang]} has been ${isWishlisted ? 'removed from' : 'added to'} your wishlist.`
    });
  };

  return (
    <div className="relative w-full max-w-[320px] h-[520px] md:max-w-[280px] md:h-[500px] xl:max-w-[320px] xl:h-[520px] bg-white/[0.03] rounded-[26px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] hover:shadow-[0_30px_60px_rgba(118,201,69,0.15)] hover:border-[#76C945]/35 p-5 flex flex-col justify-between transition-all duration-300 overflow-hidden group select-none bg-gradient-to-b from-white/[0.04] to-white/[0.01] text-white">
      
      {/* Top badges bar */}
      <div className="flex justify-between items-center z-10">
        <span className="px-2.5 py-0.5 rounded-md bg-white/10 text-white/80 text-[9px] font-black uppercase tracking-wider">
          {promoBadge}
        </span>
        <span className="text-[9px] font-black text-[#76C945] tracking-widest">
          {getCategoryLabel(product.category)}
        </span>
      </div>

      {/* Main product PNG (Center Floating Area) */}
      <Link 
        to={`/products/${product.slug}`}
        className="relative flex-1 flex items-center justify-center max-h-[200px] sm:max-h-[220px] my-3 overflow-hidden cursor-pointer"
      >
        <motion.img
          src={product.pngUrl || product.imageUrl}
          alt={`${product.name.en} ${getCategoryLabel(product.category)} - ${product.activeIngredient || product.formulation || ''} - Vital Agro Pakistan`}
          className="max-h-full w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)]"
          whileHover={{ 
            scale: 1.06, 
            rotate: index % 2 === 0 ? 3 : -3,
            y: -5
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          loading="lazy"
          width="400"
          height="400"
        />
      </Link>

      {/* Product Information */}
      <div className="space-y-1">
        <Link 
          to={`/products/${product.slug}`}
          className="font-black text-xl text-white leading-tight block truncate hover:text-[#76C945] transition-colors"
        >
          {product.name[lang]}
        </Link>
        <span className="text-[10px] text-white/50 font-bold block truncate max-w-full">
          {product.genericName[lang] || product.genericName.en}
        </span>
      </div>

      {/* Pack Size pill selector */}
      {sizes.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2.5">
          {sizes.slice(0, 4).map((sz, idx) => (
            <button
              key={idx}
              onClick={() => setSizeIdx(idx)}
              className={`px-2 py-1 rounded-md text-[9px] font-black border transition-all ${
                sizeIdx === idx
                  ? 'bg-[#76C945] text-[#0A2E1F] border-[#76C945]'
                  : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
              }`}
            >
              {sz.size}
            </button>
          ))}
        </div>
      )}

      {/* Price & Quantity controllers row */}
      <div className="flex items-center justify-between border-t border-white/5 pt-3.5 mt-3">
        {/* Rolling price */}
        <div className="flex flex-col">
          <span className="text-lg font-black text-[#76C945] font-mono tracking-tight">
            <RollingCardPrice price={displayedPrice} />
          </span>
          <span className="text-[8px] font-black text-[#76C945] uppercase tracking-wider">
            {currentSize.stockStatus === 'In Stock' ? 'IN STOCK' : 'LOW STOCK'}
          </span>
        </div>

        {/* Quantity control [-] 1 [+] */}
        <div className="flex items-center gap-2 bg-white/5 rounded-lg border border-white/10 p-0.5">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="w-6 h-6 rounded-md bg-white/10 hover:bg-[#76C945]/20 flex items-center justify-center text-xs text-white font-bold transition-all active:scale-90"
          >
            -
          </button>
          <span className="w-5 text-center text-xs font-black text-white font-mono">{qty}</span>
          <button
            onClick={() => setQty(q => q + 1)}
            className="w-6 h-6 rounded-md bg-white/10 hover:bg-[#76C945]/20 flex items-center justify-center text-xs text-white font-bold transition-all active:scale-90"
          >
            +
          </button>
        </div>
      </div>

      {/* Bottom action bar with COD button */}
      <div className="flex items-center gap-3.5 border-t border-white/5 pt-3.5 mt-3">
        {/* Wishlist Heart Icon */}
        <button
          onClick={handleWishlistClick}
          className={`p-2 rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center ${
            isWishlisted
              ? 'border-red-500 bg-red-500/10 text-red-500'
              : 'border-white/10 hover:bg-white/10 text-white/70'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* COD WhatsApp Button */}
        <div className="flex-1">
          <CODWhatsAppButton
            product={product}
            defaultSize={currentSize.size}
            defaultQuantity={qty}
            className="py-3 text-xs"
          />
        </div>
      </div>

    </div>
  );
};

export default function Products() {
  const { lang, t } = useLanguage();
  const { addToCart } = useCart();
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [activeCrop, setActiveCrop] = useState(null);
  
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

  const videoRef = useRef(null);
  useVideoAutoplay(videoRef);

  const isRTL = lang === 'ur';

  // Dynamic translated category labels
  const CATEGORY_LABELS = {
    all: lang === 'en' ? 'All Products' : 'تمام مصنوعات',
    insecticide: t.categories.insecticide,
    herbicide: t.categories.herbicide,
    fungicide: t.categories.fungicide,
    plant_nutrition: t.categories.plant_nutrition,
    growth_promoter: t.categories.growth_promoter,
    special_product: t.categories.special_product,
  };

  // Static high-fidelity products with updated sizes pricing database
  const products = useMemo(() => {
    return Object.values(PRODUCTS_DATA).filter(p => p.id);
  }, []);

  // Filtering calculations
  const filtered = products.filter(p => {
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

  return (
    <div className="min-h-screen pt-20 bg-[#02140c] text-white font-body">
      <SEOHead
        title="Agricultural Products | Insecticides, Herbicides, Fungicides"
        description="Shop Vital Agro's complete range: Conference Gold, Fatty, Easy Grow, AAQAAB & more. Premium imported formulations for maximum crop yields."
        url="https://vital-agro.vercel.app/products"
        keywords="buy insecticide Pakistan, herbicide online, fungicide price Pakistan, agricultural chemicals COD"
      />
      
      {/* 1. Page Header: Dark Green premium backdrop */}
      <section className="relative py-20 overflow-hidden bg-[#02140c] border-b border-white/5">
        
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <div className="absolute w-[350px] h-[350px] top-[-10%] left-[-10%] bg-[#76C945]/10 rounded-full filter blur-[100px]" />
          <div className="absolute w-[350px] h-[350px] bottom-[-10%] right-[-10%] bg-[#C5A059]/5 rounded-full filter blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo cluster */}
            <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-5 py-2 mb-4 border border-white/10">
              <img
                src={vitalAgroLogo}
                alt="Vital Agro Logo"
                className="h-10 sm:h-12 w-auto mx-auto object-contain"
              />
            </div>
            <span className="text-xs font-black tracking-widest uppercase text-[#76C945] block mt-2">
              {lang === 'en' ? 'Apple Store Premium Catalog' : 'پریمیئم پراڈکٹ کیٹلاگ'}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-4 tracking-tight leading-none">
              {lang === 'en' ? 'Agricultural Products' : 'زرعی مصنوعات اور حل'}
            </h1>
            <p className="text-white/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {lang === 'en' 
                ? 'Discover our high-efficacy formulas utilizing imported formulations for maximum crop yields.'
                : 'ہماری بہترین کوالٹی کی کیڑے مار ادویات، فنگس کش، اور پلانٹ نیوٹریشن دیکھیں۔'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Sticky Filtering Bar: Apple Store Navigation Pills */}
      <section className="py-6 border-b border-white/5 sticky top-20 z-30 bg-[#02140c]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Category selection pills with horizontal scroll */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 w-full lg:w-auto flex-nowrap whitespace-nowrap select-none">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={`px-4.5 py-2.5 rounded-full text-xs font-black transition-all flex-shrink-0 ${
                    category === key
                      ? 'bg-[#76C945] text-[#0A2E1F] shadow-lg shadow-[#76C945]/20'
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

      {/* 3. Products Catalog Grid Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Crop Filter Selection */}
          <div className="mb-10 bg-white/5 p-6 rounded-3xl border border-white/10 shadow-2xl backdrop-blur-md">
            <CropFilter onCropSelect={setActiveCrop} activeCrop={activeCrop} />
          </div>
          
          {/* Animated Products Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={category + search + lang + (activeCrop ? activeCrop.name : '')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center"
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03, duration: 0.5 }}
                >
                  <ProductCard
                    product={product}
                    index={i}
                    lang={lang}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                    addToCart={addToCart}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state details */}
          {filtered.length === 0 && (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 p-8 max-w-xl mx-auto shadow-2xl backdrop-blur-md">
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