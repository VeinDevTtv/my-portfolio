import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeLanguage } from '../ThemeLanguageContext';
import { Terminal, User, Book, Briefcase, Code, Cpu, Mail } from 'lucide-react';

const InteractiveResume: React.FC = () => {
  const { theme } = useThemeLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<Array<{ type: string; content: string }>>([]);
  const [currentSection, setCurrentSection] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const resumeData = {
    name: "Abdelkarim Ait Bourich",
    email: "Abdelkarim.contact1@gmail.com",
    phone: "(408)-708-6149",
    linkedin: "https://www.linkedin.com/in/abdelkarim-ait-bourich-a7486432b",
    github: "https://github.com/VeinDevTtv",
    education: {
      school: "De Anza College, willing to transfer to UC Santa Cruz for Game Design",
      major: "Computer Science for Transfer",
      graduation: "Expected Graduation, 2026",
      gpa: "4.00/4.00"
    },
    experience: [
      {
        company: "Marriott Hotel Casablanca, Morocco",
        position: "IT Department Intern",
        duration: "July 2023 - Aug 2023",
        responsibilities: [
          "Assisting with technical support for employees across the hotel.",
          "Helping maintain and troubleshoot the company's computer network."
        ]
      }
    ],
    projects: [
      {
        name: "Game server Casablanca, Morocco",
        role: "Founder & Owner",
        duration: "Jun 2020 - Now",
        description: [
          "Worked on a game server alongside other friends on a 'AAA' game and made mods for other people to join and play in them, in TypeScript, MySQL, Lua, ReactJS.",
          "Created a website so that the game server players can talk in the forum share pictures, report bugs and other needs, in PHP."
        ]
      }
    ],
    skills: ["Learning C++", "JavaScript", "TypeScript", "PHP", "Lua"]
  };

  const commands = {
    help: "Available commands: help, clear, about, education, experience, projects, skills, contact",
    about: `Hello! I'm ${resumeData.name}, a passionate developer and aspiring game creator.`,
    education: `Education:\n${resumeData.education.school}\n${resumeData.education.major}\n${resumeData.education.graduation}\nGPA: ${resumeData.education.gpa}`,
    experience: resumeData.experience.map(exp => 
      `${exp.company} - ${exp.position}\n${exp.duration}\n${exp.responsibilities.join('\n')}`
    ).join('\n\n'),
    projects: resumeData.projects.map(proj => 
      `${proj.name} - ${proj.role}\n${proj.duration}\n${proj.description.join('\n')}`
    ).join('\n\n'),
    skills: `Skills: ${resumeData.skills.join(', ')}`,
    contact: `Email: ${resumeData.email}\nPhone: ${resumeData.phone}\nLinkedIn: ${resumeData.linkedin}\nGitHub: ${resumeData.github}`,
  };

  useEffect(() => {
    setOutput([{ type: 'system', content: 'Welcome to Abdelkarim\'s interactive resume! Type "help" for available commands.' }]);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase();
      setOutput(prev => [...prev, { type: 'input', content: input }, ...processCommand(command)]);
      setInput('');
    }
  };

  const processCommand = (command: string): Array<{ type: string; content: string }> => {
    if (command in commands) {
      setCurrentSection(command);
      return [{ type: 'output', content: commands[command as keyof typeof commands] }];
    } else if (command === 'clear') {
      setTimeout(() => setOutput([]), 100);
      return [{ type: 'system', content: 'Clearing console...' }];
    } else {
      return [{ type: 'error', content: `Command not found: ${command}. Type "help" for available commands.` }];
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'input': return <User size={16} />;
      case 'output': 
        switch (currentSection) {
          case 'education': return <Book size={16} />;
          case 'experience': return <Briefcase size={16} />;
          case 'projects': return <Code size={16} />;
          case 'skills': return <Cpu size={16} />;
          case 'contact': return <Mail size={16} />;
          default: return <Terminal size={16} />;
        }
      case 'error': return <Terminal size={16} />;
      default: return <Terminal size={16} />;
    }
  };

  return (
    <div className={`font-mono p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900 text-green-400' : 'bg-gray-100 text-gray-800'}`}>
      <div ref={outputRef} className="mb-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
        <AnimatePresence>
          {output.map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`flex items-start mb-2 ${line.type === 'error' ? 'text-red-500' : ''}`}
            >
              <span className="mr-2 mt-1">{getIcon(line.type)}</span>
              <pre className="whitespace-pre-wrap">{line.content}</pre>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <motion.div 
        className="flex items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className="mr-2">{'>'}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleInput}
          className={`w-full bg-transparent outline-none ${theme === 'dark' ? 'text-green-400' : 'text-gray-800'}`}
          autoFocus
        />
      </motion.div>
    </div>
  );
};

export default InteractiveResume;