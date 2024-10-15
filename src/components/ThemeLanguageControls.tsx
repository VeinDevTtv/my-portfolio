import React from 'react';
import { useThemeLanguage } from '../ThemeLanguageContext';
import { Sun, Moon } from 'lucide-react';

const ThemeLanguageControls: React.FC = () => {
  const { theme, language, toggleTheme, setLanguage } = useThemeLanguage();

  return (
    <div className="fixed top-4 right-4 flex items-center space-x-4 z-50">
      <button
        onClick={toggleTheme}
        className={`p-2 rounded-full ${theme === 'dark' ? 'bg-sky-700 text-sky-200' : 'bg-sky-200 text-sky-800'}`}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as 'en' | 'fr' | 'es' | 'zh' | 'ja')}
        className={`p-2 rounded ${theme === 'dark' ? 'bg-sky-700 text-sky-200' : 'bg-sky-200 text-sky-800'}`}
        aria-label="Select language"
      >
        <option value="en">EN</option>
        <option value="fr">FR</option>
        <option value="es">ES</option>
        <option value="zh">中文</option>
        <option value="ja">日本語</option>
      </select>
    </div>
  );
};

export default ThemeLanguageControls;