import { useState, useEffect } from 'react';
import type { Card as CardType } from '../types';

export function useGameLogic(cards: CardType[], onGameComplete: () => void) {
  const [selectedWord, setSelectedWord] = useState<CardType | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<CardType | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());

  // Check for matches when selections change
  useEffect(() => {
    if (selectedWord && selectedDefinition) {
      if (selectedWord.originalId === selectedDefinition.originalId) {
        // Match found
        setMatchedPairs(prev => new Set([...prev, selectedWord.originalId]));
      }
      // Clear selections after a delay
      const timer = setTimeout(() => {
        setSelectedWord(null);
        setSelectedDefinition(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedWord, selectedDefinition]);

  // Check for game completion
  useEffect(() => {
    if (cards.length > 0 && matchedPairs.size === cards.length / 2) {
      onGameComplete();
    }
  }, [matchedPairs.size, cards.length, onGameComplete]);

  const handleCardClick = (card: CardType) => {
    // Ignore if card is already matched
    if (matchedPairs.has(card.originalId)) {
      return;
    }

    // Handle word selection
    if (card.type === 'word') {
      if (selectedDefinition) {
        // Clear definition if one was selected
        setSelectedDefinition(null);
      }
      setSelectedWord(prev => prev?.id === card.id ? null : card);
    }
    // Handle definition selection
    else if (card.type === 'definition') {
      if (!selectedWord) {
        return; // Ignore definition clicks when no word is selected
      }
      setSelectedDefinition(card);
    }
  };

  const isCardSelected = (card: CardType) => {
    return (
      (selectedWord?.id === card.id) ||
      (selectedDefinition?.id === card.id)
    );
  };

  const isCardMatched = (card: CardType) => {
    return matchedPairs.has(card.originalId);
  };

  return {
    handleCardClick,
    isCardSelected,
    isCardMatched,
    matchedPairs,
  };
}