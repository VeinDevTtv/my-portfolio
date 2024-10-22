import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useThemeLanguage } from '../ThemeLanguageContext';

const codeSnippet = `
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));
`;

const AnimatedCode: React.FC = () => {
  const { theme } = useThemeLanguage();
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < codeSnippet.length) {
      const timer = setTimeout(() => {
        setDisplayedCode(prevCode => prevCode + codeSnippet[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 50); // Adjust typing speed here

      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const lineVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
      <pre className={`font-mono text-sm ${theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}`}>
        {displayedCode.split('\n').map((line, index) => (
          <motion.div
            key={index}
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            {line}
          </motion.div>
        ))}
      </pre>
    </div>
  );
};

export default AnimatedCode;