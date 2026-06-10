import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, ArrowLeft, Download, Send, MessageCircle,
  CheckCircle2, AlertTriangle, HelpCircle, Shield, Award, Cpu,
  Flame, HardHat, FileText, Info, Leaf, Check, Sparkles, Zap, Clock, ShieldCheck, Gauge, Layers, Activity, Maximize,
  ArrowRight, FileBadge, Users
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { getProductBySlug, PRODUCTS_DATA } from '@/data/productsData';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import useVideoAutoplay from '@/hooks/useVideoAutoplay';

// Import local assets via standard React pipeline
import vitalBg from '@/assets/vital bg.mp4';
import vitalAgroLogo from '@/assets/vital agro logo.webp';
import tagLogo from '@/assets/tag logo.webp';
import vitalGroup from '@/assets/vital group.webp';

const PAGE_TRANS = {
  en: {
    backToProducts: "Back to Products",
    productNotFound: "Product not found.",
    availablePacking: "Available Packing",
    productCode: "Product Code",
    status: "Status",
    formulaBadge: "Premium Imported Formula",
    quickActions: "Quick Actions",
    downloadLabel: "Download Label",
    downloadPDF: "Download PDF",
    whatsappInquiry: "WhatsApp Inquiry",
    requestQuote: "Request Quote",
    callNow: "Call Now",
    description: "Product Description",
    keyFeatures: "Key Features",
    benefits: "Key Benefits",
    suitableCrops: "Suitable Crops",
    appMethod: "Application Method",
    recommendedDosage: "Recommended Dosage & Timing",
    crop: "Crop",
    dosage: "Dosage",
    waterQty: "Water Quantity",
    appTiming: "Application Timing",
    frequency: "Frequency",
    techSpecs: "Technical Specifications",
    type: "Product Type",
    formulation: "Formulation",
    composition: "Composition",
    appearance: "Appearance",
    storage: "Storage",
    shelfLife: "Shelf Life",
    packing: "Packaging",
    compatibility: "Compatibility",
    safetyInfo: "Safety Information",
    downloadCenter: "Download Center",
    safetySheet: "Safety Sheet (SDS)",
    brochure: "Product Brochure",
    catalogue: "Product Catalogue",
    faqTitle: "Frequently Asked Questions",
    relatedProducts: "Related Products",
    dealerInquiry: "Dealer Inquiry",
    dealerInquirySub: "Send us an inquiry and our representative will contact you shortly.",
    nameLabel: "Your Name",
    phoneLabel: "Phone Number",
    cityLabel: "Your City",
    cropLabel: "Target Crop",
    messageLabel: "Your Message",
    submitForm: "Submit Inquiry",
    successTitle: "Inquiry Submitted!",
    successDesc: "Thank you for contacting Vital Agro. Our agronomy team will contact you shortly.",
    successClose: "Close",
    zoomHint: "Click image to inspect packaging details"
  },
  ur: {
    backToProducts: "مصنوعات کی طرف واپس جائیں",
    productNotFound: "پروڈکٹ نہیں ملی۔",
    availablePacking: "دستیاب پیکنگ",
    productCode: "پروڈکٹ کوڈ",
    status: "حالت",
    formulaBadge: "پریمیئم درآمد شدہ فارمولا",
    quickActions: "فوری روابط",
    downloadLabel: "لیبل ڈاؤن لوڈ کریں",
    downloadPDF: "پی ڈی ایف ڈاؤن لوڈ",
    whatsappInquiry: "واٹس ایپ انکوائری",
    requestQuote: "انکوائری فارم",
    callNow: "ابھی کال کریں",
    description: "مصنوعات کی تفصیل",
    keyFeatures: "اہم خصوصیات",
    benefits: "اہم فوائد",
    suitableCrops: "موزوں فصلیں",
    appMethod: "طریقہ استعمال",
    recommendedDosage: "تجویز کردہ خوراک اور وقت",
    crop: "فصل",
    dosage: "خوراک",
    waterQty: "پانی کی مقدار",
    appTiming: "سپرے کا وقت",
    frequency: "وقفہ/تعداد",
    techSpecs: "تکنیکی وضاحتیں",
    type: "پروڈکٹ کی قسم",
    formulation: "فارمولیشن",
    composition: "اجزاء (فارمولا)",
    appearance: "ظاہری حالت",
    storage: "اسٹوریج",
    shelfLife: "شیلف لائف (میعاد)",
    packing: "پیکنگ سائز",
    compatibility: "مطابقت",
    safetyInfo: "حفاظتی تدابیر",
    downloadCenter: "ڈاؤن لوڈ سینٹر",
    safetySheet: "حفاظتی شیٹ (SDS)",
    brochure: "پروڈکٹ بروشر",
    catalogue: "پروڈکٹ کیٹلاگ",
    faqTitle: "اکثر پوچھے گئے سوالات",
    relatedProducts: "متعلقہ مصنوعات",
    dealerInquiry: "ڈیلر انکوائری فارم",
    dealerInquirySub: "ہمیں اپنی تفصیلات بھیجیں، ہمارا نمائندہ جلد آپ سے رابطہ کرے گا۔",
    nameLabel: "آپ کا نام",
    phoneLabel: "فون نمبر",
    cityLabel: "آپ کا شہر",
    cropLabel: "فصل کا نام",
    messageLabel: "آپ کا پیغام",
    submitForm: "انکوائری جمع کروائیں",
    successTitle: "انکوائری موصول ہو گئی ہے!",
    successDesc: "وائٹل ایگرو سے رابطہ کرنے کا شکریہ۔ ہماری ٹیم جلد آپ سے رابطہ کرے گی۔",
    successClose: "بند کریں",
    zoomHint: "پیکنگ کی تفصیلات دیکھنے کے لیے کلک کریں"
  }
};

