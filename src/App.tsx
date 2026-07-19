import React, { useState } from 'react';
import { PublicPageLayout } from './components/templates/PublicPageLayout';
import { HeroSection } from './components/organisms/HeroSection';
import { ServicesGrid } from './components/organisms/ServicesGrid';
import { TestimonialsSection } from './components/organisms/TestimonialsSection';
import AboutPage from './components/About/AboutPage';
import PlansPage from './components/Plans/PlansPage';
import SchedulePage from './components/Schedule/SchedulePage';
import ContactPage from './components/Contact/ContactPage';

export interface SelectedPlan {
  name: string;
  type: string;
  price: number;
  duration: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);

  const handleNavigate = (page: string, plan?: SelectedPlan) => {
    setCurrentPage(page);
    if (plan) setSelectedPlan(plan);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'plans':
        return <PlansPage onNavigate={handleNavigate} />;
      case 'schedule':
        return <SchedulePage />;
      case 'contact':
        return <ContactPage selectedPlan={selectedPlan} />;
      default:
        return (
          <>
            <HeroSection onNavigate={handleNavigate} />
            <ServicesGrid onNavigate={handleNavigate} />
            <TestimonialsSection />
          </>
        );
    }
  };

  return (
    <PublicPageLayout currentPage={currentPage} onNavigate={handleNavigate}>
      {renderPage()}
    </PublicPageLayout>
  );
}

export default App;
