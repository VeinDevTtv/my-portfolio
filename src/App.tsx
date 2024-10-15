import React, { useEffect } from 'react';
import LandingPage from './components/LandingPage';
import { ThemeLanguageProvider, useThemeLanguage } from './ThemeLanguageContext';

const AppContent: React.FC = () => {
  const { theme } = useThemeLanguage();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return <LandingPage />;
};

const App: React.FC = () => {
  return (
    <ThemeLanguageProvider>
      <AppContent />
    </ThemeLanguageProvider>
  );
};

export default App;