const CATEGORY_LABELS = {
  en: {
    insecticide: 'Insecticide',
    herbicide: 'Herbicide',
    fungicide: 'Fungicide',
    plant_nutrition: 'Plant Nutrition',
    growth_promoter: 'Growth Promoter',
    special_product: 'Special Product',
  },
  ur: {
    insecticide: 'کیڑے مار دوا',
    herbicide: 'جڑی بوٹی مار دوا',
    fungicide: 'فنگس مار دوا',
    plant_nutrition: 'پودوں کی غذائیت',
    growth_promoter: 'نمو بڑھانے والا',
    special_product: 'خاص مصنوع',
  }
};

const FEATURE_ICONS = [
  <Zap className="w-6 h-6 text-[#76C945]" />,
  <Clock className="w-6 h-6 text-[#76C945]" />,
  <Sparkles className="w-6 h-6 text-[#76C945]" />,
  <ShieldCheck className="w-6 h-6 text-[#76C945]" />,
  <Cpu className="w-6 h-6 text-[#76C945]" />,
  <Gauge className="w-6 h-6 text-[#76C945]" />,
  <Layers className="w-6 h-6 text-[#76C945]" />,
  <Activity className="w-6 h-6 text-[#76C945]" />,
  <Maximize className="w-6 h-6 text-[#76C945]" />,
  <Award className="w-6 h-6 text-[#76C945]" />,
];

const SAFETY_ICONS = [
  <HardHat className="w-5 h-5" />,
  <Shield className="w-5 h-5" />,
  <Flame className="w-5 h-5" />,
  <Info className="w-5 h-5" />,
  <AlertTriangle className="w-5 h-5" />
];

