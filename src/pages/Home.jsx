import React from 'react';
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
