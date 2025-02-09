import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { useThemeLanguage } from '../ThemeLanguageContext';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface KnowledgeItem {
  keywords: string[];
  response: string;
}

const knowledgeBase: KnowledgeItem[] = [
  {
    keywords: [
      'hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 
      'good evening', 'sup', 'yo', 'hola', 'howdy', 'welcome', 'bonjour',
      'start', 'begin', 'talk', 'chat', 'intro', 'introduction', 'starting'
    ],
    response: "Hello! Welcome to Abdelkarim's portfolio. I can tell you about his skills, projects, education, or anything else you'd like to know. What interests you most about his background?"
  },
  {
    keywords: [
      'education', 'study', 'college', 'university', 'school', 'degree', 
      'major', 'academic', 'gpa', 'grades', 'courses', 'classes', 'learning',
      'student', 'transfer', 'berkeley', 'uc', 'de anza', 'cupertino',
      'computer science', 'cs', 'graduation', '2026', 'academic performance',
      'programming courses', 'computer studies', 'academics', 'semester',
      'coursework', 'study plan', 'curriculum', 'academic goals', 'transfer plans'
    ],
    response: "Education Overview:\n\nCurrent: De Anza College\n- Major: Computer Science\n- GPA: 4.0/4.0\n- Location: Cupertino, California\n- Expected Graduation: 2026\n\nTransfer Goals:\n- Target: UC Santa Cruz\n- Focus: Advanced Computer Science\n\nRelevant Coursework:\n- Data Structures & Algorithms\n- Object-Oriented Programming\n- Web Development\n- Database Management\n\nAcademic Achievements:\n- Perfect GPA Maintenance\n- Active participation in CS projects\n- Continuous learning focus"
  },
  {
    keywords: [
      'game development', 'gaming', 'game engine', 'game design', 'level design',
      'game mechanics', 'game programming', 'game architecture', 'unity', 'unreal',
      'game optimization', 'game networking', 'multiplayer', 'game servers',
      'game mods', 'game features', 'game community', 'game testing',
      'game performance', 'game security', 'game backend', 'game frontend'
    ],
    response: "Game Development Experience:\n\nServer Development:\n- Created and managed game servers for AAA titles\n- Implemented custom game modes and features\n- Developed anti-cheat systems\n- Optimized server performance\n\nModding:\n- Created custom game modifications\n- Implemented new gameplay features\n- Developed user interfaces\n- Balanced game mechanics\n\nCommunity Management:\n- Built and maintained player communities\n- Organized gaming events\n- Managed bug reports and feedback\n- Implemented community features"
  },
  {
    keywords: [
      'technical', 'programming', 'coding', 'development', 'software', 'tech stack',
      'languages', 'frameworks', 'tools', 'technologies', 'typescript', 'javascript',
      'react', 'php', 'lua', 'mysql', 'database', 'frontend', 'backend', 'fullstack',
      'web development', 'server', 'api', 'rest', 'git', 'version control',
      'development environment', 'ide', 'testing', 'deployment', 'ci/cd'
    ],
    response: "Technical Expertise:\n\nCore Languages:\n- TypeScript/JavaScript: Advanced\n- PHP: Intermediate\n- Lua: Intermediate\n- C++: Learning\n\nWeb Development:\n- React.js Ecosystem\n- Modern JavaScript\n- Responsive Design\n- State Management\n\nBackend:\n- Server Architecture\n- Database Design\n- API Development\n- Performance Optimization\n\nTools & Practices:\n- Git Version Control\n- Code Review\n- Testing Methodologies\n- Documentation"
  },
  {
    keywords: [
      'morocco', 'background', 'culture', 'international', 'origin', 'heritage',
      'multicultural', 'diversity', 'global', 'perspective', 'experience',
      'cultural', 'international student', 'foreign', 'abroad', 'multilingual',
      'languages', 'cultural background', 'nationality', 'identity'
    ],
    response: "Cultural Background:\n\nOrigin:\n- Born and raised in Morocco\n- International student in the USA\n- Multicultural perspective\n\nLanguage Skills:\n- Arabic (Native)\n- English (Fluent)\n- French (Proficient)\n\nGlobal Experience:\n- Bridging cultural gaps\n- International collaboration\n- Cross-cultural communication\n\nProfessional Impact:\n- Diverse problem-solving approach\n- Global perspective in development\n- International team experience"
  },
  {
    keywords: [
      'goals', 'ambitions', 'future', 'plans', 'career', 'aspirations',
      'objectives', 'growth', 'development', 'vision', 'roadmap', 'path',
      'career goals', 'professional goals', 'future plans', 'direction',
      'achievements', 'targets', 'milestones', 'dreams', 'long-term'
    ],
    response: "Career Goals & Aspirations:\n\nShort-term Goals:\n- Complete CS degree with excellence\n- Transfer to UC Santa Cruz\n- Expand game development portfolio\n- Master advanced programming concepts\n\nMid-term Goals:\n- Develop innovative game projects\n- Contribute to open-source\n- Build industry connections\n- Gain professional certifications\n\nLong-term Vision:\n- Create groundbreaking games\n- Found a game development studio\n- Innovate in game technology\n- Mentor future developers"
  },
  {
    keywords: [
      'projects', 'portfolio', 'work', 'achievements', 'developments',
      'applications', 'software', 'websites', 'games', 'creations',
      'demos', 'samples', 'examples', 'showcase', 'featured work',
      'code samples', 'development work', 'project management'
    ],
    response: "Project Portfolio:\n\nGame Server Platform:\n- Custom game modes\n- Player management system\n- Performance optimization\n- Security features\n\nWeb Development:\n- Community forums\n- User authentication\n- Content management\n- Analytics integration\n\nTechnical Projects:\n- Algorithm implementations\n- Database optimizations\n- API developments\n- UI/UX solutions\n\nOngoing Work:\n- Open source contributions\n- Personal development tools\n- Gaming innovations"
  },
  {
    keywords: [
      'hobbies', 'interests', 'activities', 'passions', 'free time',
      'personal', 'lifestyle', 'entertainment', 'recreation', 'leisure',
      'favorite', 'enjoyment', 'personal life', 'activities', 'fun'
    ],
    response: "Personal Interests:\n\nTechnology:\n- Game development\n- New programming languages\n- Tech innovations\n- Open source projects\n\nGaming:\n- Strategy games\n- MMORPGs\n- Game design\n- eSports\n\nLearning:\n- Online courses\n- Technical books\n- Industry conferences\n- Developer communities"
  },
  {
    keywords: [
      'marriott', 'internship', 'work experience', 'job', 'professional',
      'employment', 'career history', 'work history', 'positions', 'roles',
      'responsibilities', 'duties', 'achievements', 'accomplishments',
      'professional experience', 'work background'
    ],
    response: "Professional Experience:\n\nMarriott Hotel (Casablanca, Morocco):\n- Position: IT Department Intern\n- Duration: July-August 2023\n- Key Responsibilities:\n  • Technical support\n  • Network maintenance\n  • Hardware troubleshooting\n  • System optimization\n\nKey Achievements:\n- Improved system efficiency\n- Resolved technical issues\n- Enhanced IT infrastructure\n- Collaborative team projects"
  },
  {
    keywords: [
      'skills', 'abilities', 'capabilities', 'competencies', 'expertise',
      'proficiencies', 'qualifications', 'strengths', 'talents',
      'technical skills', 'soft skills', 'professional skills'
    ],
    response: "Skill Set Overview:\n\nTechnical Skills:\n- Frontend Development\n- Backend Programming\n- Database Management\n- Game Development\n\nSoft Skills:\n- Problem Solving\n- Team Collaboration\n- Project Management\n- Communication\n\nIndustry Knowledge:\n- Gaming Industry\n- Web Technologies\n- Software Development\n- IT Infrastructure"
  },
  {
    keywords: [
      'languages', 'programming languages', 'coding languages', 'tech stack',
      'development tools', 'frameworks', 'technologies', 'software',
      'development environment', 'coding tools'
    ],
    response: "Programming Languages & Tools:\n\nActive Usage:\n- TypeScript/JavaScript: Daily use\n- PHP: Web development\n- Lua: Game scripting\n- SQL: Database management\n\nFrameworks & Libraries:\n- React.js\n- Node.js\n- Express.js\n\nTools:\n- Git/GitHub\n- VS Code\n- Development tools\n\nLearning:\n- C++ Development\n- Advanced Algorithms"
  },
  {
    keywords: [
      'contact', 'reach', 'connect', 'message', 'email', 'phone',
      'social media', 'linkedin', 'github', 'communication', 'network',
      'connection', 'social', 'profile', 'links'
    ],
    response: "Contact Information:\n\nDirect Contact:\n- Email: Abdelkarim.contact1@gmail.com\n- Phone: (408)-708-6149\n\nProfessional Profiles:\n- LinkedIn: linkedin.com/in/abdelkarim-ait-bourich-a7486432b\n- GitHub: github.com/VeinDevTtv\n\nBest Contact Methods:\n- Email for professional inquiries\n- LinkedIn for networking\n- GitHub for code collaboration"
  }
];

