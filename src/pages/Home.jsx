import React from 'react';
import SEOHead from '@/lib/seo/SEOHead';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import AboutPreview from '../components/home/AboutPreview';
import ProductsShowcase from '../components/home/ProductsShowcase';
import WhyChooseUs from '../components/home/WhyChooseUs';
import QualitySection from '../components/home/QualitySection';
import CTASection from '../components/home/CTASection';

export default function Home() {
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
      <StatsSection />
      <AboutPreview />
      <ProductsShowcase />
      <WhyChooseUs />
      <QualitySection />
      <CTASection />
    </div>
  );
}
