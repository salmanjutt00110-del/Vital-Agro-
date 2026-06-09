import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import vitalAgroLogo from '@/assets/vital agro logo.png';
import vitalGroupLogo from '@/assets/vital group.png';
import tagLogo from '@/assets/tag logo.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();

  const NAV_LINKS = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/about' },
    { label: t.nav.products, path: '/products' },
    { label: t.nav.whyUs, path: '/why-us' },
    { label: t.nav.contact, path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const isHome = location.pathname === '/';
  const isLight = scrolled || !isHome;
  const navBg = isLight
    ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border'
    : 'bg-gradient-to-b from-black/30 to-transparent backdrop-blur-sm';
  const textColor = isLight ? 'text-foreground' : 'text-white';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
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

            <Link
              to="/contact"
              className="px-5 py-2.5 bg-gradient-to-r from-[#76C945] to-[#5BAD35] text-[#0A2E1F] text-sm font-bold rounded-full hover:shadow-lg hover:shadow-[#76C945]/25 transition-all duration-300 hover:scale-105"
            >
              {t.nav.getQuote}
            </Link>
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-t border-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors
                      ${location.pathname === link.path
                        ? 'bg-[#76C945]/10 text-[#0A2E1F] font-bold'
                        : 'text-foreground hover:bg-muted'
                      }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-4 border-t border-border mt-4">
                <Link
                  to="/contact"
                  className="block w-full text-center px-5 py-3 bg-gradient-to-r from-[#76C945] to-[#5BAD35] text-[#0A2E1F] font-bold rounded-xl shadow-lg"
                >
                  {t.nav.getQuote}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}