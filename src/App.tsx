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

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
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
        return <ContactPage />;
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