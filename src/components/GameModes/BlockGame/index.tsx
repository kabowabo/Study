import React, { useState } from 'react';
import { BlockGrid } from './BlockGrid';
import { WordMatchChallenge } from './WordMatchChallenge';
import type { WordPair } from '../../../types';

interface BlockGameProps {
  wordPairs: WordPair[];
  onGameComplete: () => void;
}

export function BlockGame({ wordPairs, onGameComplete }: BlockGameProps) {
  const [linesCleared, setLinesCleared] = useState(0);
  const [showWordChallenge, setShowWordChallenge] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const handleLinesCleared = (total: number) => {
    setLinesCleared(total);
    if (total % 5 === 0 && total > 0) {
      setShowWordChallenge(true);
    }
  };

  const handleWordChallengeComplete = (success: boolean) => {
    setShowWordChallenge(false);
    if (success) {
      setCurrentWordIndex(prev => (prev + 1) % wordPairs.length);
    }
    if (currentWordIndex === wordPairs.length - 1) {
      onGameComplete();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-semibold dark:text-gray-200">
          Lines Cleared: {linesCleared}
        </div>
      </div>

      {showWordChallenge ? (
        <WordMatchChallenge
          wordPair={wordPairs[currentWordIndex]}
          onComplete={handleWordChallengeComplete}
        />
      ) : (
        <BlockGrid onLinesCleared={handleLinesCleared} />
      )}
    </div>
  );
}