const AIChatbot: React.FC = () => {
  const { theme } = useThemeLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { text: input, sender: 'user' }]);
      setInput('');
      setIsTyping(true);
      
      setTimeout(() => {
        const response = generateResponse(input);
        setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    let bestMatch: KnowledgeItem | null = null;
    let maxMatchCount = 0;

    for (const item of knowledgeBase) {
      const matchCount = item.keywords.filter(keyword => 
        lowerQuestion.includes(keyword)).length;
      if (matchCount > maxMatchCount) {
        maxMatchCount = matchCount;
        bestMatch = item;
      }
    }

    return bestMatch?.response || "I'm not sure about that specific topic. Feel free to ask about:\n- Education and academics\n- Technical skills and programming\n- Work experience and internships\n- Projects and development\n- Game development expertise\n- Cultural background\n- Future goals and aspirations\n- Personal interests";
  };

  return (
    <div className={`flex flex-col h-[500px] max-w-md mx-auto ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg`}>
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
            >
              <div className={`flex items-start ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`rounded-full p-2 ${message.sender === 'user' ? 'bg-blue-500' : 'bg-green-500'}`}>
                  {message.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>
                <div 
                  className={`max-w-xs mx-2 p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-blue-100 text-blue-900' 
                      : 'bg-green-100 text-green-900'
                  }`}
                >
                  {message.text.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < message.text.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start mb-4"
            >
              <div className="flex items-center bg-green-100 rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me anything about Abdelkarim..."
            className={`flex-1 p-2 rounded-l-lg ${
              theme === 'dark' 
                ? 'bg-gray-700 text-white placeholder-gray-400' 
                : 'bg-gray-100 text-gray-800 placeholder-gray-500'
            }`}
          />
          <button
            onClick={handleSend}
            className={`p-2 rounded-r-lg ${
              theme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors duration-200`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;