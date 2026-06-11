import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import { LanguageProvider } from '@/lib/LanguageContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { CartProvider } from '@/lib/CartContext';
import CartDrawer from '@/components/cart/CartDrawer';

import AppLayout from './components/layout/AppLayout';
import Loader from '@/components/layout/Loader';
import SmoothScroll from '@/components/layout/SmoothScroll';

// Route-based Code Splitting using React.lazy
const Home = React.lazy(() => import('./pages/Home'));
const Products = React.lazy(() => import('./pages/Products'));
const ProductDetail = React.lazy(() => import('./pages/ProductDetail'));
const About = React.lazy(() => import('./pages/About'));
const WhyUs = React.lazy(() => import('./pages/WhyUs'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Login = React.lazy(() => import('@/pages/Login'));
const Register = React.lazy(() => import('@/pages/Register'));
const ForgotPassword = React.lazy(() => import('@/pages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('@/pages/ResetPassword'));

const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-[#F4F7F5] dark:bg-[#0A2E1F]">
    <div className="w-10 h-10 rounded-full border-4 border-[#76C945] border-t-transparent animate-spin" />
  </div>
);
import { AnimatePresence } from 'framer-motion';

const AuthenticatedApp = () => {
  // Bypassed base44 authentication checks to keep the website public and browseable without login
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/why-us" element={<WhyUs />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <CartProvider>
          <LanguageProvider>
            <AnimatePresence mode="wait">
              {isAppLoading && (
                <Loader onFinish={() => setIsAppLoading(false)} />
              )}
            </AnimatePresence>

            <SmoothScroll>
              <Router>
                {!isAppLoading && (
                  <React.Suspense fallback={<PageLoader />}>
                    <AuthenticatedApp />
                  </React.Suspense>
                )}
              </Router>
            </SmoothScroll>
            <CartDrawer />
            <Toaster />
          </LanguageProvider>
        </CartProvider>
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App