import React, { useEffect } from 'react';
import SEOHead from '@/lib/seo/SEOHead';
import HeroSection from '../components/home/HeroSection';
import PremiumProductRange from '../components/home/PremiumProductRange';
import { prefetchPages } from '@/utils/prefetch';

// Lazy load heavy home sections below the fold to split bundle size and optimize initial load
const StatsSection = React.lazy(() => import('../components/home/StatsSection'));
const AboutPreview = React.lazy(() => import('../components/home/AboutPreview'));
const WhyChooseUs = React.lazy(() => import('../components/home/WhyChooseUs'));
const QualitySection = React.lazy(() => import('../components/home/QualitySection'));
const CTASection = React.lazy(() => import('../components/home/CTASection'));

// Branded loading skeleton matching premium aesthetics
const SectionPlaceholder = ({ height = '300px' }) => (
  <div
    style={{ height }}
    className="w-full bg-[#020d06] animate-pulse border-y border-white/5 flex items-center justify-center"
  >
    <div className="text-white/20 text-[10px] font-mono tracking-[0.3em] uppercase">
      Loading Section...
    </div>
  </div>
);

export default function Home() {
  useEffect(() => {
    prefetchPages();
  }, []);

  return (
    <div>
      <SEOHead
        title="Vital Agro Chemical Industries | Premium Agricultural Solutions"
        description="Pakistan's premium agricultural chemicals company. Crop protection, plant nutrition & modern farming solutions. Serving 50,000+ farmers since inception."
        url="https://vital-agro.vercel.app"
      />
      
      {/* Visually Hidden SEO Heading Hierarchy */}
      <div className="sr-only">
        <h1>Vital Agro Chemical Industries</h1>
        <h2>Growing Agriculture Through Innovation</h2>
        <h3>Premium Crop Protection</h3>
      </div>

      <HeroSection />

      <React.Suspense fallback={<SectionPlaceholder height="150px" />}>
        <StatsSection />
      </React.Suspense>

      <React.Suspense fallback={<SectionPlaceholder height="450px" />}>
        <AboutPreview />
      </React.Suspense>

      <PremiumProductRange />

      <React.Suspense fallback={<SectionPlaceholder height="550px" />}>
        <WhyChooseUs />
      </React.Suspense>

      <React.Suspense fallback={<SectionPlaceholder height="550px" />}>
        <QualitySection />
      </React.Suspense>

      <React.Suspense fallback={<SectionPlaceholder height="320px" />}>
        <CTASection />
      </React.Suspense>
    </div>
  );
}
