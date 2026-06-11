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

  return <span>Rs.{displayVal.toLocaleString()}</span>;
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
      className="relative w-full h-12 bg-[#0A2E1F]/5 rounded-full border border-[#0A2E1F]/10 flex items-center p-1 overflow-hidden"
    >
      {/* Slider Label Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[10px] font-black text-[#0A2E1F]/60 uppercase tracking-widest">
          {lang === 'en' ? '← Slide to Add Cart →' : '← سلائیڈ کر کے کارٹ میں ڈالیں →'}
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
        className="w-10 h-10 bg-[#0A2E1F] hover:bg-[#76C945] hover:text-[#0A2E1F] text-white rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md transition-colors duration-200 z-10 font-bold"
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
    <div className="relative w-full max-w-[320px] h-[520px] md:max-w-[280px] md:h-[500px] xl:max-w-[320px] xl:h-[520px] bg-white rounded-[26px] border border-[#0A2E1F]/10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] hover:shadow-[0_30px_70px_rgba(10,46,31,0.12)] hover:border-[#76C945]/30 p-5 flex flex-col justify-between transition-all duration-300 overflow-hidden group select-none bg-gradient-to-b from-white to-[#F4F7F5]/40">
      
      {/* Top badges bar */}
      <div className="flex justify-between items-center z-10">
        <span className="px-2.5 py-0.5 rounded-md bg-[#0A2E1F]/5 text-[#0A2E1F] text-[9px] font-black uppercase tracking-wider">
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
          alt={product.name[lang]}
          className="max-h-full w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)]"
          whileHover={{ 
            scale: 1.06, 
            rotate: index % 2 === 0 ? 3 : -3,
            y: -5
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          loading="lazy"
        />
      </Link>

      {/* Product Information */}
      <div className="space-y-1">
        <Link 
          to={`/products/${product.slug}`}
          className="font-black text-xl text-[#0A2E1F] leading-tight block truncate hover:text-[#76C945] transition-colors"
        >
          {product.name[lang]}
        </Link>
        <span className="text-[10px] text-muted-foreground/80 font-bold block truncate max-w-full">
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
                  ? 'bg-[#0A2E1F] text-white border-[#0A2E1F]'
                  : 'bg-white text-muted-foreground border-border hover:bg-muted'
              }`}
            >
              {sz.size}
            </button>
          ))}
        </div>
      )}

      {/* Price & Quantity controllers row */}
      <div className="flex items-center justify-between border-t border-[#0A2E1F]/5 pt-3.5 mt-3">
        {/* Rolling price */}
        <div className="flex flex-col">
          <span className="text-lg font-black text-[#0A2E1F] font-mono tracking-tight">
            <RollingCardPrice price={displayedPrice} />
          </span>
          <span className="text-[8px] font-black text-[#76C945] uppercase tracking-wider">
            {currentSize.stockStatus === 'In Stock' ? 'IN STOCK' : 'LOW STOCK'}
          </span>
        </div>

        {/* Quantity control [-] 1 [+] */}
        <div className="flex items-center gap-2 bg-[#0A2E1F]/5 rounded-lg border border-[#0A2E1F]/10 p-0.5">
          <button
            onClick={() => setQty(q => Math.max(1, q - 1))}
            className="w-6 h-6 rounded-md bg-white hover:bg-[#76C945]/20 flex items-center justify-center text-xs text-[#0A2E1F] font-bold transition-all active:scale-90"
          >
            -
          </button>
          <span className="w-5 text-center text-xs font-black text-[#0A2E1F] font-mono">{qty}</span>
          <button
            onClick={() => setQty(q => q + 1)}
            className="w-6 h-6 rounded-md bg-white hover:bg-[#76C945]/20 flex items-center justify-center text-xs text-[#0A2E1F] font-bold transition-all active:scale-90"
          >
            +
          </button>
        </div>
      </div>

      {/* Bottom slide action bar */}
      <div className="flex items-center gap-3.5 border-t border-[#0A2E1F]/5 pt-3.5 mt-3">
        {/* Wishlist Heart Icon */}
        <button
          onClick={handleWishlistClick}
          className={`p-2 rounded-xl border transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center ${
            isWishlisted
              ? 'border-red-500 bg-red-50 text-red-500'
              : 'border-[#0A2E1F]/10 hover:bg-muted text-muted-foreground'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Slide to Add handle */}
        <div className="flex-1">
          <SlideToCart onSlideSuccess={handleSlideSuccess} lang={lang} />
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
    <div className="min-h-screen pt-20 bg-[#F4F7F5]">
      
      {/* 1. Page Header: Apple Minimal light backdrop */}
      <section className="relative py-20 overflow-hidden bg-white border-b border-[#0A2E1F]/5">
        
        {/* Subtle decorative background gradient */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none">
          <div className="absolute w-[350px] h-[350px] top-[-10%] left-[-10%] bg-[#76C945]/5 rounded-full filter blur-[100px]" />
          <div className="absolute w-[350px] h-[350px] bottom-[-10%] right-[-10%] bg-[#C5A059]/3 rounded-full filter blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo cluster */}
            <div className="inline-block bg-[#0A2E1F]/5 backdrop-blur-md rounded-2xl px-5 py-2 mb-4 border border-[#0A2E1F]/5">
              <img
                src={vitalAgroLogo}
                alt="Vital Agro Logo"
                className="h-10 sm:h-12 w-auto mx-auto object-contain"
              />
            </div>
            <span className="text-xs font-black tracking-widest uppercase text-[#76C945] block mt-2">
              {lang === 'en' ? 'Apple Store Premium Catalog' : 'پریمیئم پراڈکٹ کیٹلاگ'}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0A2E1F] mt-2 mb-4 tracking-tight leading-none">
              {lang === 'en' ? 'Agricultural Products' : 'زرعی مصنوعات اور حل'}
            </h1>
            <p className="text-[#0A2E1F]/60 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {lang === 'en' 
                ? 'Discover our high-efficacy formulas utilizing imported formulations for maximum crop yields.'
                : 'ہماری بہترین کوالٹی کی کیڑے مار ادویات، فنگس کش، اور پلانٹ نیوٹریشن دیکھیں۔'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Sticky Filtering Bar: Apple Store Navigation Pills */}
      <section className="py-6 border-b border-[#0A2E1F]/5 sticky top-20 z-30 bg-white/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Category selection pills */}
            <div className="flex gap-2 flex-wrap w-full lg:w-auto">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={`px-4.5 py-2.5 rounded-full text-xs font-black transition-all ${
                    category === key
                      ? 'bg-[#0A2E1F] text-white shadow-md shadow-[#0A2E1F]/15'
                      : 'bg-[#0A2E1F]/5 text-[#0A2E1F]/70 hover:bg-[#0A2E1F]/10 hover:text-[#0A2E1F]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Keyword Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className={`absolute ${isRTL ? 'right-3.5' : 'left-3.5'} top-1/2 -translate-y-1/2 w-4 h-4 text-[#0A2E1F]/40`} />
              <Input
                placeholder={lang === 'en' ? "Search premium products..." : "پروڈکٹ تلاش کریں..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`h-11 border-[#0A2E1F]/15 focus:border-[#76C945] rounded-full focus:ring-2 focus:ring-[#76C945]/20 bg-[#F4F7F5]/50 ${isRTL ? "pr-11 pl-4 text-right" : "pl-11 pr-4"}`}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Products Catalog Grid Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Crop Filter Selection */}
          <div className="mb-10 bg-white p-6 rounded-3xl border border-[#0A2E1F]/5 shadow-sm">
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
            <div className="text-center py-20 bg-white rounded-3xl border border-[#0A2E1F]/5 p-8 max-w-xl mx-auto shadow-sm">
              <p className="text-muted-foreground text-sm font-bold">
                {lang === 'en' ? 'No premium products found matching your filters.' : 'آپ کے معیار کے مطابق کوئی مصنوعات نہیں ملیں۔'}
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}