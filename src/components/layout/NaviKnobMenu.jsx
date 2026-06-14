'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  Users, 
  FlaskConical, 
  Dna, 
  Bot, 
  Radio, 
  FileText, 
  X
} from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

export default function NaviKnobMenu({ isOpen, onClose }) {
  const { lang, t } = useLanguage();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [rotation, setRotation] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Reset closing flag when menu opens
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  // Route-Change Auto-Close listener
  useEffect(() => {
    if (isOpen) {
      setIsClosing(true);
      const timer = setTimeout(() => {
        onClose();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [pathname, onClose]);

  // Auto rotate the outer system slowly to create depth
  useEffect(() => {
    if (!isOpen || isClosing) return;
    const interval = setInterval(() => {
      setRotation((r) => (r + 0.1) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isOpen, isClosing]);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsClosing(true);
    const timer = setTimeout(() => {
      onClose();
    }, 350);
  };

  // Programmatic click handler for standard SPA routing
  const handleNodeClick = (e, path) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling to parent layers
    handleClose();
    navigate(path);
  };

  // 7 Navigation Nodes configuration with specific angles
  const menuItems = [
    { 
      label: lang === 'ur' ? 'ہوم' : 'HOME', 
      path: '/', 
      angle: 0,
      icon: (props) => (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 1.8 6.6 4.5 8.5" />
          <path d="M12 22V12" />
          <path d="m16 8-4-4-4 4" />
          <path d="M12 4v8" />
          <circle cx="12" cy="12" r="3" className="stroke-[#39ff14] fill-[#39ff14]/10 animate-pulse" />
        </svg>
      )
    },
    { 
      label: lang === 'ur' ? t.nav.about : 'ABOUT US', 
      path: '/about', 
      angle: 51.4,
      icon: Users 
    },
    { 
      label: lang === 'ur' ? t.nav.products : 'PRODUCTS', 
      path: '/products', 
      angle: 102.8,
      icon: FlaskConical 
    },
    { 
      label: lang === 'ur' ? t.nav.whyUs : 'WHY VITAL', 
      path: '/why-us', 
      angle: 154.2,
      icon: Dna 
    },
    { 
      label: lang === 'ur' ? 'اے آئی مشیر' : 'AI ADVISOR', 
      path: '/products', 
      angle: 205.6,
      icon: Bot,
      highlight: true
    },
    { 
      label: lang === 'ur' ? t.nav.contact : 'CONTACT', 
      path: '/contact', 
      angle: 257,
      icon: Radio 
    },
    { 
      label: lang === 'ur' ? 'قیمت معلوم کریں' : 'GET A QUOTE', 
      path: '/contact', 
      angle: 308.4,
      icon: FileText,
      quote: true
    }
  ];

  // Responsive radius calculation
  const getRadius = () => {
    if (window.innerWidth < 640) return 130; // Mobile
    if (window.innerWidth < 768) return 170; // Tablet
    return 230; // Desktop
  };

  const R = getRadius();

  return (
    // Constraint 1: Force master overlay to pointer-events-none
    <div className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-all duration-350 pointer-events-none ${
      isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
    }`}>
      {/* 1. Deep blurred background - enables clicks via pointer-events-auto */}
      <motion.div 
        className="absolute inset-0 bg-[#060a06]/90 backdrop-blur-2xl pointer-events-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        {/* Hydroponic grid/drones vector representations */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#39ff14" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Animated plant root paths */}
            <path d="M100,200 Q150,300 200,450 T300,600" fill="none" stroke="#39ff14" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_20s_linear_infinite]" />
            <path d="M800,100 Q750,250 850,400 T700,800" fill="none" stroke="#0047ab" strokeWidth="2" strokeDasharray="8,4" />
          </svg>
        </div>

        {/* Ambient floating spores */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-[#39ff14] shadow-[0_0_10px_#39ff14]"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
              animate={{
                y: [-20, -100, -20],
                x: [-10, 10, -10],
                opacity: [0.2, 0.8, 0.2]
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* 2. Main 3D Navi-Knob Console Container */}
      <motion.div 
        className="relative w-[650px] h-[650px] max-w-full max-h-full flex items-center justify-center pointer-events-none"
        initial={{ scale: 0.8, opacity: 0, rotate: -30 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotate: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 120 }}
      >
        {/* Connection Struts / Rays from center to orbital nodes */}
        <svg className="absolute w-[600px] h-[600px] pointer-events-none z-10">
          <defs>
            <linearGradient id="strut-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#39ff14" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#0047ab" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#39ff14" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <g transform="translate(300, 300)">
            {menuItems.map((item, index) => {
              const rad = ((item.angle + rotation) * Math.PI) / 180;
              const x2 = R * Math.cos(rad);
              const y2 = R * Math.sin(rad);
              return (
                <g key={index}>
                  <line 
                    x1="0" 
                    y1="0" 
                    x2={x2} 
                    y2={y2} 
                    stroke="url(#strut-glow)" 
                    strokeWidth="1.5" 
                    strokeDasharray="4 8"
                    className="opacity-70"
                  />
                  {/* Glowing signal packet moving along the strut */}
                  <circle r="3" fill="#39ff14" className="shadow-[0_0_8px_#39ff14]">
                    <animateMotion 
                      path={`M 0 0 L ${x2} ${y2}`} 
                      dur={`${1.5 + index * 0.3}s`} 
                      repeatCount="infinite" 
                    />
                  </circle>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Concentric Glassmorphic Rings with circuit patterns */}
        <div className="absolute w-[500px] h-[500px] rounded-full border border-white/5 bg-gradient-to-tr from-[#0047ab]/5 to-transparent backdrop-blur-[2px] pointer-events-none z-0" />
        
        {/* Animated Rotating Middle Ring */}
        <div 
          className="absolute w-[380px] h-[380px] rounded-full border border-dashed border-[#39ff14]/30 pointer-events-none z-0"
          style={{ transform: `rotate(${-rotation * 2}deg)` }}
        />

        {/* Rotating Outer Genetic Dial Ring */}
        <div 
          className="absolute w-[440px] h-[440px] rounded-full border border-dotted border-[#0047ab]/50 pointer-events-none z-0 flex items-center justify-center"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <span className="absolute text-[8px] font-mono text-white/20 select-none tracking-[0.2em] uppercase">
            ATCGTTA--GCTAGCTA--CGATCGAT--AGCTAGCT--GCTAGCTA
          </span>
        </div>

        {/* 3. Orbiting Glass Data-Panels */}
        {/* Constraint 1 & 2: pointer-events-auto and stopPropagation applied directly */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          {menuItems.map((item, index) => {
            const currentAngle = item.angle + rotation;
            const rad = (currentAngle * Math.PI) / 180;
            const x = R * Math.cos(rad);
            const y = R * Math.sin(rad);

            const IconComponent = item.icon;

            return (
              <motion.div
                key={index}
                className="absolute pointer-events-auto cursor-pointer"
                style={{
                  x,
                  y,
                  transform: 'translate(-50%, -50%)',
                }}
                whileHover={{ scale: 1.08 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={(e) => handleNodeClick(e, item.path)}
              >
                <div
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 ${
                    item.highlight 
                      ? 'bg-[#0A2E1F]/80 border-[#39ff14]/40 shadow-[#39ff14]/10' 
                      : item.quote
                      ? 'bg-[#051124]/80 border-[#0047ab]/40 shadow-[#0047ab]/10'
                      : 'bg-black/40 border-white/10 hover:border-[#39ff14]/30'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${
                    item.highlight 
                      ? 'bg-[#39ff14]/15 text-[#39ff14]' 
                      : item.quote
                      ? 'bg-[#0047ab]/15 text-[#39ff14]'
                      : 'bg-white/5 text-white/80'
                  }`}>
                    {item.quote ? (
                      <span className="flex items-center text-xs font-bold gap-0.5 text-[#39ff14]">
                        <FileText className="w-4 h-4 text-white" />
                        <span className="text-[#39ff14] shadow-sm animate-pulse">$</span>
                      </span>
                    ) : (
                      <IconComponent className="w-4 h-4" />
                    )}
                  </div>
                  <div className="text-left select-none">
                    <p className={`text-xs font-black tracking-wide ${
                      item.highlight ? 'text-[#39ff14]' : 'text-white'
                    }`}>
                      {item.label}
                    </p>
                    <p className="text-[8px] text-white/40 font-mono tracking-tighter uppercase">
                      {item.highlight ? 'SECURE_BOT' : item.quote ? 'REQ_QUOTE' : `SYS_NODE_0${index + 1}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 4. Central Core Navi-Knob Component (Acts as Close Button) */}
        {/* Constraint 4: spring-based indicator needle pointing at hovered menu item */}
        <motion.button
          onClick={handleClose}
          className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#051c0c] to-[#0d0d0d] border-[3px] border-white/10 hover:border-[#39ff14]/60 transition-all duration-500 shadow-[0_0_35px_rgba(57,255,20,0.15)] flex flex-col items-center justify-center pointer-events-auto z-30 group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Internal Glowing cores */}
          <div className="absolute inset-1 rounded-full bg-radial-gradient from-[#39ff14]/20 to-transparent animate-[pulse_3s_ease-in-out_infinite]" />
          <div className="absolute inset-2 rounded-full border border-[#0047ab]/40 animate-[spin_10s_linear_infinite]" />
          
          {/* Tactical Cross/Notch */}
          <div className="absolute w-[2px] h-[75%] bg-white/10 group-hover:bg-[#39ff14]/40 transition-colors" />
          <div className="absolute h-[2px] w-[75%] bg-white/10 group-hover:bg-[#39ff14]/40 transition-colors" />

          {/* Indicator Needle */}
          <motion.div 
            className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
            animate={{ 
              rotate: hoveredIndex !== null ? menuItems[hoveredIndex].angle + rotation : rotation 
            }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
          >
            <div className="w-[3px] h-[35px] bg-gradient-to-t from-[#39ff14] to-white rounded-full -translate-y-[15px] shadow-[0_0_8px_#39ff14]" />
          </motion.div>
          
          {/* Inner core display */}
          <div className="relative z-10 flex flex-col items-center justify-center bg-gradient-to-b from-black/80 to-black/40 w-16 h-16 rounded-full border border-white/5 shadow-inner">
            <X className="w-4 h-4 text-white/80 group-hover:text-[#39ff14] transition-colors" />
            <span className="text-[6px] font-mono text-white/40 tracking-wider mt-0.5 group-hover:text-white transition-colors">
              CLOSE
            </span>
          </div>
        </motion.button>
      </motion.div>
    </div>
  );
}
