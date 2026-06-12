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
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { TruckPreloader } from '@/components/Preloader/TruckPreloader';
import { PageLoader } from '@/components/PageLoader';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { useAuthState } from '@/lib/api';
import { auth } from '@/lib/api';
import { HelmetProvider } from 'react-helmet-async';
import ErrorBoundary from './components/layout/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

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
const AdminDashboard = React.lazy(() => import('./pages/admin'));
const AdminLogin = React.lazy(() => import('./pages/admin/AdminLogin'));
const AIScannerPage = React.lazy(() => import('./pages/AIScannerPage'));
const OrderTimeline = React.lazy(() => import('./pages/OrderTimeline'));
const OrderSuccess = React.lazy(() => import('./pages/OrderSuccess'));
const CheckoutPage = React.lazy(() => import('./pages/Checkout'));

// Branded PageLoader imported from components

const AdminLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#080f08]">
    <div className="w-10 h-10 rounded-full border-4 border-[#76C945] border-t-transparent animate-spin" />
  </div>
);

const AdminGuard = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  if (loading) return <AdminLoader />;
  if (!user)   return <AdminLogin />;
  return children;
};

import { AnimatePresence } from 'framer-motion';

const AuthenticatedApp = () => {
  // Bypassed base44 authentication checks to keep the website public and browseable without login
  return (
    <Routes>
      <Route path="/login" element={<ErrorBoundary><Login /></ErrorBoundary>} />
      <Route path="/register" element={<ErrorBoundary><Register /></ErrorBoundary>} />
      <Route path="/forgot-password" element={<ErrorBoundary><ForgotPassword /></ErrorBoundary>} />
      <Route path="/reset-password" element={<ErrorBoundary><ResetPassword /></ErrorBoundary>} />
      <Route path="/admin" element={<ErrorBoundary><AdminGuard><AdminDashboard /></AdminGuard></ErrorBoundary>} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
        <Route path="/products" element={<ErrorBoundary><Products /></ErrorBoundary>} />
        <Route path="/products/:id" element={<ErrorBoundary><ProductDetail /></ErrorBoundary>} />
        <Route path="/checkout" element={<ErrorBoundary><CheckoutPage /></ErrorBoundary>} />
        <Route path="/about" element={<ErrorBoundary><About /></ErrorBoundary>} />
        <Route path="/why-us" element={<ErrorBoundary><WhyUs /></ErrorBoundary>} />
        <Route path="/contact" element={<ErrorBoundary><Contact /></ErrorBoundary>} />
        <Route path="/ai-scanner" element={<ErrorBoundary><AIScannerPage /></ErrorBoundary>} />
        <Route path="/track/:id" element={<ErrorBoundary><OrderTimeline /></ErrorBoundary>} />
        <Route path="/order-success/:id" element={<ErrorBoundary><OrderSuccess /></ErrorBoundary>} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  const hasVisited = sessionStorage.getItem('va_visited');
  const initialState = hasVisited ? 'loading' : 'welcome';
  const [state, setState] = useState(initialState);

  return (
    <HelmetProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>
          <CartProvider>
            <LanguageProvider>
              
              {/* 1. WELCOME SCREEN (first visit only) */}
              <AnimatePresence mode="wait">
                {state === 'welcome' && (
                  <WelcomeScreen
                    onComplete={() => {
                      sessionStorage.setItem('va_visited', '1');
                      setState('loading');
                    }}
                  />
                )}
              </AnimatePresence>

              {/* 2. TRUCK PRELOADER */}
              <AnimatePresence mode="wait">
                {state === 'loading' && (
                  <TruckPreloader
                    onComplete={() => setState('ready')}
                  />
                )}
              </AnimatePresence>

              {/* 3. MAIN APP */}
              {state === 'ready' && (
                <SmoothScroll>
                  <Router>
                    <ScrollToTop />
                    <React.Suspense fallback={<PageLoader />}>
                      <AuthenticatedApp />
                    </React.Suspense>
                    <CartDrawer />
                  </Router>
                </SmoothScroll>
              )}

              <Toaster />
            </LanguageProvider>
          </CartProvider>
        </QueryClientProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;