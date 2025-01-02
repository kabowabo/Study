import React, { useState, useEffect } from 'react';
import { Plus, Check, ChevronDown } from 'lucide-react';
import type { WordPair } from '../types';

interface WordInputProps {
  onAddPair: (pair: WordPair) => void;
  onUpdatePair: (pair: WordPair) => void;
  editingPair: WordPair | null;
}

export function WordInput({ onAddPair, onUpdatePair, editingPair }: WordInputProps) {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [bulkInput, setBulkInput] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  useEffect(() => {
    if (editingPair) {
      setWord(editingPair.word);
      setDefinition(editingPair.definition);
    }
  }, [editingPair]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (word.trim() && definition.trim()) {
      if (editingPair) {
        onUpdatePair({
          ...editingPair,
          word: word.trim(),
          definition: definition.trim(),
        });
      } else {
        onAddPair({
          id: crypto.randomUUID(),
          word: word.trim(),
          definition: definition.trim(),
        });
      }
      setWord('');
      setDefinition('');
    }
  };

  const handleBulkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pairs = bulkInput
      .split('\n')
      .filter(line => line.trim())
      .map(line => {
        const [word, definition] = line.split('-').map(s => s.trim());
        if (word && definition) {
          return {
            id: crypto.randomUUID(),
            word,
            definition,
          };
        }
        return null;
      })
      .filter((pair): pair is WordPair => pair !== null);

    pairs.forEach(pair => onAddPair(pair));
    setBulkInput('');
    setShowAdvanced(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium dark:text-gray-200">Add Word Pairs</h3>
        <button
          onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
          className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
        >
          Advanced Options
          <ChevronDown className={`w-4 h-4 transition-transform ${isAdvancedOpen ? 'transform rotate-180' : ''}`} />
        </button>
      </div>

      {isAdvancedOpen && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bulk Input (one pair per line, separated by dash)
            </label>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Example:<br />
              apple - a round fruit with red or green skin<br />
              book - a written or printed work
            </div>
            <form onSubmit={handleBulkSubmit}>
              <textarea
                value={bulkInput}
                onChange={(e) => setBulkInput(e.target.value)}
                placeholder="Enter word-definition pairs..."
                className="w-full h-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
              />
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                Add Bulk Pairs
              </button>
            </form>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter word"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
          />
          <input
            type="text"
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
            placeholder="Enter definition"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {editingPair ? (
              <Check className="w-5 h-5" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}