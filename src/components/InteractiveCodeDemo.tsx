import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useThemeLanguage } from '../ThemeLanguageContext';

const InteractiveCodeDemo: React.FC = () => {
  const { theme } = useThemeLanguage();
  const [code, setCode] = useState(`#include <iostream>
#include <string>

using namespace std;

int main() {
    string name;
    int age;
    
    cout << "Enter your name: ";
    getline(cin, name);
    
    cout << "Enter your age: ";
    cin >> age;
    
    cout << "Hello, " << name << "! ";
    cout << "You are " << age << " years old." << endl;
    
    return 0;
}`);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [waitingForInput, setWaitingForInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLPreElement>(null);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');
    const lines = code.split('\n');
    const variables: { [key: string]: any } = {};

    for (const line of lines) {
      await executeLine(line.trim(), variables);
    }

    setIsRunning(false);
  };

  const executeLine = async (line: string, variables: { [key: string]: any }) => {
    if (line.startsWith('cout <<')) {
      await handleOutput(line, variables);
    } else if (line.startsWith('cin >>') || line.includes('getline(cin,')) {
      await handleInput(line, variables);
    } else if (line.includes('=')) {
      handleAssignment(line, variables);
    }
  };

  const handleOutput = async (line: string, variables: { [key: string]: any }) => {
    const parts = line.split('<<').slice(1);
    let outputLine = '';
    for (const part of parts) {
      const trimmed = part.trim().replace(/;$/, '');
      if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
        outputLine += trimmed.slice(1, -1);
      } else if (trimmed === 'endl') {
        outputLine += '\n';
      } else {
        const value = variables[trimmed];
        outputLine += value !== undefined ? value : trimmed;
      }
    }
    setOutput(prev => prev + outputLine);
  };

  const handleInput = async (line: string, variables: { [key: string]: any }) => {
    setWaitingForInput(true);
    const input = await new Promise<string>(resolve => {
      const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && inputRef.current) {
          resolve(inputRef.current.value);
          setUserInput('');
          setWaitingForInput(false);
          document.removeEventListener('keypress', handleKeyPress);
        }
      };
      document.addEventListener('keypress', handleKeyPress);
    });

    if (line.startsWith('cin >>')) {
      const varName = line.split('>>')[1].trim().replace(';', '');
      variables[varName] = isNaN(Number(input)) ? input : Number(input);
    } else if (line.includes('getline(cin,')) {
      const varName = line.match(/getline\(cin,\s*(\w+)\)/)?.[1] || '';
      variables[varName] = input;
    }
    setOutput(prev => prev + input + '\n');
  };

  const handleAssignment = (line: string, variables: { [key: string]: any }) => {
    const [left, right] = line.split('=').map(part => part.trim());
    if (left.includes(' ')) {
      const [, name] = left.split(' ');
      variables[name] = right.replace(';', '');
    } else {
      variables[left] = right.replace(';', '');
    }
  };

  useEffect(() => {
    if (waitingForInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [waitingForInput]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 flex">
        <div className="w-1/2 p-4">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className={`w-full h-full p-4 font-mono text-sm rounded-lg resize-none ${
              theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'
            }`}
          />
        </div>
        <div className="w-1/2 p-4 flex flex-col">
          <pre
            ref={outputRef}
            className={`flex-1 p-4 font-mono text-sm rounded-lg overflow-auto ${
              theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'
            }`}
          >
            {output}
          </pre>
          {waitingForInput && (
            <div className="mt-2">
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className={`w-full mt-1 p-1 rounded ${
                  theme === 'dark' ? 'bg-gray-700 text-gray-100' : 'bg-white text-gray-900'
                }`}
                placeholder="Enter your input here..."
              />
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <motion.button
          onClick={runCode}
          disabled={isRunning}
          className={`px-4 py-2 rounded ${
            theme === 'dark'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isRunning ? 'Running...' : 'Run Code'}
        </motion.button>
      </div>
    </div>
  );
};

export default InteractiveCodeDemo;