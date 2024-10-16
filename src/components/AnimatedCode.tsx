// import React from 'react';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { motion } from 'framer-motion';
// import { useThemeLanguage } from '../ThemeLanguageContext';

// interface AnimatedCodeProps {
//   code: string;
//   language: string;
// }

// const AnimatedCodeBlock: React.FC<AnimatedCodeProps> = ({ code, language }) => {
//   const { theme } = useThemeLanguage();

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="rounded-lg overflow-hidden shadow-lg"
//     >
//       <SyntaxHighlighter 
//         language={language} 
//         style={tomorrow}
//         customStyle={{
//           padding: '20px',
//           borderRadius: '0.5rem',
//           backgroundColor: theme === 'dark' ? '#1e3a8a' : '#e0f2fe',
//         }}
//       >
//         {code}
//       </SyntaxHighlighter>
//     </motion.div>
//   );
// };

// export default AnimatedCodeBlock;