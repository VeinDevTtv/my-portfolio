import React, { useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';
import { useThemeLanguage } from '../ThemeLanguageContext';
import { User, Cpu, RotateCcw } from 'lucide-react';

type GameMode = '2players' | 'vsAI';

const ChessGame: React.FC = () => {
    const { theme } = useThemeLanguage();
    const [game, setGame] = useState(new Chess());
    const [gameMode, setGameMode] = useState<GameMode>('2players');

  const makeAIMove = useCallback(() => {
    const possibleMoves = game.moves();
    if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    const move = possibleMoves[randomIndex];
    game.move(move);
    setGame(new Chess(game.fen()));
  }, [game]);

  useEffect(() => {
    if (gameMode === 'vsAI' && game.turn() === 'b') {
      setTimeout(makeAIMove, 300);
    }
  }, [game, gameMode, makeAIMove]);

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q',
      });

      if (move === null) return false;
      setGame(new Chess(game.fen()));
      return true;
    } catch (error) {
      return false;
    }
  };

  const resetGame = () => {
    setGame(new Chess());
  };

  const getStatus = () => {
    if (game.isCheckmate()) return "Checkmate!";
    if (game.isDraw()) return "Draw!";
    if (game.isCheck()) return "Check!";
    return `Current turn: ${game.turn() === 'w' ? 'White' : 'Black'}`;
  };

  return (
    <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-sky-800 text-sky-100' : 'bg-sky-100 text-sky-900'}`}>
      <h2 className="text-3xl font-bold mb-6 text-center">Chess</h2>
      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={() => setGameMode('2players')}
          className={`px-4 py-2 rounded flex items-center ${
            gameMode === '2players' ? 'bg-sky-500 text-white' : 'bg-sky-200 text-sky-800'
          }`}
        >
          <User className="mr-2" size={20} /> 2 Players
        </button>
        <button
          onClick={() => setGameMode('vsAI')}
          className={`px-4 py-2 rounded flex items-center ${
            gameMode === 'vsAI' ? 'bg-sky-500 text-white' : 'bg-sky-200 text-sky-800'
          }`}
        >
          <Cpu className="mr-2" size={20} /> vs AI
        </button>
      </div>
      <div className="mb-6 text-xl font-semibold text-center">{getStatus()}</div>
      <div className="flex justify-center mb-6">
        <div className="w-[400px] h-[400px]">
          <Chessboard 
            position={game.fen()} 
            onPieceDrop={onDrop}
            boardWidth={400}
            customDarkSquareStyle={{ backgroundColor: theme === 'dark' ? '#2c5282' : '#90cdf4' }}
            customLightSquareStyle={{ backgroundColor: theme === 'dark' ? '#3182ce' : '#e6f7ff' }}
            customBoardStyle={{
              borderRadius: '4px',
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
            }}
          />
        </div>
      </div>
      <button
        onClick={resetGame}
        className={`w-full px-6 py-3 rounded-lg text-lg font-semibold flex items-center justify-center ${
          theme === 'dark' ? 'bg-sky-600 hover:bg-sky-700' : 'bg-sky-500 hover:bg-sky-600'
        } text-white shadow-md`}
      >
        <RotateCcw className="mr-2" size={20} /> Reset Game
      </button>
    </div>
  );
};

export default ChessGame;