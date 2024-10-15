import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeLanguage } from '../ThemeLanguageContext';
import { Sliders, Lock, Copy, CheckCircle, RefreshCw, Eye, EyeOff } from 'lucide-react';

const PasswordGenerator: React.FC = () => {
  const { theme } = useThemeLanguage();
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [strength, setStrength] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    let score = 0;
    if (length > 10) score += 1;
    if (length > 14) score += 1;
    if (includeUppercase) score += 1;
    if (includeLowercase) score += 1;
    if (includeNumbers) score += 1;
    if (includeSymbols) score += 1;
    setStrength(score);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const strengthColor = () => {
    if (strength <= 2) return 'text-red-500';
    if (strength <= 4) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-sky-800 text-sky-100' : 'bg-sky-100 text-sky-900'}`}>
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        <Lock className="mr-2" /> Secure Password Generator
      </h2>
      
      <div className="mb-6 relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          readOnly
          className={`w-full p-3 pr-24 text-lg rounded-lg ${
            theme === 'dark' ? 'bg-sky-700 text-sky-100' : 'bg-white text-sky-900'
          } border border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500`}
        />
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowPassword(!showPassword)}
            className="p-2 rounded-full hover:bg-sky-200 dark:hover:bg-sky-700"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={copyToClipboard}
            className="p-2 rounded-full hover:bg-sky-200 dark:hover:bg-sky-700"
          >
            {copied ? <CheckCircle size={20} className="text-green-500" /> : <Copy size={20} />}
          </motion.button>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-lg font-semibold">Password Length: {length}</label>
        <div className="flex items-center">
          <Sliders size={20} className="mr-2" />
          <input
            type="range"
            min="8"
            max="32"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer dark:bg-sky-700"
          />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() => setIncludeUppercase(!includeUppercase)}
            className="mr-2 form-checkbox h-5 w-5 text-sky-600"
          />
          Uppercase
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() => setIncludeLowercase(!includeLowercase)}
            className="mr-2 form-checkbox h-5 w-5 text-sky-600"
          />
          Lowercase
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() => setIncludeNumbers(!includeNumbers)}
            className="mr-2 form-checkbox h-5 w-5 text-sky-600"
          />
          Numbers
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() => setIncludeSymbols(!includeSymbols)}
            className="mr-2 form-checkbox h-5 w-5 text-sky-600"
          />
          Symbols
        </label>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold mb-2">Password Strength</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div 
            className={`h-2.5 rounded-full ${strengthColor()}`} 
            style={{ width: `${(strength / 6) * 100}%` }}
          ></div>
        </div>
        <p className={`mt-2 font-medium ${strengthColor()}`}>
          {strength <= 2 ? 'Weak' : strength <= 4 ? 'Medium' : 'Strong'}
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={generatePassword}
        className={`w-full px-6 py-3 rounded-lg text-lg font-semibold flex items-center justify-center ${
          theme === 'dark' ? 'bg-sky-600 hover:bg-sky-700' : 'bg-sky-500 hover:bg-sky-600'
        } text-white shadow-md`}
      >
        <RefreshCw className="mr-2" /> Generate New Password
      </motion.button>
    </div>
  );
};

export default PasswordGenerator;