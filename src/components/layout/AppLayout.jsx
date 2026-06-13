import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingButtons from './FloatingButtons';
import ScrollToTop from '../ScrollToTop';
import AICropAssistant from '../ai/AICropAssistant';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileBottomNav } from './MobileBottomNav';

export default function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[#020d06] text-white">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 relative overflow-x-hidden pb-20 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 1.02, filter: 'blur(8px)' }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingButtons />
      <AICropAssistant />
      <MobileBottomNav />
    </div>
  );
}