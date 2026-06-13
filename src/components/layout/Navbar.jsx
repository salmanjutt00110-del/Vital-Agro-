'use client';

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { useCart } from '@/lib/CartContext';
import vitalAgroLogo from '@/assets/vital agro logo.webp';
import vitalGroupLogo from '@/assets/vital group.webp';
import tagLogo from '@/assets/tag logo.webp';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const { lang, setLang, t } = useLanguage();
  const { cartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const NAV_LINKS = [
    { label: lang === 'ur' ? t.nav.about : 'About Us', path: '/about' },
    { label: lang === 'ur' ? t.nav.products : 'Products', path: '/products' },
    { label: lang === 'ur' ? t.nav.whyUs : 'Why Vital', path: '/why-us' },
    { label: lang === 'ur' ? t.nav.contact : 'Contact', path: '/contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(6,20,6,0.95)] backdrop-blur-[24px] border-b border-white/8 shadow-[0_4px_30px_rgba(0,0,0,0.4)]'
            : 'bg-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* LEFT: Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative flex items-center justify-center rounded-lg px-1.5 py-0.5 bg-white/10 backdrop-blur-md">
              <img
                src={vitalAgroLogo}
                alt="Vital Agro Logo"
                className="h-9 w-auto object-contain transition-all duration-300 drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]"
              />
            </div>
            {/* Desktop: show group logos */}
            <div className="hidden lg:flex items-center gap-3 border-l border-white/15 pl-3">
              <div className="relative flex items-center justify-center rounded-lg px-1 py-0.5 bg-white/5 backdrop-blur-md">
                <img src={vitalGroupLogo} alt="Vital Group" className="h-6 w-auto object-contain opacity-70" />
              </div>
              <div className="relative flex items-center justify-center rounded-lg px-1 py-0.5 bg-white/5 backdrop-blur-md">
                <img src={tagLogo} alt="TAG" className="h-6 w-auto object-contain opacity-70" />
              </div>
            </div>
          </Link>

          {/* CENTER: Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-[#5cb85c] bg-[rgba(92,184,92,0.12)]'
                      : 'text-white/60 hover:text-white hover:bg-white/6'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* RIGHT: Actions */}
          <div className="flex items-center gap-2">
            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-10 h-10 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center hover:bg-white/12 transition-colors"
              aria-label="Open cart"
            >
              <ShoppingBag className="w-4.5 h-4.5 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#5cb85c] text-[#0A2E1F] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Urdu toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 text-white/60 text-xs font-semibold hover:border-white/25 hover:text-white transition-all"
            >
              {lang === 'en' ? (
                <>🇵🇰 اردو</>
              ) : (
                <>🇬🇧 EN</>
              )}
            </button>

            {/* Get Quote CTA */}
            <Link
              to="/contact"
              className="hidden md:flex items-center px-4 py-2 rounded-xl bg-[#2d6a2d] text-white text-sm font-bold hover:bg-[#3d8c3d] transition-colors shadow-[0_0_20px_rgba(92,184,92,0.25)]"
            >
              {lang === 'en' ? 'Get a Quote' : 'رابطہ کریں'}
            </Link>

            {/* THREE-DOT HAMBURGER — Mobile only */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-white/6 border border-white/10 hover:bg-white/12 transition-colors gap-[5px]"
              aria-label="Menu"
            >
              <motion.div
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="w-5 h-[2px] bg-white/80 rounded-full origin-center"
              />
              <motion.div
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="w-3.5 h-[2px] bg-white/80 rounded-full"
              />
              <motion.div
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="w-5 h-[2px] bg-white/80 rounded-full origin-center"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU DRAWER */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-[280px] md:hidden flex flex-col overflow-y-auto"
              style={{
                background: 'rgba(6,20,6,0.98)',
                backdropFilter: 'blur(40px)',
                borderLeft: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
                <img src={vitalAgroLogo} alt="Vital Agro" className="h-8 w-auto object-contain bg-white/10 p-1 rounded-lg" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 rounded-xl bg-white/8 text-white/60 hover:text-white flex items-center justify-center text-lg"
                >
                  ✕
                </button>
              </div>

              {/* Nav links — TEXT ONLY, NO EMOJIS */}
              <div className="flex-1 px-4 py-6 space-y-1">
                {NAV_LINKS.map((link, i) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                          isActive
                            ? 'bg-[rgba(92,184,92,0.18)] text-[#5cb85c] border border-[rgba(92,184,92,0.25)]'
                            : 'text-white/70 hover:text-white hover:bg-white/6'
                        }`}
                      >
                        <span>{link.label}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#5cb85c] shadow-[0_0_6px_rgba(92,184,92,0.8)]" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Quick actions */}
              <div className="px-4 pb-8 border-t border-white/8 pt-4 space-y-4">
                <p className="text-white/30 text-[10px] uppercase tracking-widest px-2">
                  {lang === 'en' ? 'Quick Actions' : 'فوری روابط'}
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { label: lang === 'en' ? 'Call Office' : 'دفتر کال کریں', sub: '063-2253137', action: 'tel:0632253137' },
                    { label: lang === 'en' ? 'WhatsApp' : 'واٹس ایپ', sub: '0301-1837160', action: 'https://wa.me/923011837160' },
                    { 
                      label: lang === 'en' ? 'Get Directions' : 'لوکیشن نقشہ', 
                      sub: 'Haroonabad', 
                      action: 'https://www.google.com/maps/dir/?api=1&destination=Plot+No.+50+%26+56%2C+Vital+Office%2C+Haroonabad%2C+Distt.+Bahawalnagar%2C+Pakistan' 
                    },
                    { label: lang === 'en' ? 'Get Quote' : 'کوٹیشن', sub: 'Instant', action: '/contact', highlight: true },
                  ].map((item) => (
                    <a
                      key={item.label}
                      href={item.action}
                      target={item.action.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className={`p-3 rounded-2xl border text-left transition-all duration-200 ${
                        item.highlight
                          ? 'bg-[rgba(45,106,45,0.3)] border-[rgba(92,184,92,0.4)] text-[#5cb85c]'
                          : 'bg-white/4 border-white/8 text-white/60'
                      }`}
                    >
                      <p className="text-xs font-bold">{item.label}</p>
                      <p className="text-[10px] opacity-60 mt-0.5">{item.sub}</p>
                    </a>
                  ))}
                </div>

                {/* Mobile Language Toggle */}
                <button
                  onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
                  className="w-full py-3 rounded-2xl text-center font-bold text-xs border border-white/10 text-white/80 hover:bg-white/5 transition-all"
                >
                  {lang === 'en' ? '🇵🇰 بدلیئے برائے اردو' : '🇬🇧 Switch to English'}
                </button>

                {/* Become a dealer */}
                <Link
                  to="/contact"
                  className="block w-full py-3.5 rounded-2xl text-center font-bold text-sm text-white bg-gradient-to-r from-[#1e5c1e] to-[#2d7a2d] shadow-[0_0_20px_rgba(92,184,92,0.2)]"
                >
                  {lang === 'en' ? 'Become a Dealer' : 'ڈیلر بنیں'}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}