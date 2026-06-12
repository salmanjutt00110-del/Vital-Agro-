import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle, MapPin, Home, Info, ShoppingBag, Award, PhoneCall, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { useCart } from '@/lib/CartContext';
import vitalAgroLogo from '@/assets/vital agro logo.webp';
import vitalGroupLogo from '@/assets/vital group.webp';
import tagLogo from '@/assets/tag logo.webp';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();
  const { cartCount, setIsCartOpen } = useCart();

  const NAV_LINKS = [
    { label: t.nav.home, path: '/', icon: Home },
    { label: t.nav.about, path: '/about', icon: Info },
    { label: t.nav.products, path: '/products', icon: ShoppingBag },
    { label: t.nav.whyUs, path: '/why-us', icon: Award },
    { label: t.nav.contact, path: '/contact', icon: MapPin },
    { label: t.nav.aiScanner, path: '/ai-scanner', icon: Sparkles },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 40;
      setScrolled((prev) => (prev !== nextScrolled ? nextScrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  const isLight = false;
  const navBg = scrolled
    ? 'bg-black/85 backdrop-blur-[24px] border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5),0_0_15px_rgba(92,184,92,0.15)]'
    : 'bg-black/40 backdrop-blur-[16px] border-b border-white/5 shadow-md shadow-black/15';
  const textColor = 'text-white/90';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`} style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
          {/* Logo cluster — Vital Agro + Vital Group + Tag */}
          <Link to="/" className="flex items-center gap-3 group">
            {/* Vital Agro Logo — always show original colors with enhanced visibility */}
            <div className="relative flex items-center justify-center rounded-lg px-1 py-0.5 bg-white/15 backdrop-blur-md shadow-lg shadow-white/5">
              <img
                src={vitalAgroLogo}
                alt="Vital Agro Logo"
                width="112"
                height="48"
                className="h-10 sm:h-12 w-auto object-contain transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
              />
            </div>
            
            {/* Desktop only logos */}
            <div className="hidden lg:flex items-center gap-3">
              <span className="h-8 w-px transition-colors duration-300 bg-white/30" />
              {/* Vital Group Logo */}
              <div className="relative flex items-center justify-center rounded-lg px-1 py-0.5 bg-white/10 backdrop-blur-md">
                <img
                  src={vitalGroupLogo}
                  alt="Vital Group Logo"
                  width="88"
                  height="36"
                  className="h-8 sm:h-9 w-auto object-contain transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                />
              </div>
              <span className="h-6 w-px transition-colors duration-300 bg-white/20" />
              {/* Tag Logo */}
              <div className="relative flex items-center justify-center rounded-lg px-1 py-0.5 bg-white/10 backdrop-blur-md">
                <img
                  src={tagLogo}
                  alt="Tag Logo"
                  width="64"
                  height="28"
                  className="h-6 sm:h-7 w-auto object-contain transition-all duration-300 drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]"
                />
              </div>
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
                    ? 'text-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.08)]'
                    : 'text-white/80 hover:text-[#8AD65A] hover:drop-shadow-[0_0_8px_rgba(138,214,90,0.5)]'
                  }`}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#76C945] rounded-full shadow-[0_0_8px_#76C945]"
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

            {/* Cart Icon Toggle */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95
                ${isLight
                  ? 'border-[#0A2E1F]/20 text-[#0A2E1F] bg-[#0A2E1F]/5 hover:bg-[#0A2E1F]/10'
                  : 'border-white/30 text-white bg-white/10 hover:bg-white/20'
                }`}
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#76C945] text-[#0A2E1F] text-[9px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#0A2E1F]/20 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

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

          {/* Mobile: Lang + Cart + Toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-200 active:scale-95
                ${isLight ? 'border-[#0A2E1F]/20 text-[#0A2E1F] bg-[#0A2E1F]/5' : 'border-white/30 text-white bg-white/10'}`}
              aria-label="Open cart"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#76C945] text-[#0A2E1F] text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <motion.button
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              className={`w-12 h-12 flex items-center justify-center rounded-full text-xs font-bold border transition-all duration-200 active:scale-95
                ${isLight ? 'border-[#0A2E1F]/20 text-[#0A2E1F] bg-[#0A2E1F]/5' : 'border-white/30 text-white bg-white/10'}`}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle language"
            >
              {lang === 'en' ? '🇵🇰' : '🇬🇧'}
            </motion.button>
            <button
              onClick={() => setMobileOpen(true)}
              className={`w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-200 active:scale-95 ${textColor}`}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[300px] xs:w-[320px] bg-[#0A2E1F]/95 backdrop-blur-3xl border-l border-white/10 z-50 shadow-2xl flex flex-col pt-6 overflow-y-auto select-none text-white"
              style={{ 
                paddingTop: 'calc(env(safe-area-inset-top, 0px) + 24px)',
                paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)'
              }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 pb-4 border-b border-white/10">
                <span className="text-sm font-black tracking-widest text-[#76C945] uppercase">
                  {lang === 'en' ? 'Vital Menu' : 'مینو'}
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all active:scale-95"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 px-4 py-6 space-y-2">
                {NAV_LINKS.map((link, i) => {
                  const LinkIcon = link.icon;
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-base font-bold transition-all duration-300
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
              <div className="px-6 py-6 border-t border-white/10 space-y-4 bg-black/20 pb-12">
                <span className="text-[10px] text-white/40 block font-black uppercase tracking-widest px-2">
                  {lang === 'en' ? 'Quick Operations' : 'فوری روابط'}
                </span>
                
                <div className="grid grid-cols-2 gap-2.5">
                  {/* Call Office */}
                  <a
                    href="tel:+920632253137"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center group min-h-[48px]"
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
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center group min-h-[48px]"
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
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-center group min-h-[48px]"
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
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#76C945]/10 border border-[#76C945]/30 hover:bg-[#76C945]/20 transition-all text-center group min-h-[48px]"
                  >
                    <Award className="w-5 h-5 text-[#8AD65A] mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-black text-[#8AD65A]">{lang === 'en' ? 'Get Quote' : 'کوٹیشن حاصل کریں'}</span>
                    <span className="text-[9px] text-[#8AD65A]/60 mt-0.5">{lang === 'en' ? 'Instant Request' : 'فوری رابطہ'}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}