import React from 'react';
import HeroSection from '../Components/HeroSection';
import Features from '../Components/Features';
import CTA from '../Components/CTA';
import Footer from '../Components/Footer';
import './landingpage.css';

function LandingPage() {
  return (
    <div className="App">
      <HeroSection />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}

export default LandingPage;
