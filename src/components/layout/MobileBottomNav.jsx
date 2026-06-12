import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const BOTTOM_TABS = [
  { label: 'Home',     icon: '🏠', path: '/'         },
  { label: 'Products', icon: '🧪', path: '/products' },
  { label: 'Spacer',   icon: '',   path: '#', isSpacer: true },
  { label: 'Scanner',  icon: '🤖', path: '/ai-scanner'},
  { label: 'Contact',  icon: '📍', path: '/contact'  },
];

export const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 md:hidden safe-bottom"
      style={{
        background: 'rgba(6,20,6,0.96)',
        backdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="flex items-center justify-around px-2 pt-2 pb-1">
        {BOTTOM_TABS.map((tab, idx) => {
          if (tab.isSpacer) {
            return <div key="spacer" className="w-14 h-10 shrink-0" />;
          }

          const isActive = location.pathname === tab.path;
          return (
            <Link key={tab.path} to={tab.path}
              className="flex flex-col items-center gap-1 py-1 px-3 rounded-2xl
                transition-all duration-200 min-w-[60px]"
              style={{
                background: isActive ? 'rgba(45,106,45,0.25)' : 'transparent',
              }}
            >
              <motion.span
                className="text-lg"
                animate={{ scale: isActive ? 1.15 : 1 }}
                style={{
                  filter: isActive
                    ? 'drop-shadow(0 0 6px rgba(92,184,92,0.8))'
                    : 'none',
                }}
              >
                {tab.icon}
              </motion.span>
              <span className={`text-[9px] font-semibold
                ${isActive ? 'text-[#5cb85c]' : 'text-white/35'}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
