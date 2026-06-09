import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Eye } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import { PRODUCTS_DATA } from '@/data/productsData';

// Global database access fallback
const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

export default function ProductsShowcase() {
  const { t, lang } = useLanguage();

  const CATEGORY_LABELS = {
    insecticide: t.categories.insecticide,
    herbicide: t.categories.herbicide,
    fungicide: t.categories.fungicide,
    plant_nutrition: t.categories.plant_nutrition,
    growth_promoter: t.categories.growth_promoter,
    special_product: t.categories.special_product,
  };

  const { data: dbProducts = [] } = useQuery({
    queryKey: ['featured-products'],
    queryFn: async () => {
      if (!db.entities?.Product) return [];
      try {
        return await db.entities.Product.filter({ featured: true });
      } catch (e) {
        return [];
      }
    },
  });

  // Load featured products from static data and merge with DB featured items
  const products = React.useMemo(() => {
    const staticList = Object.values(PRODUCTS_DATA)
      .filter(p => p.id && (p.id === 'fatty' || p.id === 'conference-gold' || p.id === 'aaqaab' || p.id === 'vac-zinc' || p.id === 'easy-grow' || p.id === 'output'));
    
    // Map static products to merge with database counterparts if they exist
    const mergedList = staticList.map(sp => {
      const dbMatch = dbProducts.find(dp => dp.name.toLowerCase().replace(/[^a-z0-9]/g, '') === sp.name.en.toLowerCase().replace(/[^a-z0-9]/g, ''));
      return {
        ...sp,
        dbId: dbMatch ? dbMatch.id : sp.id
      };
    });

    // Add any database featured products that are NOT in our list
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

    return mergedList.slice(0, 6);
  }, [dbProducts]);

  return (
    <section className="py-24 bg-[#0A2E1F] relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-bold tracking-widest uppercase text-[#76C945]">{t.showcase.badge}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 mb-4">
            {t.showcase.title}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t.showcase.desc}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/products/${product.slug}`}
                className="group block bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:bg-white/10 hover:border-[#76C945]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#76C945]/10"
              >
                <div className="relative aspect-square p-8 flex items-center justify-center bg-gradient-to-b from-white/5 to-transparent">
                  <img
                    src={product.imageUrl}
                    alt={product.name[lang]}
                    className="max-h-56 w-auto object-contain group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#C5A059]/20 text-[#C5A059] text-xs font-bold rounded-full border border-[#C5A059]/30">
                      {CATEGORY_LABELS[product.category] || product.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2E1F]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#76C945] text-[#0A2E1F] text-sm font-bold rounded-full">
                      <Eye className="w-4 h-4" />
                      {t.showcase.viewDetails}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#76C945] transition-colors">
                    {product.name[lang]}
                  </h3>
                  <p className="text-white/50 text-sm mt-2 line-clamp-2 leading-relaxed">{product.description[lang]}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/products"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-[#76C945] text-[#0A2E1F] font-bold rounded-full hover:bg-[#8AD65A] transition-all text-sm"
          >
            {t.showcase.viewAll}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}