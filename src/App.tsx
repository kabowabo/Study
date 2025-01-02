import React, { useState } from 'react';
import { Brain, RotateCcw } from 'lucide-react';
import { WordInput } from './components/WordInput';
import { WordList } from './components/WordList';
import { Game } from './components/Game';
import { ThemeToggle } from './components/ThemeToggle';
import { ThemeProvider } from './context/ThemeContext';
import type { WordPair } from './types';

function App() {
  const [wordPairs, setWordPairs] = useState<WordPair[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [editingPair, setEditingPair] = useState<WordPair | null>(null);

  const handleAddPair = (pair: WordPair) => {
    setWordPairs((prev) => [...prev, pair]);
  };

  const handleUpdatePair = (updatedPair: WordPair) => {
    setWordPairs((prev) =>
      prev.map((pair) => (pair.id === updatedPair.id ? updatedPair : pair))
    );
    setEditingPair(null);
  };

  const handleEditPair = (id: string) => {
    const pair = wordPairs.find((p) => p.id === id);
    if (pair) {
      setEditingPair(pair);
    }
  };

  const handleDeletePair = (id: string) => {
    setWordPairs((prev) => prev.filter((pair) => pair.id !== id));
  };

  const handleStartGame = () => {
    if (wordPairs.length >= 2) {
      setIsPlaying(true);
      setGameCompleted(false);
    }
  };

  const handleGameComplete = () => {
    setGameCompleted(true);
  };

  const handlePlayAgain = () => {
    setIsPlaying(true);
    setGameCompleted(false);
  };

  const handleResetWordList = () => {
    setWordPairs([]);
    setIsPlaying(false);
    setGameCompleted(false);
    setEditingPair(null);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 transition-colors">
        <ThemeToggle />
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2">
              <Brain className="w-8 h-8 text-blue-500" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Word Match
              </h1>
            </div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Create word-definition pairs and test your memory!
            </p>
          </div>

          {!isPlaying && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
              <WordInput
                onAddPair={handleAddPair}
                onUpdatePair={handleUpdatePair}
                editingPair={editingPair}
              />
              
              {wordPairs.length > 0 && (
                <WordList
                  wordPairs={wordPairs}
                  onEdit={handleEditPair}
                  onDelete={handleDeletePair}
                />
              )}

              <div className="flex justify-center">
                <button
                  onClick={handleStartGame}
                  disabled={wordPairs.length < 2}
                  className={`
                    px-6 py-2 rounded-lg font-medium
                    ${
                      wordPairs.length < 2
                        ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white'
                    }
                  `}
                >
                  {wordPairs.length < 2
                    ? 'Add at least 2 pairs to start'
                    : 'Start Game'}
                </button>
              </div>
            </div>
          )}

          {isPlaying && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
              {gameCompleted ? (
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                    Congratulations! 🎉
                  </h2>
                  <p className="dark:text-gray-300">You've matched all the pairs!</p>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={handlePlayAgain}
                      className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      Play Again
                    </button>
                    <button
                      onClick={() => setIsPlaying(false)}
                      className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700"
                    >
                      Edit Words
                    </button>
                  </div>
                </div>
              ) : (
                <Game
                  wordPairs={wordPairs}
                  onGameComplete={handleGameComplete}
                />
              )}
            </div>
          )}
        </div>

        {/* Reset Word List Button */}
        {wordPairs.length > 0 && (
          <button
            onClick={handleResetWordList}
            className="fixed bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Word List
          </button>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
