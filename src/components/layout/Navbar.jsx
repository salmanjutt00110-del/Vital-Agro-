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
import NaviKnobMenu from '@/components/layout/NaviKnobMenu';

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
          <div className="flex items-center gap-3.5">
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
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 text-white/60 text-xs font-semibold hover:border-white/25 hover:text-white transition-all"
            >
              {lang === 'en' ? '🇵🇰 اردو' : '🇬🇧 EN'}
            </button>

            {/* Navi-Knob Trigger Button (Replaces traditional mobile menu / drawer button) */}
            <button
              onClick={() => setMenuOpen(true)}
              className="relative w-10 h-10 rounded-full bg-gradient-to-tr from-[#051c0c] to-[#0d0d0d] border border-white/10 hover:border-[#39ff14]/60 transition-all duration-300 shadow-[0_0_15px_rgba(57,255,20,0.2)] flex items-center justify-center group overflow-hidden"
              aria-label="Open Navi-Knob Navigation"
            >
              {/* Rotating outer dotted ring */}
              <div className="absolute inset-0.5 rounded-full border border-dotted border-[#39ff14]/30 group-hover:border-[#39ff14]/60 transition-colors animate-[spin_8s_linear_infinite]" />
              {/* Pulsating core */}
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#39ff14] to-[#0047ab] shadow-[0_0_8px_#39ff14] group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Futuristic Navi-Knob Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <NaviKnobMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}