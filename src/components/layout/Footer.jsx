const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, MapPin, ArrowUpRight, Leaf } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import vitalAgroLogo from '@/assets/vital agro logo.webp';
import vitalGroupLogo from '@/assets/vital group.webp';
import tagLogo from '@/assets/tag logo.webp';

export default function Footer() {
  const { t } = useLanguage();

  const QUICK_LINKS = [
    { label: t.nav.home, path: '/' },
    { label: t.nav.about, path: '/about' },
    { label: t.nav.products, path: '/products' },
    { label: t.nav.whyUs, path: '/why-us' },
    { label: t.nav.contact, path: '/contact' },
  ];

  const CATEGORIES = [
    t.categories.insecticide,
    t.categories.herbicide,
    t.categories.fungicide,
    t.categories.plant_nutrition,
    t.categories.growth_promoter,
    t.categories.special_product,
  ];

  return (
    <footer className="relative bg-[#0A2E1F] text-white overflow-hidden">
      {/* Curved top transition */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-background" style={{ borderRadius: '0 0 50% 50%' }} />

      {/* Floating decorative leaves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              right: `${5 + i * 25}%`,
              top: `${30 + (i % 2) * 30}%`,
            }}
            animate={{
              y: [-8, 8, -8],
              rotate: [0, 15, -10, 0],
              opacity: [0.04, 0.08, 0.04],
            }}
            transition={{ duration: 7 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i }}
          >
            <Leaf className="w-16 h-16 text-[#76C945]" />
          </motion.div>
        ))}
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative pt-32 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              {/* Logo cluster */}
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white/15 backdrop-blur-md rounded-xl px-3 py-2 shadow-lg shadow-white/5">
                  <img
                    src={vitalAgroLogo}
                    alt="Vital Agro Logo"
                    className="h-11 w-auto object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.3)]"
                  />
                </div>
                <span className="h-8 w-px bg-white/20" />
                <div className="bg-white/10 backdrop-blur-md rounded-xl px-3 py-2">
                  <img
                    src={vitalGroupLogo}
                    alt="Vital Group Logo"
                    className="h-9 w-auto object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.25)]"
                  />
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {t.footer.desc}
              </p>

              {/* Tag Logo */}
              <div className="mb-6 flex items-center gap-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-2.5 py-1.5">
                  <img
                    src={tagLogo}
                    alt="Tag Logo"
                    className="h-8 w-auto object-contain drop-shadow-[0_0_6px_rgba(255,255,255,0.2)]"
                  />
                </div>
                <span className="text-[#76C945]/60 text-xs font-medium">Certified Quality</span>
              </div>

              <div className="flex gap-3">
                <a
                  href="https://wa.me/923011837160"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-green-600 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-green-600/20"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a
                  href="tel:+920632253137"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-black tracking-widest uppercase text-[#76C945] mb-6">{t.footer.quickLinks}</h4>
              <ul className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white text-sm transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#76C945]/40 group-hover:bg-[#76C945] transition-colors" />
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-sm font-black tracking-widest uppercase text-[#76C945] mb-6">{t.footer.categories}</h4>
              <ul className="space-y-3">
                {CATEGORIES.map((cat) => (
                  <li key={cat}>
                    <Link
                      to="/products"
                      className="text-white/70 hover:text-white text-sm transition-all duration-300 flex items-center gap-2 group hover:translate-x-1"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]/40 group-hover:bg-[#C5A059] transition-colors" />
                      {cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-black tracking-widest uppercase text-[#76C945] mb-6">{t.footer.contact}</h4>
              <ul className="space-y-5">
                {[
                  { icon: MapPin, value: 'Plot No. 50 & 56, Vital Office, Haroonabad, Distt. Bahawalnagar, Pakistan', link: 'https://www.google.com/maps/dir/?api=1&destination=Plot+No.+50+%26+56%2C+Vital+Office%2C+Haroonabad%2C+Distt.+Bahawalnagar%2C+Pakistan' },
                  { icon: Phone, value: '063-2253137', link: 'tel:+920632253137' },
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-sm group">
                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                      <item.icon className="w-4 h-4 text-white/50 group-hover:text-[#76C945] transition-colors" />
                    </div>
                    <a
                      href={item.link}
                      target={item.link.startsWith('http') ? '_blank' : undefined}
                      rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-white/70 hover:text-white leading-relaxed hover:underline transition-colors"
                    >
                      {item.value}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Dealer CTA */}
              <Link
                to="/contact"
                className="mt-6 block w-full text-center px-5 py-3 bg-gradient-to-r from-[#76C945] to-[#5BAD35] text-[#0A2E1F] font-bold rounded-xl hover:shadow-lg hover:shadow-[#76C945]/20 transition-all duration-300 text-sm"
              >
                Become a Dealer
              </Link>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">{t.footer.copy}</p>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 rounded-md px-1.5 py-0.5">
                <img src={vitalAgroLogo} alt="VA" className="h-5 w-auto drop-shadow-sm" />
              </div>
              <p className="text-white/30 text-xs">{t.footer.tagline}</p>
              <p className="text-center text-white/70 mt-2">Raman Urdu</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}