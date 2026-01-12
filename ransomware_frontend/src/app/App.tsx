import { useState } from 'react';
import { Navigation } from './components/navigation';
import { AboutPage } from './components/about-page';
import { LoginModal } from './components/login-modal';
import { PricingPage } from './components/pricing-page';
import { Dashboard } from './components/dashboard';

type Page = 'dashboard' | 'about' | 'pricing';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = (email: string, password: string) => {
    console.log('Login attempt:', email);
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setCurrentPage('dashboard');
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      return;
    }
    setShowLoginModal(true);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isLoggedIn={isLoggedIn}
        onLogin={handleLoginClick}
      />

      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'pricing' && <PricingPage />}

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}
