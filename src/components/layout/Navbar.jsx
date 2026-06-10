import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, MapPin, Home, Info, ShoppingBag, Award, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import vitalAgroLogo from '@/assets/vital agro logo.webp';
import vitalGroupLogo from '@/assets/vital group.webp';
import tagLogo from '@/assets/tag logo.webp';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const NAV_LINKS = [
    { label: t.nav.home, path: '/', icon: Home },
    { label: t.nav.about, path: '/about', icon: Info },
    { label: t.nav.products, path: '/products', icon: ShoppingBag },
    { label: t.nav.whyUs, path: '/why-us', icon: Award },
    { label: t.nav.contact, path: '/contact', icon: MapPin },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileOpen]);

  const getWhatsAppGeneralLink = () => {
    const phone = "923011837160";
    const message = `Hello Vital Agro,

I am interested in getting a quote / purchasing your products. Please provide pricing and catalog.

Thank you.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  const whatsappUrl = getWhatsAppGeneralLink();

  const isHome = location.pathname === '/';
  const isLight = scrolled || !isHome;
  const navBg = isLight
    ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border'
    : 'bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm';
  const textColor = isLight ? 'text-foreground' : 'text-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
          {/* Logo cluster — Vital Agro + Vital Group + Tag */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Vital Agro Logo — always show original colors with enhanced visibility */}
            <div className={`relative flex items-center justify-center rounded-lg px-1 py-0.5 ${!isLight ? 'bg-white/15 backdrop-blur-md shadow-lg shadow-white/5' : ''}`}>
              <img
                src={vitalAgroLogo}
                alt="Vital Agro Logo"
                className={`h-10 sm:h-12 w-auto object-contain transition-all duration-300 ${!isLight ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]' : 'drop-shadow-md'}`}
              />
            </div>
            <span className={`h-8 w-px transition-colors duration-300 ${isLight ? 'bg-border' : 'bg-white/30'}`} />
            {/* Vital Group Logo */}
            <div className={`relative flex items-center justify-center rounded-lg px-1 py-0.5 ${!isLight ? 'bg-white/10 backdrop-blur-md' : ''}`}>
              <img
                src={vitalGroupLogo}
                alt="Vital Group Logo"
                className={`h-8 sm:h-9 w-auto object-contain transition-all duration-300 ${!isLight ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'drop-shadow-sm'}`}
              />
            </div>
            <span className={`h-6 w-px transition-colors duration-300 hidden sm:block ${isLight ? 'bg-border/50' : 'bg-white/20'}`} />
            {/* Tag Logo */}
            <div className={`hidden sm:flex relative items-center justify-center rounded-lg px-1 py-0.5 ${!isLight ? 'bg-white/10 backdrop-blur-md' : ''}`}>
              <img
                src={tagLogo}
                alt="Tag Logo"
                className={`h-6 sm:h-7 w-auto object-contain transition-all duration-300 ${!isLight ? 'drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]' : 'opacity-70'}`}
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-lg
                  ${location.pathname === link.path
                    ? (isLight ? 'text-[#0A2E1F] bg-[#76C945]/10' : 'text-white bg-white/15')
                    : `${textColor} hover:text-[#76C945]`
                  }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#76C945] rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* CTA + Language Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+920632253137"
              className={`flex items-center gap-2 text-sm font-medium ${textColor} transition-colors hover:text-[#76C945]`}
            >
              <Phone className="w-4 h-4" />
              <span>{t.nav.phone}</span>
            </a>

            {/* Language Switcher */}
            <motion.button
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all duration-300 overflow-hidden
                ${isLight
                  ? 'border-[#0A2E1F]/20 text-[#0A2E1F] bg-[#0A2E1F]/5 hover:bg-[#0A2E1F]/10'
                  : 'border-white/30 text-white bg-white/10 hover:bg-white/20'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={lang}
                  initial={{ y: -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 12, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-1"
                >
                  {lang === 'en' ? (
                    <><span className="text-base leading-none">🇵🇰</span> اردو</>
                  ) : (
                    <><span className="text-base leading-none">🇬🇧</span> EN</>
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 btn-premium-primary text-sm font-extrabold rounded-full shadow-md"
            >
              {t.nav.getQuote}
            </a>
          </div>

          {/* Mobile: Lang + Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <motion.button
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold border transition-all
                ${isLight ? 'border-[#0A2E1F]/20 text-[#0A2E1F] bg-[#0A2E1F]/5' : 'border-white/30 text-white bg-white/10'}`}
              whileTap={{ scale: 0.9 }}
            >
              {lang === 'en' ? '🇵🇰 اردو' : '🇬🇧 EN'}
            </motion.button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-lg ${textColor}`}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop (Click to close) */}
      <AnimatePresence>
        {mobileOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden" 
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0A2E1F]/95 backdrop-blur-2xl border-t border-white/10 overflow-hidden relative z-50 shadow-2xl text-white"
          >
            <div className="px-4 py-6 space-y-4">
              <div className="space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const LinkIcon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-base font-bold transition-all duration-300
                          ${isActive
                            ? 'bg-[#76C945]/20 text-[#8AD65A] border-l-4 border-[#76C945] pl-3.5'
                            : 'text-white/80 hover:bg-white/5 hover:text-white'
                          }`}
                      >
                        <LinkIcon className={`w-5 h-5 ${isActive ? 'text-[#8AD65A]' : 'text-white/60'}`} />
                        <span>{link.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Utility Quick Action Grid */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <span className="text-[10px] text-white/40 block font-black uppercase tracking-widest px-2">
                  {lang === 'en' ? 'Quick Operations' : 'فوری روابط'}
                </span>
                
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Call Office */}
                  <a
                    href="tel:+920632253137"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center group"
                  >
                    <PhoneCall className="w-5 h-5 text-[#8AD65A] mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-black text-white/90">{lang === 'en' ? 'Call Office' : 'دفتر کال کریں'}</span>
                    <span className="text-[9px] text-white/40 mt-0.5">063-2253137</span>
                  </a>

                  {/* WhatsApp Support */}
                  <a
                    href={`https://wa.me/923011837160?text=${encodeURIComponent(lang === 'ur' ? 'سلام وائٹل ایگرو، مجھے معلومات درکار ہیں۔' : 'Hello Vital Agro, I need some information.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center group"
                  >
                    <MessageCircle className="w-5 h-5 text-green-400 mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-black text-white/90">{lang === 'en' ? 'WhatsApp Support' : 'واٹس ایپ رابطہ'}</span>
                    <span className="text-[9px] text-white/40 mt-0.5">0301-1837160</span>
                  </a>

                  {/* Google Maps directions */}
                  <a
                    href="https://www.google.com/maps/dir/?api=1&destination=Plot+No.+50+%26+56%2C+Vital+Office%2C+Haroonabad%2C+Distt.+Bahawalnagar%2C+Pakistan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center group"
                  >
                    <MapPin className="w-5 h-5 text-[#C5A059] mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-black text-white/90">{lang === 'en' ? 'Get Directions' : 'لوکیشن نقشہ'}</span>
                    <span className="text-[9px] text-white/40 mt-0.5">Haroonabad</span>
                  </a>

                  {/* Get Quote / Inquiry */}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#76C945]/10 border border-[#76C945]/30 hover:bg-[#76C945]/20 transition-all text-center group"
                  >
                    <Award className="w-5 h-5 text-[#8AD65A] mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-black text-[#8AD65A]">{lang === 'en' ? 'Get Quote' : 'کوٹیشن حاصل کریں'}</span>
                    <span className="text-[9px] text-[#8AD65A]/60 mt-0.5">{lang === 'en' ? 'Instant Request' : 'فوری رابطہ'}</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}