import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eye } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import CropFilter from '@/components/products/CropFilter';
import { useLanguage } from '@/lib/LanguageContext';
import { PRODUCTS_DATA } from '@/data/productsData';
import useVideoAutoplay from '@/hooks/useVideoAutoplay';

// Import Assets
import vitalAgroLogo from '@/assets/vital agro logo.webp';
import vitalBg from '@/assets/vital bg.mp4';

// Global database access fallback
const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

export default function Products() {
  const { lang, t } = useLanguage();
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [activeCrop, setActiveCrop] = useState(null);

  const videoRef1 = useRef(null);
  const videoRef2 = useRef(null);
  useVideoAutoplay(videoRef1);
  useVideoAutoplay(videoRef2);

  const getWhatsAppLinkForProduct = (product, lang) => {
    const phone = "923011837160";
    const productName = product.name[lang] || product.name.en || product.name;
    const catNames = {
      insecticide: { en: 'Insecticide', ur: 'کیڑے مار دوا' },
      herbicide: { en: 'Herbicide', ur: 'جڑی بوٹی مار دوا' },
      fungicide: { en: 'Fungicide', ur: 'فنگس مار دوا' },
      plant_nutrition: { en: 'Plant Nutrition', ur: 'پودوں کی غذائیت' },
      growth_promoter: { en: 'Growth Promoter', ur: 'نمو بڑھانے والا' },
      special_product: { en: 'Special Product', ur: 'خاص مصنوع' }
    };
    const categoryName = catNames[product.category]?.[lang] || catNames[product.category]?.en || product.category;
    const packing = product.packaging || (product.specs?.packing?.[lang] || "");
    const message = `Hello Vital Agro,

I am interested in purchasing the following product.

Product Name:
${productName}

Category:
${categoryName}

Packing:
${packing}

Please provide:

• Price
• Availability
• Dealer Information
• Delivery Details

Thank you.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

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

  const { data: dbProducts = [], isLoading: isDbLoading } = useQuery({
    queryKey: ['all-products'],
    queryFn: async () => {
      if (!db.entities?.Product) return [];
      try {
        return await db.entities.Product.list();
      } catch (e) {
        return [];
      }
    },
  });

  // Merge static high-fidelity products with database records
  const products = React.useMemo(() => {
    const staticList = Object.values(PRODUCTS_DATA).filter(p => p.id);
    
    // Map static products to merge with database counterparts if they exist
    const mergedList = staticList.map(sp => {
      const dbMatch = dbProducts.find(dp => dp.name.toLowerCase().replace(/[^a-z0-9]/g, '') === sp.name.en.toLowerCase().replace(/[^a-z0-9]/g, ''));
      return {
        ...sp,
        dbId: dbMatch ? dbMatch.id : sp.id, // Fallback to slug if no DB ID exists
        featured: dbMatch ? dbMatch.featured : sp.id === 'fatty' || sp.id === 'conference-gold'
      };
    });

    // Add any database products that are NOT in our static list
    dbProducts.forEach(dp => {
      const isAlreadyAdded = staticList.some(sp => sp.name.en.toLowerCase().replace(/[^a-z0-9]/g, '') === dp.name.toLowerCase().replace(/[^a-z0-9]/g, ''));
      if (!isAlreadyAdded) {
        mergedList.push({
          id: dp.id,
          dbId: dp.id,
          slug: dp.id,
          name: { en: dp.name, ur: dp.name },
          category: dp.category || 'special_product',
          imageUrl: dp.image_url || 'https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?auto=format&fit=crop&q=80&w=300',
          description: { en: dp.description || '', ur: dp.description || '' },
          formulation: dp.formulation || '',
          activeIngredient: dp.active_ingredient || '',
          packaging: dp.packaging || '',
          crops: dp.recommended_crops?.map(c => ({ name: { en: c, ur: c }, icon: '🌱' })) || [],
          dosageTable: [],
          specs: {},
          safety: { en: [], ur: [] },
          faqs: { en: [], ur: [] }
        });
      }
    });

    return mergedList;
  }, [dbProducts]);

  // Localized search and crop filtering
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
    <div className="min-h-screen pt-24">
      {/* Header Banner */}
      <section className="bg-[#0A2E1F] py-20 relative overflow-hidden">
        <video
          ref={videoRef1}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}
        >
          <source src={vitalBg} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0A2E1F]/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Vital Agro Logo inside Page Header */}
            <div className="inline-block bg-white/15 backdrop-blur-md rounded-xl px-4 py-2 mb-4 shadow-lg shadow-white/5">
              <img
                src={vitalAgroLogo}
                alt="Vital Agro Logo"
                className="h-11 w-auto mx-auto object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
              />
            </div>
            <span className="text-sm font-black tracking-widest uppercase text-[#76C945]">
              {lang === 'en' ? 'Our Premium Range' : 'ہماری بہترین پروڈکٹس'}
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-white mt-2 mb-4">
              {lang === 'en' ? 'Products & Solutions' : 'زرعی مصنوعات اور حل'}
            </h1>
            <p className="text-white/30 text-xs">{t.footer.tagline}</p>
            <p className="text-center text-white/70 mt-2">Raman Urdu</p>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              {lang === 'en' 
                ? 'Explore our premium crop protection, plant nutrition, and growth promoter formulas.'
                : 'ہماری بہترین کوالٹی کی کیڑے مار ادویات، فنگس کش، اور پلانٹ نیوٹریشن دیکھیں۔'}
            </p>
          </motion.div>
        </div>
      </section>
{/* Mobile Video Section */}
<section className="block md:hidden py-8 mobile-video-section">
  <video
    ref={videoRef2}
    autoPlay
    loop
    muted
    playsInline
    preload="metadata"
    className="w-full h-auto object-cover"
    style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}
  >
    <source src={vitalBg} type="video/mp4" />
  </video>
</section>

      {/* Filters & Sticky bar */}
      <section className="py-8 border-b border-border sticky top-20 z-30 bg-background/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex gap-2 flex-wrap w-full lg:w-auto">
              {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setCategory(key)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                    category === key
                      ? 'bg-[#0A2E1F] text-white'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="relative w-full lg:w-72">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground`} />
              <Input
                placeholder={lang === 'en' ? "Search products..." : "پروڈکٹ تلاش کریں..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={isRTL ? "pr-10 pl-4 text-right" : "pl-10 pr-4"}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Crop Filter Box */}
          <CropFilter onCropSelect={setActiveCrop} activeCrop={activeCrop} />
          
          {isDbLoading && products.length === 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card rounded-2xl border border-border p-6 animate-pulse">
                  <div className="aspect-square bg-muted rounded-xl mb-4" />
                  <div className="h-5 bg-muted rounded w-2/3 mb-2" />
                  <div className="h-4 bg-muted rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={category + search + lang + (activeCrop ? activeCrop.name : '')}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filtered.map((product, i) => {
                  const catLabel = CATEGORY_LABELS[product.category] || product.category;
                  return (
                    <motion.div
                      key={product.slug}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="group bg-card rounded-3xl border border-border overflow-hidden hover:border-[#76C945]/30 hover:shadow-2xl transition-all duration-500 relative flex flex-col justify-between h-full"
                    >
                      <Link
                        to={`/products/${product.slug}`}
                        className="flex-grow flex flex-col justify-between"
                      >
                        {/* Packaging Container */}
                        <div className="relative aspect-square p-6 flex items-center justify-center bg-gradient-to-b from-muted/50 to-transparent">
                          <img
                            src={product.imageUrl}
                            alt={product.name[lang]}
                            className="max-h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 bg-[#C5A059]/10 text-[#C5A059] text-[10px] font-black rounded-full border border-[#C5A059]/20 uppercase">
                              {catLabel}
                            </span>
                          </div>
                          {/* Vital Agro Corporate Logo Badge inside each card */}
                          <div className="absolute top-3 right-3 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-md border border-white/20">
                            <img
                              src={vitalAgroLogo}
                              alt="Vital Agro Badge"
                              className="h-3 w-auto object-contain"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#76C945] text-[#0A2E1F] text-sm font-black rounded-full shadow-lg">
                              <Eye className="w-4 h-4" />
                              {lang === 'en' ? 'View Details' : 'تفصیلات دیکھیں'}
                            </span>
                          </div>
                        </div>

                        {/* Description Section */}
                        <div className="p-5 pb-0 flex-grow">
                          <h3 className="font-black text-foreground text-lg group-hover:text-[#76C945] transition-colors">
                            {product.name[lang]}
                          </h3>
                          <p className="text-muted-foreground text-xs mt-2 line-clamp-2 leading-relaxed">
                            {product.description[lang]}
                          </p>
                          <div className="flex justify-between items-center mt-4 pt-3 border-t border-border/60">
                            {product.formulation && (
                              <span className="px-2.5 py-0.5 bg-muted text-muted-foreground text-[10px] font-bold rounded-full border border-border">
                                {product.formulation}
                              </span>
                            )}
                            <span className="text-[10px] font-bold text-primary tracking-widest uppercase">
                              {product.productCode}
                            </span>
                          </div>
                        </div>
                      </Link>

                      {/* WhatsApp Purchase CTA */}
                      <div className="p-5 pt-3">
                        <a
                          href={getWhatsAppLinkForProduct(product, lang)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 py-3 bg-green-500 hover:bg-green-600 text-white rounded-2xl text-xs font-black shadow-lg shadow-green-500/10 hover:shadow-green-500/25 transition-all text-center uppercase tracking-wider hover:scale-[1.02] active:scale-95 touch-manipulation min-h-[48px]"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                          <span>{lang === 'en' ? 'Buy on WhatsApp' : 'واٹس ایپ پر خریدیں'}</span>
                        </a>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}

          {!isDbLoading && filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                {lang === 'en' ? 'No products found matching your criteria.' : 'آپ کے معیار کے مطابق کوئی مصنوعات نہیں ملیں۔'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}