import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Hero from './components/Home/Hero';
import Services from './components/Home/Services';
import Testimonials from './components/Home/Testimonials';
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
            <Hero onNavigate={handleNavigate} />
            <Services onNavigate={handleNavigate} />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      <main>
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;