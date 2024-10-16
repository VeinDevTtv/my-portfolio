import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useThemeLanguage } from '../ThemeLanguageContext';

const InteractiveCodeDemo: React.FC = () => {
  const { theme } = useThemeLanguage();
  const [code, setCode] = useState(`
const drawOrbits = (canvas, numSegments, orbitRadius) => {
  const ctx = canvas.getContext('2d');
  const angleIncrement = (2 * Math.PI) / numSegments;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw orbit
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, orbitRadius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#4299e1';
  ctx.stroke();

  // Draw segments
  for (let i = 0; i < numSegments; i++) {
    const angle = i * angleIncrement;
    const x = canvas.width / 2 + orbitRadius * Math.cos(angle);
    const y = canvas.height / 2 + orbitRadius * Math.sin(angle);
    
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#ed8936';
    ctx.fill();
  }
};

drawOrbits(canvas, numSegments, orbitRadius);
  `);
  const [numSegments, setNumSegments] = useState(8);
  const [orbitRadius, setOrbitRadius] = useState(100);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const updateCanvas = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      try {
        const drawFunction = new Function('canvas', 'numSegments', 'orbitRadius', code);
        drawFunction(canvas, numSegments, orbitRadius);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      }
    }
  }, [code, numSegments, orbitRadius]);

  const debouncedUpdateCanvas = useCallback(debounce(updateCanvas, 500), [updateCanvas]);

  useEffect(() => {
    debouncedUpdateCanvas();
  }, [code, numSegments, orbitRadius, debouncedUpdateCanvas]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className={`w-full h-[400px] p-4 font-mono text-sm rounded-lg ${
            theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'
          }`}
        />
        {error && (
          <div className="mt-2 text-red-500 text-sm">{error}</div>
        )}
      </div>
      <div className="flex-1 flex flex-col items-center">
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={300} 
          className="border border-gray-300 rounded-lg mb-4"
        />
        <div className="w-full max-w-xs space-y-4">
          <div>
            <label htmlFor="numSegments" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Number of Segments: {numSegments}
            </label>
            <input
              type="range"
              id="numSegments"
              min="3"
              max="20"
              value={numSegments}
              onChange={(e) => setNumSegments(Number(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label htmlFor="orbitRadius" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Orbit Radius: {orbitRadius}
            </label>
            <input
              type="range"
              id="orbitRadius"
              min="50"
              max="140"
              value={orbitRadius}
              onChange={(e) => setOrbitRadius(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCodeDemo;