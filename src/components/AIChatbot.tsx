import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { useThemeLanguage } from '../ThemeLanguageContext';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const AIChatbot: React.FC = () => {
  const { theme } = useThemeLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { text: input, sender: 'user' }]);
      setInput('');
      setTimeout(() => {
        const response = generateResponse(input);
        setMessages(prev => [...prev, { text: response, sender: 'bot' }]);
      }, 500);
    }
  };

  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('name')) {
      return "My name is Abdelkarim Ait Bourich. Nice to meet you!";
    } else if (lowerQuestion.includes('education') || lowerQuestion.includes('study')) {
      return "I'm currently studying Computer Science at De Anza College, with plans to transfer to UC Berkeley.";
    } else if (lowerQuestion.includes('experience') || lowerQuestion.includes('work')) {
      return "I have experience as an IT Department Intern at Marriott Hotel in Casablanca, Morocco. I've also worked on game server projects and web development.";
    } else if (lowerQuestion.includes('skills') || lowerQuestion.includes('technologies')) {
      return "I'm skilled in JavaScript, TypeScript, PHP, and Lua. I'm also learning C++.";
    } else if (lowerQuestion.includes('project') || lowerQuestion.includes('portfolio')) {
      return "One of my key projects is a game server I developed with friends. I've also created websites and worked on various coding projects. You can check out more in my portfolio!";
    } else {
      return "I'm sorry, I don't have specific information about that. Is there anything else you'd like to know about Abdelkarim's education, experience, or skills?";
    }
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
                <div className={`max-w-xs mx-2 p-3 rounded-lg ${message.sender === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-green-100 text-green-900'}`}>
                  {message.text}
                </div>
              </div>
            </motion.div>
          ))}
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
            placeholder="Ask me about Abdelkarim..."
            className={`flex-1 p-2 rounded-l-lg ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-800'}`}
          />
          <button
            onClick={handleSend}
            className={`p-2 rounded-r-lg ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;