import { useState, useCallback } from 'react';
import { AppProvider, useApp } from './AppContext';
import { ToastProvider } from './components/Toast';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Dashboard } from './pages/Dashboard';
import { Challenges } from './pages/Challenges';
import { Achievements } from './pages/Achievements';
import { Impact } from './pages/Impact';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';
import type { Page } from './types';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { state } = useApp();

  const handleNavigate = useCallback((page: Page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'challenges':
        return <Challenges />;
      case 'achievements':
        return <Achievements />;
      case 'impact':
        return <Impact />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'profile':
        return <Profile onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className={`min-h-screen ${state.preferences.theme === 'dark' ? 'bg-gray-900' : 'bg-cream'}`}>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden animate-fade-in">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 shadow-2xl">
            <Sidebar
              currentPage={currentPage}
              onNavigate={handleNavigate}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="md:ml-64 min-h-screen flex flex-col justify-between">
        <div>
          <Header
            currentPage={currentPage}
            onMenuClick={() => setSidebarOpen(true)}
          />
          <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto pb-24 md:pb-12">
            {renderPage()}
          </main>
        </div>

        {/* Mobile Floating Bottom Dock */}
        <MobileBottomNav
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </AppProvider>
  );
}

export default App;
