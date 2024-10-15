import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, Code, Briefcase, Rocket } from 'lucide-react';

const LandingPage: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={targetRef} className="min-h-[200vh] bg-sky-50 text-sky-900">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-sky-600 origin-left z-50"
        style={{ scaleX }}
      />
      <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-sky-700">
            Welcome to My Portfolio
          </h1>
          <motion.h2 
            className="text-2xl md:text-3xl text-sky-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            I'm Abdelkarim Ait Bourich
          </motion.h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 z-10"
        >
          <ChevronDown size={48} className="animate-bounce text-sky-500" />
        </motion.div>
      </div>
      
      <motion.div 
        className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16"
        style={{ opacity, y }}
      >
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-sky-800">About Me</h2>
          <div className="space-y-6 text-lg">
            {[
              { icon: Code, text: "As a first-year student at De Anza College with aspirations to transfer to UC Berkeley, I'm embarking on an exciting journey in the world of technology and game development. My passion for problem-solving drives me to tackle difficult challenges head-on, often working tirelessly for days and nights to find innovative solutions." },
              { icon: Briefcase, text: "My proudest achievement to date is a game server project that I collaborated on with friends for two years. This endeavor not only helped us learn numerous new skills and generate some income but also forged friendships that will last a lifetime. This experience has fueled my ambition to become a senior game developer and, ultimately, create my own game engine and start a company." },
              { icon: Rocket, text: "Currently, I'm channeling my energy into a personal project called \"Evolve.\" My ultimate goal is to create something that profoundly impacts people's lives, pushing the boundaries of what's possible in game development and beyond. With each line of code and every problem solved, I'm one step closer to turning these aspirations into reality." }
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg transition-shadow duration-300 ease-in-out"
                style={{
                  boxShadow: hoverIndex === index ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
                  background: hoverIndex === index ? 'rgba(186, 230, 253, 0.4)' : 'transparent'
                }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <item.icon className="text-sky-600 flex-shrink-0" size={24} />
                <p className="text-sky-800">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;