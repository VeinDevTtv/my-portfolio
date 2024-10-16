import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion } from 'framer-motion';
import { useThemeLanguage } from '../ThemeLanguageContext';

interface Orb {
  index: number;
  radius: number;
  color: string;
  renderAngle?: number;
}

interface Segment {
  orbs: Orb[];
}

const InteractiveCodeDemo: React.FC = () => {
  const { theme } = useThemeLanguage();
  const [code, setCode] = useState(`
const drawOrbits = (numSegments) => {
  const canvas = document.getElementById('orbitCanvas');
  const ctx = canvas.getContext('2d');
  const angleIncrement = 360 / numSegments;
  const segments = [{ orbs: [{ index: 0, radius: 5, color: 'red' }] }];
  
  const calculateOrbitRadius = (level) => level * 50 + numSegments * 3.75;

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    segments.forEach((segment, index) => {
      const orbitRadius = calculateOrbitRadius(index);
      segment.orbs.forEach(orb => {
        const renderAngle = orb.renderAngle ?? orb.index * angleIncrement;
        const x = canvas.width / 2 + orbitRadius * Math.cos(renderAngle * Math.PI / 180);
        const y = canvas.height / 2 + orbitRadius * Math.sin(renderAngle * Math.PI / 180);
        ctx.beginPath();
        ctx.arc(x, y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = orb.color;
        ctx.fill();
        ctx.closePath();
      });
    });
  };

  draw();
};

drawOrbits(8);
  `);
  const [numSegments, setNumSegments] = useState(8);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const drawOrbits = new Function('canvas', 'numSegments', code);
        drawOrbits(canvas, numSegments);
      }
    }
  }, [code, numSegments]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <SyntaxHighlighter 
          language="javascript"
          style={tomorrow}
          customStyle={{
            padding: '20px',
            borderRadius: '0.5rem',
            backgroundColor: theme === 'dark' ? '#1e3a8a' : '#e0f2fe',
          }}
        >
          {code}
        </SyntaxHighlighter>
        <div className="mt-4">
          <label htmlFor="numSegments" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Number of Segments:
          </label>
          <input
            type="number"
            id="numSegments"
            value={numSegments}
            onChange={(e) => setNumSegments(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>
      <div className="flex-1">
        <canvas ref={canvasRef} width={400} height={400} className="border border-gray-300 rounded-lg" />
      </div>
    </div>
  );
};

export default InteractiveCodeDemo;