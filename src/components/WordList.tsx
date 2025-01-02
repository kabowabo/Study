import React from 'react';
import { Pencil, Trash } from 'lucide-react';
import type { WordPair } from '../types';

interface WordListProps {
  wordPairs: WordPair[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function WordList({ wordPairs, onEdit, onDelete }: WordListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold dark:text-gray-200">Your Word Pairs:</h2>
      <div className="space-y-2">
        {wordPairs.map((pair) => (
          <div
            key={pair.id}
            className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <span className="font-medium dark:text-gray-200">{pair.word}</span>
            <span className="text-gray-600 dark:text-gray-400">-</span>
            <span className="dark:text-gray-300">{pair.definition}</span>
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onEdit(pair.id)}
                className="p-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(pair.id)}
                className="p-1 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}