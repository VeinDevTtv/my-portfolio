import React from 'react';
import { motion } from 'framer-motion';
import { useThemeLanguage } from '../ThemeLanguageContext';

interface Skill {
  name: string;
  level: number;
}

const skills: Skill[] = [
    { name: 'JavaScript', level: 85 },
    { name: 'React', level: 85 },
    { name: 'Solid.JS', level: 85 },
    { name: 'Node.js', level: 80 },
    { name: 'CSS/Tailwind', level: 85 },
    { name: 'Git', level: 100 },
    { name: 'C++', level: 20 },
    { name: 'Lua', level: 100 },
    { name: 'Problem Solving', level: 95 },
    { name: 'SQL', level: 100 },
    { name: 'AI Prompting', level: 100 },
  ];

const SkillBar: React.FC<{ skill: Skill }> = ({ skill }) => {
  const { theme } = useThemeLanguage();
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className={`text-base font-medium ${theme === 'dark' ? 'text-sky-300' : 'text-sky-700'}`}>{skill.name}</span>
        <span className={`text-sm font-medium ${theme === 'dark' ? 'text-sky-300' : 'text-sky-700'}`}>{skill.level}%</span>
      </div>
      <div className={`w-full ${theme === 'dark' ? 'bg-sky-700' : 'bg-sky-200'} rounded-full h-2.5`}>
        <motion.div
          className={`${theme === 'dark' ? 'bg-sky-400' : 'bg-sky-600'} h-2.5 rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const skillsTranslations = {
    en: "My Skills",
    fr: "Mes Compétences",
    es: "Mis Habilidades",
    zh: "我的技能",
    ja: "私のスキル"
  };
  

const Skills: React.FC = () => {
  const { theme } = useThemeLanguage();

  return (
    <section className={`py-12 ${theme === 'dark' ? 'bg-sky-900' : 'bg-sky-50'}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className={`text-3xl font-extrabold mb-8 ${theme === 'dark' ? 'text-sky-200' : 'text-sky-800'}`}>My Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <SkillBar key={index} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;