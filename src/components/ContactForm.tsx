import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useThemeLanguage } from '../ThemeLanguageContext';
import { Send, Check } from 'lucide-react';

const ContactForm: React.FC = () => {
  const { theme } = useThemeLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to a server
    console.log('Form submitted:', { name, email, message });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    // Reset form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-sky-800 text-sky-100' : 'bg-sky-100 text-sky-900'}`}>
      <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-2 font-semibold">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={`w-full p-2 rounded-md ${theme === 'dark' ? 'bg-sky-700 text-sky-100' : 'bg-white text-sky-900'} border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500`}
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 font-semibold">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full p-2 rounded-md ${theme === 'dark' ? 'bg-sky-700 text-sky-100' : 'bg-white text-sky-900'} border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500`}
          />
        </div>
        <div>
          <label htmlFor="message" className="block mb-2 font-semibold">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={4}
            className={`w-full p-2 rounded-md ${theme === 'dark' ? 'bg-sky-700 text-sky-100' : 'bg-white text-sky-900'} border border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500`}
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`w-full px-6 py-3 rounded-lg text-lg font-semibold flex items-center justify-center ${
            theme === 'dark' ? 'bg-sky-600 hover:bg-sky-700' : 'bg-sky-500 hover:bg-sky-600'
          } text-white shadow-md`}
        >
          {submitted ? (
            <>
              <Check className="mr-2" size={20} /> Sent!
            </>
          ) : (
            <>
              <Send className="mr-2" size={20} /> Send Message
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default ContactForm;