export default function ProductDetail() {
  const { id } = useParams();
  const { lang } = useLanguage();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(0); // For product images gallery
  const [isZoomed, setIsZoomed] = useState(false); // Zoom Modal state
  const [openFaq, setOpenFaq] = useState(null); // Accordion state
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', city: '', crop: '', message: '' });
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0);

  const videoRef = useRef(null);
  useVideoAutoplay(videoRef);

  const getWhatsAppLinkForProduct = (p, l, sizeIdx = 0) => {
    const phone = "923011837160";
    const productName = p.name[l] || p.name.en || p.name;
    const catNames = {
      insecticide: { en: 'Insecticide', ur: 'کیڑے مار دوا' },
      herbicide: { en: 'Herbicide', ur: 'جڑی بوٹی مار دوا' },
      fungicide: { en: 'Fungicide', ur: 'فنگس مار دوا' },
      plant_nutrition: { en: 'Plant Nutrition', ur: 'پودوں کی غذائیت' },
      growth_promoter: { en: 'Growth Promoter', ur: 'نمو بڑھانے والا' },
      special_product: { en: 'Special Product', ur: 'خاص مصنوع' }
    };
    const categoryName = catNames[p.category]?.[l] || catNames[p.category]?.en || p.category;
    
    const pricingOption = p.pricing?.[sizeIdx] || { size: p.packaging, rate: "Negotiable", carton: "N/A" };
    const size = pricingOption.size;
    const rate = pricingOption.rate;

    const message = `Assalam-o-Alaikum Vital Agro Team,

I want to purchase this product.

Product Name:
${productName}

Category:
${categoryName}

Pack Size:
${size}

Price:
Rs. ${rate}

Quantity:
1

Please guide me regarding availability and delivery.

Thank You.`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const getWhatsAppQuoteLink = (p, l, sizeIdx = 0) => {
    return getWhatsAppLinkForProduct(p, l, sizeIdx);
  };

  const isRTL = lang === 'ur';
  const tPage = PAGE_TRANS[lang] || PAGE_TRANS.en;

  // Mock DB fetch or fallback lookups
  const db = globalThis.__B44_DB__ || {};
  const { data: dbProduct } = useQuery({
    queryKey: ['db-product', id],
    queryFn: async () => {
      if (!db.entities?.Product) return null;
      try {
        const list = await db.entities.Product.filter({ id });
        return list[0] || null;
      } catch (e) {
        return null;
      }
    },
    enabled: !!id,
  });

  const product = getProductBySlug(id) || (dbProduct ? getProductBySlug(dbProduct.name) : null);

  // Programmatic SEO implementation & Schema injection
  useEffect(() => {
    if (!product) return;

    // 1. Meta Title and Description
    const catLabel = CATEGORY_LABELS[lang]?.[product.category] || product.category;
    document.title = `${product.name[lang]} | ${catLabel} | Vital Agro Chemical Industries`;

    const metaDesc = document.querySelector('meta[name="description"]');
    const descText = product.description[lang].slice(0, 155) + '...';
    if (metaDesc) {
      metaDesc.setAttribute('content', descText);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = descText;
      document.head.appendChild(meta);
    }

    // 2. Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `${product.name[lang]} - Vital Agro`);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', descText);

    // 3. Schema.org Structured Data
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name.en,
      "image": `https://vitalagro.com${product.imageUrl}`,
      "description": product.description.en,
      "category": catLabel,
      "sku": product.productCode,
      "mpn": product.productCode,
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "PKR",
        "lowPrice": "0",
        "highPrice": "0",
        "offerCount": "1",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "Vital Agro Chemical Industries (Pvt.) Ltd."
        }
      }
    };

    const existingScript = document.getElementById('product-schema');
    if (existingScript) {
      existingScript.textContent = JSON.stringify(schemaData);
    } else {
      const script = document.createElement('script');
      script.id = 'product-schema';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schemaData);
      document.head.appendChild(script);
    }

    return () => {
      // Clean up dynamic meta tag updates on component unmount
      const script = document.getElementById('product-schema');
      if (script) script.remove();
    };
  }, [product, lang]);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center gap-4 bg-[#0A2E1F] text-white">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <p className="text-xl font-bold opacity-80">{tPage.productNotFound}</p>
          <Link to="/products" className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-[#76C945] text-[#0A2E1F] font-bold rounded-full hover:bg-[#8AD65A] transition-all">
            <ArrowLeft className="w-4 h-4" />
            {tPage.backToProducts}
          </Link>
        </motion.div>
      </div>
    );
  }

  // Handle Action functions
  const handleDownload = (type) => {
    toast({
      title: `${type} download started`,
      description: `Downloading ${product.name[lang]} ${type.toLowerCase()}.`,
    });
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast({
        variant: "destructive",
        title: "Missing fields",
        description: "Please enter your name and phone number.",
      });
      return;
    }
    
    // Redirect to WhatsApp with contact details
    const phone = "923011837160";
    const productName = product.name[lang] || product.name.en;
    const message = `Hello Vital Agro,

I would like to submit a dealer/product inquiry.

Inquirer Name:
${formData.name}

Phone Number:
${formData.phone}

City:
${formData.city || "Not provided"}

Target Crop:
${formData.crop || "Not provided"}

Interested Product:
${productName}

Inquiry Message:
${formData.message || "No message provided"}

Thank you.`;

    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    setFormSubmitted(true);
  };

  // Automated recommendations (Related products)
  const related = Object.values(PRODUCTS_DATA)
    .filter(p => p.id && p.id !== product.id)
    .slice(0, 3);

  // Gallery items matching "Thumbnail Gallery"
  const galleryImages = [
    { url: product.imageUrl, label: "Packaging" },
    { url: vitalGroup, label: "Vital Certified", isLogo: true },
    { url: tagLogo, label: "Tag Formula", isLogo: true }
  ];

  return (
    <div className="min-h-screen bg-[#F4F7F5] overflow-x-hidden pt-20">
      
      {/* 1. Large Product Hero Section with Background Video and Glass Cards */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8 bg-[#0A2E1F]">
        {/* Looping Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
          style={{ transform: 'translate3d(0, 0, 0)', willChange: 'transform' }}
        >
          <source src={vitalBg} type="video/mp4" />
        </video>
        
        {/* Radial Green Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#0A2E1F] via-[#0A2E1F]/90 to-[#0A2E1F]/40" />

        <div className="relative z-10 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Glass Bottle Card & Thumbnail Gallery */}
          <div className="flex flex-col items-center justify-center">
            {/* Glass Card for Product Bottle with 3D Hover effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-8 w-full max-w-[420px] aspect-square flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] group cursor-zoom-in"
              onClick={() => setIsZoomed(true)}
            >
              {/* Product Image Zoom / Showcase */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  {galleryImages[activeTab].isLogo ? (
                    <div className="p-8 bg-white/10 rounded-2xl border border-white/20 backdrop-blur-md flex flex-col items-center justify-center gap-4 text-center w-full h-full">
                      <img
                        src={galleryImages[activeTab].url}
                        alt="Logo View"
                        className="max-h-24 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]"
                      />
                      <span className="text-white/80 font-bold text-xs uppercase tracking-widest">
                        {galleryImages[activeTab].label}
                      </span>
                    </div>
                  ) : (
                    <motion.img
                      src={galleryImages[activeTab].url}
                      alt={product.name[lang]}
                      className="max-h-[300px] sm:max-h-[340px] w-auto object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform duration-500"
                      animate={{ y: [-6, 6, -6] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Magnify Icon Hint */}
              <div className="absolute bottom-4 right-4 bg-white/15 p-2.5 rounded-full border border-white/25 hover:bg-white/35 transition-all">
                <Maximize className="w-4 h-4 text-white" />
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 bg-[#76C945]/15 border border-[#76C945]/30 text-[#8AD65A] text-xs font-black rounded-full uppercase tracking-wider backdrop-blur-md">
                  {CATEGORY_LABELS[lang]?.[product.category]}
                </span>
              </div>
            </motion.div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-4 mt-6">
              {galleryImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`w-16 h-16 rounded-xl border-2 transition-all overflow-hidden p-2 flex items-center justify-center bg-white/5 backdrop-blur-sm ${
                    activeTab === i ? 'border-[#76C945] bg-white/10 scale-105' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.label}
                    className={`max-h-full max-w-full object-contain ${img.isLogo ? 'drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]' : ''}`}
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Title, Category, Badge & Quick Description */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col text-white"
          >
            {/* Premium Imported Formula Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#D8B470] text-xs font-extrabold w-max mb-6">
              <Award className="w-3.5 h-3.5" />
              <span>{tPage.formulaBadge}</span>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none mb-4">
              {product.name[lang]}
            </h1>
            {product.formulation && (
              <span className="px-4 py-1.5 bg-white/10 border border-white/20 text-white font-bold rounded-full w-max text-sm mb-6">
                {product.formulation}
              </span>
            )}

            {/* Short Description */}
            <p className="text-lg text-white/80 leading-relaxed mb-8 border-l-4 border-[#76C945] pl-4 italic">
              {lang === 'en' ? product.description.en.split('.')[0] + '.' : product.description.ur.split('۔')[0] + '۔'}
            </p>

            {/* 2. Product Information Grid */}
            <div className="grid grid-cols-2 gap-4 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 mb-6">
              <div>
                <span className="text-xs text-white/50 block uppercase font-bold tracking-wider">{tPage.productCode}</span>
                <span className="text-base font-black tracking-widest text-[#76C945]">{product.productCode}</span>
              </div>
              <div>
                <span className="text-xs text-white/50 block uppercase font-bold tracking-wider">{tPage.availablePacking}</span>
                <span className="text-base font-extrabold">{product.packaging}</span>
              </div>
              <div>
                <span className="text-xs text-white/50 block uppercase font-bold tracking-wider">{tPage.status}</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green-400">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-ping" />
                  {product.status[lang]}
                </span>
              </div>
              <div>
                <span className="text-xs text-white/50 block uppercase font-bold tracking-wider">{lang === 'en' ? "Active Ingredient" : "فارمولا"}</span>
                <span className="text-sm font-semibold truncate block max-w-[150px]">{product.activeIngredient}</span>
              </div>
            </div>

            {/* Premium Size Selector */}
            {product.pricing && product.pricing.length > 0 && (
              <div className="mb-8 p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                <span className="text-xs text-white/60 block uppercase font-black tracking-widest mb-3">
                  {lang === 'en' ? 'Select Packing Size' : 'پیکنگ سائز منتخب کریں'}
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {product.pricing.map((priceOption, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedSizeIdx(idx)}
                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 border ${
                        selectedSizeIdx === idx
                          ? 'bg-[#76C945] text-[#0A2E1F] border-[#76C945] shadow-lg shadow-[#76C945]/20 scale-105'
                          : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/15 hover:text-white'
                      }`}
                    >
                      {priceOption.size} {priceOption.rate !== "Negotiable" ? `- Rs. ${priceOption.rate}` : ''}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Scroll down link to dosage */}
            <a
              href="#dosage-table"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-bold w-max"
            >
              <span>{lang === 'en' ? "View Dosage Guidelines" : "خوراک کی تفصیلات دیکھیں"}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* 3. Quick Action Buttons Container */}
      <section className="bg-white border-y border-border py-6 sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center justify-between">
          <span className="text-sm font-black text-foreground uppercase tracking-wider hidden sm:inline-block">
            {tPage.quickActions}:
          </span>
          <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
            {/* 1. Buy on WhatsApp */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={getWhatsAppLinkForProduct(product, lang, selectedSizeIdx)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full text-sm font-extrabold transition-all shadow-md shadow-green-500/10 min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{lang === 'en' ? 'Buy on WhatsApp' : 'واٹس ایپ پر خریدیں'}</span>
            </motion.a>

            {/* 2. Request Quote (WhatsApp) */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={getWhatsAppQuoteLink(product, lang, selectedSizeIdx)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 bg-amber-500 hover:bg-[#D49022] text-white rounded-full text-sm font-extrabold transition-all shadow-md min-h-[48px]"
            >
              <FileText className="w-4 h-4" />
              <span>{tPage.requestQuote}</span>
            </motion.a>

            {/* 3. Call Now */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+923011837160"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0A2E1F] text-white hover:bg-[#0E3E2A] rounded-full text-sm font-extrabold transition-all min-h-[48px]"
            >
              <Phone className="w-4 h-4" />
              <span>{tPage.callNow}</span>
            </motion.a>



            {/* 5. Download Label */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDownload('Label')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 border border-border rounded-full hover:bg-muted text-sm font-bold transition-all text-muted-foreground hover:text-foreground min-h-[48px]"
            >
              <Download className="w-4 h-4" />
              <span>{tPage.downloadLabel}</span>
            </motion.button>

            {/* 6. Download Brochure */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleDownload('Brochure')}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 border border-border rounded-full hover:bg-muted text-sm font-bold transition-all text-muted-foreground hover:text-foreground min-h-[48px]"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'en' ? 'Download Brochure' : 'بروشر ڈاؤن لوڈ کریں'}</span>
            </motion.button>

            {/* 7. Dealer Inquiry */}
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#dealer-inquiry"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 border border-primary/20 hover:bg-primary/5 text-primary rounded-full text-sm font-bold transition-all min-h-[48px]"
            >
              <Users className="w-4 h-4" />
              <span>{lang === 'en' ? 'Dealer Inquiry' : 'ڈیلر انکوائری'}</span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-3 gap-12">
        
        {/* Left Side: Product Details (2/3 width) */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* 4. Deep Product Description */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 sm:p-10 rounded-3xl border border-border shadow-sm"
          >
            <h2 className="text-2xl font-black text-[#0A2E1F] mb-6 pb-2 border-b border-border flex items-center gap-2">
              <Leaf className="w-6 h-6 text-[#76C945]" />
              {tPage.description}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
              {product.description[lang]}
            </p>
          </motion.section>

          {/* 5. Key Features with Premium Icons */}
          <section className="bg-white p-8 sm:p-10 rounded-3xl border border-border shadow-sm">
            <h2 className="text-2xl font-black text-[#0A2E1F] mb-8 pb-2 border-b border-border flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#76C945]" />
              {tPage.keyFeatures}
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {product.features[lang].map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors border border-border/40"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#76C945]/15 flex items-center justify-center shrink-0">
                    {FEATURE_ICONS[i % FEATURE_ICONS.length]}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#0A2E1F] text-base mb-1">
                      {lang === 'en' ? `Feature 0${i + 1}` : `خصوصیت 0${i + 1}`}
                    </h3>
                    <p className="text-sm text-muted-foreground">{feat}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 6. Crop Benefits */}
          <section className="bg-white p-8 sm:p-10 rounded-3xl border border-border shadow-sm">
            <h2 className="text-2xl font-black text-[#0A2E1F] mb-8 pb-2 border-b border-border flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-[#76C945]" />
              {tPage.benefits}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {product.benefits[lang].map((benefit, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isRTL ? 15 : -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-3 p-4 bg-muted/40 rounded-xl border border-border/50"
                >
                  <div className="w-6 h-6 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="text-base font-bold text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 7. Suitable Crops Grid */}
          <section className="bg-white p-8 sm:p-10 rounded-3xl border border-border shadow-sm">
            <h2 className="text-2xl font-black text-[#0A2E1F] mb-8 pb-2 border-b border-border flex items-center gap-2">
              <Info className="w-6 h-6 text-[#76C945]" />
              {tPage.suitableCrops}
            </h2>
            <div className="flex flex-wrap gap-4">
              {product.crops.map((crop, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 px-5 py-3 bg-muted hover:bg-muted/80 rounded-full border border-border transition-all cursor-default"
                >
                  <span className="text-2xl">{crop.icon}</span>
                  <span className="font-extrabold text-foreground text-sm">{crop.name[lang]}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 8. Application Method & Mixing */}
          <section className="bg-white p-8 sm:p-10 rounded-3xl border border-border shadow-sm">
            <h2 className="text-2xl font-black text-[#0A2E1F] mb-6 pb-2 border-b border-border flex items-center gap-2">
              <Info className="w-6 h-6 text-[#76C945]" />
              {tPage.appMethod}
            </h2>
            <div className="bg-[#0A2E1F]/5 border border-[#0A2E1F]/10 p-6 sm:p-8 rounded-2xl">
              <p className="text-[#0A2E1F] text-base leading-relaxed font-semibold">
                {product.application[lang]}
              </p>
            </div>
          </section>

          {/* 9. Recommended Dosage Table */}
          <section id="dosage-table" className="bg-white p-8 sm:p-10 rounded-3xl border border-border shadow-sm overflow-hidden">
            <h2 className="text-2xl font-black text-[#0A2E1F] mb-8 pb-2 border-b border-border flex items-center gap-2">
              <FileText className="w-6 h-6 text-[#76C945]" />
              {tPage.recommendedDosage}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0A2E1F] text-white">
                    <th className="p-4 text-sm font-bold text-center">{tPage.crop}</th>
                    <th className="p-4 text-sm font-bold text-center">{tPage.dosage}</th>
                    <th className="p-4 text-sm font-bold text-center">{tPage.waterQty}</th>
                    <th className="p-4 text-sm font-bold text-center">{tPage.appTiming}</th>
                    <th className="p-4 text-sm font-bold text-center">{tPage.frequency}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {product.dosageTable.map((row, i) => (
                    <tr key={i} className="hover:bg-muted/40 transition-colors">
                      <td className="p-4 text-sm font-black text-center text-foreground">{row.crop[lang]}</td>
                      <td className="p-4 text-sm font-bold text-center text-primary">{row.dosage[lang]}</td>
                      <td className="p-4 text-sm font-semibold text-center text-[#C5A059]">{row.water[lang]}</td>
                      <td className="p-4 text-sm font-medium text-center text-muted-foreground">{row.timing[lang]}</td>
                      <td className="p-4 text-sm font-bold text-center text-green-700">{row.frequency[lang]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Pricing & Carton Packing Matrix */}
          {product.pricing && product.pricing.length > 0 && (
            <section className="bg-white p-8 sm:p-10 rounded-3xl border border-border shadow-sm overflow-hidden">
              <h2 className="text-2xl font-black text-[#0A2E1F] mb-8 pb-2 border-b border-border flex items-center gap-2">
                <Layers className="w-6 h-6 text-[#76C945]" />
                {lang === 'en' ? "Pricing & Carton Packing Matrix" : "قیمت اور کارٹن پیکنگ کی تفصیلات"}
              </h2>
              <div className="overflow-x-auto rounded-xl border border-border">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0A2E1F] text-white">
                      <th className="p-4 text-sm font-bold text-center">{lang === 'en' ? "Pack Size" : "پیکنگ سائز"}</th>
                      <th className="p-4 text-sm font-bold text-center">{lang === 'en' ? "Carton Packing" : "کارٹن پیکنگ"}</th>
                      <th className="p-4 text-sm font-bold text-center">{lang === 'en' ? "Net Rate" : "نیٹ ریٹ"}</th>
                      <th className="p-4 text-sm font-bold text-center">{lang === 'en' ? "Order Urgent" : "فوری آرڈر"}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {product.pricing.map((row, i) => (
                      <tr key={i} className="hover:bg-muted/40 transition-colors">
                        <td className="p-4 text-sm font-black text-center text-foreground">{row.size}</td>
                        <td className="p-4 text-sm font-bold text-center text-[#C5A059]">
                          {row.carton} {lang === 'en' ? 'Units / Carton' : 'بوتلیں فی کارٹن'}
                        </td>
                        <td className="p-4 text-sm font-black text-center text-[#0A2E1F]">
                          {row.rate !== "Negotiable" ? `Rs. ${row.rate}` : (lang === 'en' ? 'Negotiable' : 'قابلِ تبادلہ')}
                        </td>
                        <td className="p-4 text-sm font-bold text-center">
                          <a
                            href={getWhatsAppLinkForProduct(product, lang, i)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-black transition-all shadow-sm cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{lang === 'en' ? 'Buy Now' : 'خریدیں'}</span>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed font-medium">
                  {lang === 'en'
                    ? "Note: Rates listed are net distributor trade rates. Carton packaging configuration must be followed for bulk orders. Contact head office for volume discounts."
                    : "نوٹ: درج کردہ ریٹس ڈسٹریبیوٹر ٹریڈ ریٹس ہیں۔ بلک آرڈرز کے لیے کارٹن پیکنگ کی ترتیب پر عمل کرنا لازمی ہے۔ والیم ڈسکاؤنٹ کے لیے ہیڈ آفس سے رابطہ کریں۔"}
                </p>
              </div>
            </section>
          )}

          {/* 10. Technical Specifications */}
          <section className="bg-white p-8 sm:p-10 rounded-3xl border border-border shadow-sm">
            <h2 className="text-2xl font-black text-[#0A2E1F] mb-8 pb-2 border-b border-border flex items-center gap-2">
              <Cpu className="w-6 h-6 text-[#76C945]" />
              {tPage.techSpecs}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(product.specs).map(([key, val], i) => (
                <div key={key} className="flex justify-between p-4 bg-muted/30 rounded-xl border border-border/50">
                  <span className="text-sm text-muted-foreground font-bold">{tPage[key] || key}:</span>
                  <span className="text-sm font-black text-foreground text-right max-w-[200px] truncate">{val[lang]}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 11. Safety Information */}
          <section className="bg-red-50/50 p-8 sm:p-10 rounded-3xl border border-red-100 shadow-sm">
            <h2 className="text-2xl font-black text-red-900 mb-6 pb-2 border-b border-red-100 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              {tPage.safetyInfo}
            </h2>
            <div className="grid gap-3">
              {product.safety[lang].map((rule, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex gap-3 items-start text-red-800"
                >
                  <div className="mt-1 shrink-0 p-1 bg-red-100 rounded-lg text-red-700">
                    {SAFETY_ICONS[i % SAFETY_ICONS.length]}
                  </div>
                  <span className="font-semibold text-sm leading-relaxed">{rule}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 12. Download Center */}
          <section className="bg-white p-8 sm:p-10 rounded-3xl border border-border shadow-sm">
            <h2 className="text-2xl font-black text-[#0A2E1F] mb-8 pb-2 border-b border-border flex items-center gap-2">
              <Download className="w-6 h-6 text-[#76C945]" />
              {tPage.downloadCenter}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: tPage.downloadLabel, desc: "Bilingual print label PDF" },
                { label: tPage.safetySheet, desc: "Safety Data Sheet SDS" },
                { label: tPage.brochure, desc: "Technical brochure sheet" },
              ].map((dl, i) => (
                <div key={i} className="p-6 bg-muted/30 border border-border hover:border-[#76C945]/40 hover:shadow-md transition-all rounded-2xl flex flex-col justify-between gap-4 group">
                  <div>
                    <FileBadge className="w-10 h-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="font-extrabold text-foreground text-sm mb-1">{dl.label}</h3>
                    <p className="text-xs text-muted-foreground">{dl.desc}</p>
                  </div>
                  <button
                    onClick={() => handleDownload(dl.label)}
                    className="inline-flex items-center gap-1.5 text-xs text-primary font-black group-hover:underline"
                  >
                    <span>Download</span>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* 13. FAQ Accordion (8-10 questions) */}
          <section className="bg-white p-8 sm:p-10 rounded-3xl border border-border shadow-sm">
            <h2 className="text-2xl font-black text-[#0A2E1F] mb-8 pb-2 border-b border-border flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-[#76C945]" />
              {tPage.faqTitle}
            </h2>
            <div className="space-y-3">
              {product.faqs[lang].map((faq, i) => (
                <div key={i} className="border border-border rounded-xl overflow-hidden bg-muted/10">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center p-5 text-left font-extrabold text-[#0A2E1F] text-sm sm:text-base hover:bg-muted/40 transition-colors"
                  >
                    <span className={isRTL ? "text-right" : "text-left"}>{faq.q}</span>
                    <span className="text-[#76C945] font-black shrink-0 ml-4">
                      {openFaq === i ? '−' : '+'}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 border-t border-border/40 text-muted-foreground text-sm leading-relaxed whitespace-pre-line bg-white">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Side: Sidebar Components (1/3 width) */}
        <div className="space-y-8">
          
          {/* 15. Dealer Inquiry Form */}
          <motion.div
            id="dealer-inquiry"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-white p-8 rounded-3xl border border-border shadow-md overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#76C945] to-[#C5A059]" />
            <h2 className="text-xl font-black text-[#0A2E1F] mb-2">{tPage.dealerInquiry}</h2>
            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">{tPage.dealerInquirySub}</p>

            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleInquirySubmit}
                  className="space-y-4"
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">{tPage.nameLabel} *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Salmaan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-muted/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">{tPage.phoneLabel} *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 03001234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-muted/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">{tPage.cityLabel}</label>
                    <input
                      type="text"
                      placeholder="e.g. Lahore"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-muted/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">{tPage.cropLabel}</label>
                    <input
                      type="text"
                      placeholder="e.g. Cotton"
                      value={formData.crop}
                      onChange={(e) => setFormData({ ...formData, crop: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-muted/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">{tPage.messageLabel}</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-muted/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#0A2E1F] hover:bg-[#0E3E2A] text-white text-sm font-extrabold rounded-xl transition-all shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>{tPage.submitForm}</span>
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 flex flex-col items-center gap-4 bg-green-50/50 rounded-2xl border border-green-100 p-4"
                >
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg text-white">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h3 className="text-lg font-black text-green-900">{tPage.successTitle}</h3>
                  <p className="text-xs text-green-800 leading-relaxed">{tPage.successDesc}</p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', phone: '', city: '', crop: '', message: '' });
                    }}
                    className="mt-2 text-xs font-extrabold text-green-900 bg-green-200/50 px-4 py-2 rounded-full border border-green-200 hover:bg-green-200 transition-all"
                  >
                    {tPage.successClose}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Branding Logo Block */}
          <div className="bg-[#0A2E1F] p-8 rounded-3xl text-white text-center border border-white/10 relative overflow-hidden shadow-md">
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }} />
            <div className="inline-block bg-white/15 backdrop-blur-md rounded-xl px-4 py-2 mb-4">
              <img
                src={vitalAgroLogo}
                alt="Vital Agro Logo"
                className="max-h-14 mx-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                loading="lazy"
              />
            </div>
            <h3 className="font-extrabold text-sm tracking-wider text-[#76C945] uppercase mb-1">Vital Agro Chemical Industries</h3>
            <p className="text-xs text-white/60">Bayer, Syngenta, BASF equivalent International Formulations</p>
          </div>
        </div>
      </div>

      {/* 14. Related Products Section */}
      <section className="bg-muted/30 border-t border-border py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0A2E1F] mb-12 text-center">
            {tPage.relatedProducts}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => {
              const catLabel = CATEGORY_LABELS[lang]?.[p.category] || p.category;
              return (
                <Link
                  key={p.id}
                  to={`/products/${p.id}`}
                  className="group block bg-white rounded-2xl border border-border overflow-hidden hover:border-[#76C945]/30 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-square p-8 flex items-center justify-center bg-gradient-to-b from-muted/50 to-transparent">
                    <img
                      src={p.imageUrl}
                      alt={p.name[lang]}
                      className="max-h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#C5A059]/10 text-[#C5A059] text-xs font-black rounded-full border border-[#C5A059]/20 uppercase">
                        {catLabel}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-black text-[#0A2E1F] text-lg group-hover:text-[#76C945] transition-colors">
                      {p.name[lang]}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                      {p.description[lang]}
                    </p>
                    {p.formulation && (
                      <span className="inline-block mt-4 px-3 py-1 bg-muted text-muted-foreground text-xs font-semibold rounded-full">
                        {p.formulation}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Fullscreen Zoom Image Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-4xl max-h-[85vh] flex flex-col items-center gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={product.imageUrl}
                alt={product.name[lang]}
                className="max-w-full max-h-[75vh] object-contain drop-shadow-[0_35px_60px_rgba(255,255,255,0.15)]"
              />
              <span className="text-white/80 font-black text-sm tracking-wide text-center bg-white/10 px-4 py-2 rounded-full border border-white/20">
                {product.name[lang]} - {product.activeIngredient} ({product.formulation})
              </span>
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 text-white hover:text-[#76C945] font-black text-xl bg-white/10 rounded-full w-8 h-8 flex items-center justify-center border border-white/20"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}