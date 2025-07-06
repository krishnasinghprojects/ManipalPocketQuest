import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import OutbreakSection from '../components/OutbreakSection';
import NewsSection from '../components/NewsSection';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialsSection from '../components/TestimonialsSection';
import TechnologySection from '../components/TechnologySection';
import PricingSection from '../components/PricingSection';
import DownloadSection from '../components/DownloadSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <HeroSection />
        <OutbreakSection />
        <FeaturesSection />
        <TestimonialsSection />
        <HowItWorksSection />
        <PricingSection />
        <TechnologySection />
        <DownloadSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
