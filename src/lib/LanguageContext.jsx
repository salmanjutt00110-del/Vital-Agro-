import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const translations = {
  en: {
    dir: 'ltr',
    nav: {
      home: 'Home',
      about: 'About Us',
      products: 'Products',
      whyUs: 'Why Vital Agro',
      contact: 'Contact',
      aiScanner: 'AI Scanner',
      getQuote: 'Get a Quote',
      phone: '063-2253137',
    },
    hero: {
      badge: 'Premium Agricultural Solutions',
      heading1: 'Growing Agriculture',
      heading2: 'Through Innovation',
      sub: 'Premium Crop Protection, Plant Nutrition & Modern Agricultural Solutions by Vital Agro Chemical Industries.',
      explore: 'Explore Products',
      dealer: 'Become a Dealer',
      whatsapp: 'WhatsApp',
      years: 'Years Experience',
      products: 'Products',
      farmers: 'Farmers Served',
    },
    stats: {
      experience: 'Years Experience',
      products: 'Products Available',
      dealers: 'Active Dealers',
      farmers: 'Farmers Served',
      customers: 'Happy Customers',
    },
    about: {
      badge: 'About Us',
      title: 'Pioneering Agricultural Excellence',
      desc: "Vital Agro Chemical Industries (Pvt.) Ltd. is committed to revolutionizing Pakistan's agriculture through premium imported formulations, cutting-edge research, and unwavering quality standards. We empower farmers with the best crop protection and nutrition solutions.",
      qualityTitle: 'Quality First',
      qualityDesc: 'Imported premium formulations',
      researchTitle: 'Research Driven',
      researchDesc: 'Science-backed solutions',
      supportTitle: 'Farmer Support',
      supportDesc: 'Dedicated field teams',
      learnMore: 'Learn More About Us',
      yearsExcellence: 'Years of Excellence',
    },
    showcase: {
      badge: 'Our Products',
      title: 'Premium Agricultural Solutions',
      desc: 'Discover our range of high-quality crop protection, plant nutrition, and growth promotion products.',
      viewAll: 'View All Products',
      viewDetails: 'View Details',
    },
    whyUs: {
      badge: 'Why Choose Us',
      title: 'The Vital Agro Advantage',
      desc: 'What sets us apart as a premium agricultural solutions provider.',
      r1Title: 'Premium Imported Formulations',
      r1Desc: 'World-class ingredients sourced from leading international manufacturers for superior performance.',
      r2Title: 'High Quality Standards',
      r2Desc: 'Rigorous quality control at every stage ensures consistent, reliable products.',
      r3Title: 'Research Based Products',
      r3Desc: 'Scientifically developed solutions backed by extensive field trials and research.',
      r4Title: 'Maximum Yield',
      r4Desc: 'Proven to deliver higher crop yields and better-quality produce for farmers.',
      r5Title: 'Expert Team',
      r5Desc: 'Experienced agronomists and field staff providing on-ground support.',
      r6Title: 'Farmer Support',
      r6Desc: 'Dedicated helplines, field visits, and ongoing agricultural advisory services.',
      r7Title: 'Fast Delivery Network',
      r7Desc: 'Extensive distribution network ensuring timely product availability nationwide.',
      r8Title: 'Reliable Performance',
      r8Desc: 'Trusted by thousands of dealers and farmers across Pakistan for consistent results.',
    },
    quality: {
      badge: 'Quality Assurance',
      title: 'Uncompromising Quality at Every Step',
      desc: 'Our commitment to quality is embedded in every process — from sourcing the finest raw materials to delivering the finished product to the farmer.',
      iso: 'ISO Certified',
      isoDesc: 'Quality Standards',
      s1Title: 'Raw Material Sourcing',
      s1Desc: 'Premium ingredients imported from global leaders.',
      s2Title: 'Laboratory Testing',
      s2Desc: 'Every batch tested for purity, concentration and efficacy.',
      s3Title: 'Field Trials',
      s3Desc: 'Rigorous field testing across multiple crop zones.',
      s4Title: 'Quality Certification',
      s4Desc: 'Meets all regulatory standards before market release.',
    },
    cta: {
      title: 'Ready to Transform Your Harvest?',
      desc: 'Connect with our team of agricultural experts and discover the right solutions for your crops. Become a dealer or get a personalized product recommendation.',
      btnGetInTouch: 'Get in Touch',
      btnCallNow: 'Call Now',
    },
    footer: {
      desc: 'Premium Crop Protection, Plant Nutrition & Modern Agricultural Solutions for progressive farmers across Pakistan.',
      quickLinks: 'Quick Links',
      categories: 'Categories',
      contact: 'Contact Us',
      copy: `© ${new Date().getFullYear()} Vital Agro Chemical Industries (Pvt.) Ltd. All Rights Reserved.`,
      tagline: 'Premium Agricultural Solutions Since Inception',
    },
    categories: {
      insecticide: 'Insecticide',
      herbicide: 'Herbicide',
      fungicide: 'Fungicide',
      plant_nutrition: 'Plant Nutrition',
      growth_promoter: 'Growth Promoter',
      special_product: 'Special Product',
    },
    pricing: {
      packSize: 'Pack Size',
      cartonPacking: 'Carton Packing',
      netRate: 'Net Rate',
      genericName: 'Generic Name',
      retailPrice: 'Retail Price (PKR)',
    },
  },
  ur: {
    dir: 'rtl',
    nav: {
      home: 'ہوم',
      about: 'ہمارے بارے میں',
      products: 'مصنوعات',
      whyUs: 'وائٹل ایگرو کیوں',
      contact: 'رابطہ',
      aiScanner: 'اے آئی سکینر',
      getQuote: 'قیمت پوچھیں',
      phone: '٠٦٣-٢٢٥٣١٣٧',
    },
    hero: {
      badge: 'اعلیٰ زرعی حل',
      heading1: 'زراعت کو ترقی دیں',
      heading2: 'جدت کے ذریعے',
      sub: 'وائٹل ایگرو کیمیکل انڈسٹریز کی جانب سے اعلیٰ فصل تحفظ، پودوں کی غذائیت اور جدید زرعی حل۔',
      explore: 'مصنوعات دیکھیں',
      dealer: 'ڈیلر بنیں',
      whatsapp: 'واٹس ایپ',
      years: 'سال کا تجربہ',
      products: 'مصنوعات',
      farmers: 'کاشتکار',
    },
    stats: {
      experience: 'سالوں کا تجربہ',
      products: 'دستیاب مصنوعات',
      dealers: 'فعال ڈیلرز',
      farmers: 'خدمت خلق کاشتکار',
      customers: 'مطمئن گاہک',
    },
    about: {
      badge: 'ہمارے بارے میں',
      title: 'زرعی فضیلت کا پیش خیمہ',
      desc: 'وائٹل ایگرو کیمیکل انڈسٹریز (پرائیویٹ) لمیٹڈ پاکستان کی زراعت میں درآمدی فارمولیشنز، جدید ترین تحقیق، اور اعلیٰ ترین معیار کے ذریعے انقلاب لانے کے لیے پرعزم ہے۔ ہم کاشتکاروں کو بہترین فصل تحفظ اور پودوں کی غذائیت کے حل فراہم کرتے ہیں۔',
      qualityTitle: 'معیار اول',
      qualityDesc: 'درآمد شدہ اعلیٰ فارمولیشنز',
      researchTitle: 'تحقیق پر مبنی',
      researchDesc: 'سائنس سے تصدیق شدہ حل',
      supportTitle: 'کاشتکار رہنمائی',
      supportDesc: 'مخصوص فیلڈ ٹیمیں',
      learnMore: 'ہمارے بارے میں مزید جانیں',
      yearsExcellence: 'سالہ شاندار خدمات',
    },
    showcase: {
      badge: 'ہماری مصنوعات',
      title: 'اعلیٰ زرعی حل',
      desc: 'فصلوں کے تحفظ، پودوں کی غذائیت اور نمو بڑھانے کے لیے ہماری بہترین مصنوعات دیکھیں۔',
      viewAll: 'تمام مصنوعات دیکھیں',
      viewDetails: 'تفصیلات دیکھیں',
    },
    whyUs: {
      badge: 'ہمیں کیوں منتخب کریں',
      title: 'وائٹل ایگرو کا فائدہ',
      desc: 'کون سی چیز ہمیں ایک بہترین زرعی حل فراہم کار کے طور پر ممتاز کرتی ہے۔',
      r1Title: 'اعلیٰ درآمدی فارمولیشنز',
      r1Desc: 'بہترین کارکردگی کے لیے معروف عالمی مینوفیکچررز سے حاصل کردہ بین الاقوامی معیار کے اجزاء۔',
      r2Title: 'اعلیٰ معیار کے معیارات',
      r2Desc: 'ہر مرحلے پر سخت کوالٹی کنٹرول مسلسل اور قابل اعتماد مصنوعات کو یقینی بناتا ہے۔',
      r3Title: 'تحقیق پر مبنی مصنوعات',
      r3Desc: 'وسیع فیلڈ ٹرائلز اور سائنسی تحقیق سے تیار کردہ ثابت شدہ حل۔',
      r4Title: 'زیادہ سے زیادہ پیداوار',
      r4Desc: 'کاشتکاروں کے لیے زیادہ پیداوار اور بہتر معیار کے اناج کی ضمانت۔',
      r5Title: 'ماہر ٹیم',
      r5Desc: 'زمین پر براہ راست مدد فراہم کرنے والے تجربہ کار زرعی ماہرین اور فیلڈ عملہ۔',
      r6Title: 'کاشتکار سپورٹ',
      r6Desc: 'مخصوص ہیلپ لائنز، فیلڈ وزٹس اور مسلسل زرعی مشاورتی خدمات۔',
      r7Title: 'تیز ترین سپلائی نیٹ ورک',
      r7Desc: 'ملک بھر میں مصنوعات کی بروقت فراہمی کو یقینی بنانے والا وسیع نیٹ ورک۔',
      r8Title: 'قابل اعتماد کارکردگی',
      r8Desc: 'پاکستان بھر میں ہزاروں ڈیلرز اور کاشتکاروں کا مسلسل نتائج کے لیے وائٹل ایگرو پر بھروسہ۔',
    },
    quality: {
      badge: 'کوالٹی اشورینس',
      title: 'ہر قدم پر غیر سمجھوتہ معیار',
      desc: 'معیار کے ساتھ ہماری وابستگی ہر عمل کا حصہ ہے — بہترین خام مال کے حصول سے لے کر کاشتکار تک حتمی مصنوع کی فراہمی تک۔',
      iso: 'آئی ایس او مصدقہ',
      isoDesc: 'معیاری ضوابط',
      s1Title: 'خام مال کا حصول',
      s1Desc: 'عالمی اداروں سے درآمد کردہ بہترین اور خالص اجزاء۔',
      s2Title: 'لیبارٹری ٹیسٹنگ',
      s2Desc: 'ہر بیج کا خالصیت، ارتکاز اور افادیت کے لیے لیبارٹری ٹیسٹ۔',
      s3Title: 'فیلڈ ٹرائلز',
      s3Desc: 'مختلف زرعی علاقوں میں فصلوں پر سخت فیلڈ ٹیسٹنگ۔',
      s4Title: 'کوالٹی سرٹیفیکیشن',
      s4Desc: 'مارکیٹ میں لانچ سے پہلے تمام ریگولیٹری معیارات پر پورا اترنا۔',
    },
    cta: {
      title: 'اپنی فصل کی پیداوار کو بدلنے کے لیے تیار ہیں؟',
      desc: 'ہمارے زرعی ماہرین کی ٹیم سے رابطہ کریں اور اپنی فصلوں کے لیے بہترین حل تلاش کریں۔ ڈیلر بنیں یا ذاتی نوعیت کی مصنوعات کی تجویز حاصل کریں۔',
      btnGetInTouch: 'رابطہ کریں',
      btnCallNow: 'ابھی کال کریں',
    },
    footer: {
      desc: 'پاکستان بھر کے ترقی پسند کاشتکاروں کے لیے اعلیٰ فصل تحفظ، پودوں کی غذائیت اور جدید زرعی حل۔',
      quickLinks: 'فوری لنکس',
      categories: 'زمرہ جات',
      contact: 'ہم سے رابطہ کریں',
      copy: `© ${new Date().getFullYear()} وائٹل ایگرو کیمیکل انڈسٹریز (پرائیویٹ) لمیٹڈ۔ جملہ حقوق محفوظ ہیں۔`,
      tagline: 'آغاز سے اعلیٰ زرعی حل',
    },
    categories: {
      insecticide: 'کیڑے مار دوا',
      herbicide: 'جڑی بوٹی مار دوا',
      fungicide: 'فنگس مار دوا',
      plant_nutrition: 'پودوں کی غذائیت',
      growth_promoter: 'نمو بڑھانے والا',
      special_product: 'خاص مصنوع',
    },
    pricing: {
      packSize: 'پیکنگ سائز',
      cartonPacking: 'کارٹن پیکنگ',
      netRate: 'نیٹ ریٹ',
      genericName: 'جنرک نام',
      retailPrice: 'ریٹیل پرائس (روپے)',
    },
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const saved = localStorage.getItem('vital_agro_lang');
    return saved === 'ur' ? 'ur' : 'en';
  });

  const setLang = (newLang) => {
    setLangState(newLang);
    localStorage.setItem('vital_agro_lang', newLang);
  };

  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <div dir={t.dir} style={{ fontFamily: lang === 'ur' ? "'Noto Sans Arabic', 'Noto Nastaliq Urdu', sans-serif" : undefined }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}