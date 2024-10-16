import React from 'react';
import { motion } from 'framer-motion';

const technologies = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '🔷' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'Python', icon: '🐍' },
];

const AnimatedTechStack: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          className="bg-sky-100 dark:bg-sky-800 p-4 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1 }}
        >
          <span className="text-4xl">{tech.icon}</span>
          <p className="mt-2 text-center">{tech.name}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedTechStack;