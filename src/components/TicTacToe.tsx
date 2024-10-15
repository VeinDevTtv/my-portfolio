import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeLanguage } from '../ThemeLanguageContext';
import { X, Circle, Cpu } from 'lucide-react';

type SquareValue = 'X' | 'O' | null;
type Difficulty = 'Easy' | 'Medium' | 'Hard';

const TicTacToe: React.FC = () => {
  const { theme } = useThemeLanguage();
  const [squares, setSquares] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<SquareValue>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);
  const [vsAI, setVsAI] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('Easy');

  const calculateWinner = (squares: SquareValue[]): [SquareValue, number[] | null] => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], lines[i]];
      }
    }
    return [null, null];
  };

  const getAvailableMoves = (squares: SquareValue[]): number[] => {
    return squares.reduce((moves: number[], square, index) => {
      if (!square) moves.push(index);
      return moves;
    }, []);
  };

  const minimax = (squares: SquareValue[], depth: number, isMaximizing: boolean): number => {
    const [winner, _] = calculateWinner(squares);
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (getAvailableMoves(squares).length === 0) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      getAvailableMoves(squares).forEach(move => {
        squares[move] = 'O';
        const score = minimax(squares, depth + 1, false);
        squares[move] = null;
        bestScore = Math.max(score, bestScore);
      });
      return bestScore;
    } else {
      let bestScore = Infinity;
      getAvailableMoves(squares).forEach(move => {
        squares[move] = 'X';
        const score = minimax(squares, depth + 1, true);
        squares[move] = null;
        bestScore = Math.min(score, bestScore);
      });
      return bestScore;
    }
  };

  const getBestMove = (squares: SquareValue[], difficulty: Difficulty): number => {
    const availableMoves = getAvailableMoves(squares);
    
    if (difficulty === 'Easy') {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    let bestScore = -Infinity;
    let bestMove = availableMoves[0];

    availableMoves.forEach(move => {
      squares[move] = 'O';
      const score = minimax(squares, 0, false);
      squares[move] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = move;
      }
    });

    if (difficulty === 'Medium' && Math.random() < 0.3) {
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    return bestMove;
  };

  const handleClick = (i: number) => {
    if (winner || squares[i]) return;

    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);

    const [newWinner, newWinningLine] = calculateWinner(newSquares);
    if (newWinner) {
      setWinner(newWinner);
      setWinningLine(newWinningLine);
      return;
    }

    if (vsAI && xIsNext) {
      setXIsNext(false);
      setTimeout(() => {
        const aiMove = getBestMove(newSquares, difficulty);
        const finalSquares = [...newSquares];
        finalSquares[aiMove] = 'O';
        setSquares(finalSquares);
        setXIsNext(true);

        const [finalWinner, finalWinningLine] = calculateWinner(finalSquares);
        if (finalWinner) {
          setWinner(finalWinner);
          setWinningLine(finalWinningLine);
        }
      }, 500);
    } else {
      setXIsNext(!xIsNext);
    }
  };

  const renderSquare = (i: number) => (
    <motion.button
      key={i}
      className={`w-24 h-24 text-4xl font-bold rounded-lg shadow-md ${
        theme === 'dark' ? 'bg-sky-700 text-sky-100' : 'bg-sky-200 text-sky-900'
      } ${winningLine?.includes(i) ? 'ring-4 ring-green-500' : ''}`}
      onClick={() => handleClick(i)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={!!winner || (vsAI && !xIsNext)}
    >
      <AnimatePresence mode="wait">
        {squares[i] && (
          <motion.div
            key={squares[i]}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            {squares[i] === 'X' ? (
              <X className="w-16 h-16 mx-auto" />
            ) : (
              <Circle className="w-16 h-16 mx-auto" />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningLine(null);
  };

  const toggleGameMode = (mode: boolean) => {
    setVsAI(mode);
    resetGame();
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(Boolean)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className={`p-8 rounded-lg ${theme === 'dark' ? 'bg-sky-800 text-sky-100' : 'bg-sky-100 text-sky-900'}`}>
      <h2 className="text-3xl font-bold mb-6 text-center">Tic Tac Toe</h2>
      <div className="mb-6 flex justify-center space-x-4">
        <button
          onClick={() => toggleGameMode(false)}
          className={`px-4 py-2 rounded ${
            !vsAI ? 'bg-sky-500 text-white' : 'bg-sky-200 text-sky-800'
          }`}
        >
          2 Players
        </button>
        <button
          onClick={() => toggleGameMode(true)}
          className={`px-4 py-2 rounded flex items-center ${
            vsAI ? 'bg-sky-500 text-white' : 'bg-sky-200 text-sky-800'
          }`}
        >
          <Cpu className="mr-2" size={20} /> vs AI
        </button>
      </div>
      {vsAI && (
        <div className="mb-6 flex justify-center space-x-4">
          {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className={`px-4 py-2 rounded ${
                difficulty === level ? 'bg-sky-500 text-white' : 'bg-sky-200 text-sky-800'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      )}
      <div className="mb-6 text-xl font-semibold text-center">{status}</div>
      <div className="grid grid-cols-3 gap-4 justify-center mb-6 max-w-[300px] mx-auto">
        {[...Array(9)].map((_, i) => renderSquare(i))}
      </div>
      <motion.button
        onClick={resetGame}
        className={`w-full px-6 py-3 rounded-lg text-lg font-semibold ${
          theme === 'dark' ? 'bg-sky-600 hover:bg-sky-700' : 'bg-sky-500 hover:bg-sky-600'
        } text-white shadow-md`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Reset Game
      </motion.button>
    </div>
  );
};

export default TicTacToe;