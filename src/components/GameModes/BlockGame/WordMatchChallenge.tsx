import React, { useState } from 'react';
import { Shuffle } from 'lucide-react';
import type { WordPair } from '../../../types';

interface WordMatchChallengeProps {
  wordPair: WordPair;
  onComplete: (success: boolean) => void;
}

export function WordMatchChallenge({ wordPair, onComplete }: WordMatchChallengeProps) {
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  
  // Generate 3 random wrong definitions
  const wrongDefinitions = Array.from({ length: 3 }, () => {
    const randomIndex = Math.floor(Math.random() * definitions.length);
    return definitions[randomIndex];
  });

  const allDefinitions = [wordPair.definition, ...wrongDefinitions]
    .sort(() => Math.random() - 0.5);

  const handleDefinitionSelect = (definition: string) => {
    setSelectedDefinition(definition);
    const isCorrect = definition === wordPair.definition;
    setTimeout(() => onComplete(isCorrect), 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold dark:text-gray-200">Match the Word!</h3>
          <p className="text-2xl font-bold mt-4 text-blue-600 dark:text-blue-400">
            {wordPair.word}
          </p>
        </div>

        <div className="space-y-3">
          {allDefinitions.map((definition, index) => (
            <button
              key={index}
              onClick={() => handleDefinitionSelect(definition)}
              className={`w-full p-3 rounded-lg text-left transition-colors ${
                selectedDefinition === definition
                  ? selectedDefinition === wordPair.definition
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200'
              }`}
            >
              {definition}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}