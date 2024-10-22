import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, RefreshCw } from 'lucide-react';
import { useThemeLanguage } from '../ThemeLanguageContext';

const QRCodeGenerator: React.FC = () => {
  const { theme } = useThemeLanguage();
  const [text, setText] = useState('https://abdel.dev');
  const [size, setSize] = useState('256');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [fgColor, setFgColor] = useState('#000000');

  const downloadQRCode = () => {
    const svg = document.querySelector('#qr-code svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = parseInt(size);
        canvas.height = parseInt(size);
        ctx?.drawImage(img, 0, 0);
        
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `qr-code-${Date.now()}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  const resetDefaults = () => {
    setText('https://abdel.dev');
    setSize('256');
    setBgColor('#FFFFFF');
    setFgColor('#000000');
  };

  return (
    <div className={`w-full max-w-md mx-auto ${theme === 'dark' ? 'text-sky-100' : 'text-sky-900'}`}>
      <h2 className={`text-2xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-sky-200' : 'text-sky-800'}`}>
        QR Code Generator
      </h2>

      <div className="space-y-6">
        <div>
          <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-sky-200' : 'text-sky-700'}`}>
            Text or URL
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`w-full p-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-sky-800 text-sky-100 border-sky-600 focus:border-sky-500'
                : 'bg-sky-50 text-sky-900 border-sky-200 focus:border-sky-300'
            } border focus:outline-none focus:ring-2 focus:ring-sky-500/50`}
            placeholder="Enter text or URL"
          />
        </div>

        <div>
          <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-sky-200' : 'text-sky-700'}`}>
            Size
          </label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className={`w-full p-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-sky-800 text-sky-100 border-sky-600 focus:border-sky-500'
                : 'bg-sky-50 text-sky-900 border-sky-200 focus:border-sky-300'
            } border focus:outline-none focus:ring-2 focus:ring-sky-500/50`}
          >
            <option value="128">128 x 128</option>
            <option value="256">256 x 256</option>
            <option value="512">512 x 512</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-sky-200' : 'text-sky-700'}`}>
              Background
            </label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>

          <div>
            <label className={`block mb-2 font-medium ${theme === 'dark' ? 'text-sky-200' : 'text-sky-700'}`}>
              Foreground
            </label>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        <div id="qr-code" className={`flex justify-center p-6 rounded-lg ${theme === 'dark' ? 'bg-sky-800' : 'bg-sky-50'}`}>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <QRCodeSVG
              value={text || ' '}
              size={parseInt(size)}
              bgColor={bgColor}
              fgColor={fgColor}
              level="L"
              includeMargin={false}
            />
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={downloadQRCode}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              theme === 'dark'
                ? 'bg-sky-600 hover:bg-sky-500 text-sky-50'
                : 'bg-sky-500 hover:bg-sky-400 text-white'
            }`}
          >
            <Download size={20} />
            Download PNG
          </button>
          <button
            onClick={resetDefaults}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              theme === 'dark'
                ? 'bg-sky-700 hover:bg-sky-600 text-sky-50'
                : 'bg-sky-200 hover:bg-sky-300 text-sky-800'
            }`}
          >
            <RefreshCw size={20} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;