import React, { useState, useEffect } from 'react';
import type { Card as CardType, WordPair } from '../types';
import { Card } from './Card';

interface GameProps {
  wordPairs: WordPair[];
  onGameComplete: () => void;
}

const PAIRS_PER_BATCH = 8; // Show 16 cards at a time (8 pairs)

export function Game({ wordPairs, onGameComplete }: GameProps) {
  const [currentBatch, setCurrentBatch] = useState(0);
  const [selectedCards, setSelectedCards] = useState<CardType[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [cards, setCards] = useState<CardType[]>([]);

  const totalBatches = Math.ceil(wordPairs.length / PAIRS_PER_BATCH);

  // Initialize cards for current batch
  useEffect(() => {
    const startIdx = currentBatch * PAIRS_PER_BATCH;
    const batchPairs = wordPairs.slice(startIdx, startIdx + PAIRS_PER_BATCH);

    const newCards: CardType[] = [
      ...batchPairs.map((pair) => ({
        id: crypto.randomUUID(),
        content: pair.word,
        type: 'word' as const,
        isFlipped: false,
        isMatched: false,
        originalId: pair.id,
      })),
      ...batchPairs.map((pair) => ({
        id: crypto.randomUUID(),
        content: pair.definition,
        type: 'definition' as const,
        isFlipped: false,
        isMatched: false,
        originalId: pair.id,
      })),
    ].sort(() => Math.random() - 0.5);

    setCards(newCards);
    setSelectedCards([]);
  }, [wordPairs, currentBatch]);

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [first, second] = selectedCards;
      if (first.originalId === second.originalId) {
        setMatchedPairs(prev => new Set([...prev, first.originalId]));
      }
      setTimeout(() => setSelectedCards([]), 1000);
    }
  }, [selectedCards]);

  useEffect(() => {
    const currentBatchPairs = wordPairs.slice(
      currentBatch * PAIRS_PER_BATCH,
      (currentBatch + 1) * PAIRS_PER_BATCH
    );
    
    if (matchedPairs.size === currentBatchPairs.length) {
      if (currentBatch === totalBatches - 1) {
        onGameComplete();
      } else {
        setTimeout(() => {
          setCurrentBatch(prev => prev + 1);
          setMatchedPairs(new Set());
        }, 1000);
      }
    }
  }, [matchedPairs.size, currentBatch, totalBatches, wordPairs, onGameComplete]);

  const handleCardClick = (card: CardType) => {
    if (
      selectedCards.length === 2 ||
      selectedCards.some(c => c.id === card.id) ||
      matchedPairs.has(card.originalId)
    ) {
      return;
    }

    setSelectedCards(prev => [...prev, card]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-gray-600 dark:text-gray-400">
          Batch {currentBatch + 1} of {totalBatches}
        </p>
        <div className="flex items-center gap-2">
          <div className="h-2 w-48 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 dark:bg-blue-600 transition-all duration-500"
              style={{ width: `${(matchedPairs.size / cards.length * 2) * 100}%` }}
            />
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {Math.round((matchedPairs.size / cards.length * 2) * 100)}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isSelected={selectedCards.some(c => c.id === card.id)}
            isMatched={matchedPairs.has(card.originalId)}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>

      {currentBatch > 0 && (
        <button
          onClick={() => setCurrentBatch(prev => prev - 1)}
          className="absolute bottom-4 left-20 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 transition-colors"
        >
          Previous Batch
        </button>
      )}
    </div>
  );
}