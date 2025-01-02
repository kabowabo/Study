import React from 'react';
import type { Card as CardType } from '../types';
import { cn } from '../utils/cn';

interface CardProps {
  card: CardType;
  isSelected: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export function Card({ card, isSelected, isMatched, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative w-full aspect-[3/4] cursor-pointer transition-all duration-200',
        isMatched && 'opacity-50 cursor-default',
        isSelected && 'ring-2 ring-blue-500 dark:ring-blue-400 transform scale-105'
      )}
    >
      <div className={cn(
        'absolute inset-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg',
        'border-2 border-blue-200 dark:border-blue-700',
        'p-4 flex items-center justify-center text-center',
        isSelected && 'border-blue-500 dark:border-blue-400'
      )}>
        <div className="flex flex-col gap-2">
          <span className={cn(
            'text-xs',
            card.type === 'word' 
              ? 'text-blue-500 dark:text-blue-400'
              : 'text-green-500 dark:text-green-400'
          )}>
            {card.type === 'word' ? 'Word' : 'Definition'}
          </span>
          <p className="text-lg font-medium dark:text-gray-200">
            {card.content}
          </p>
        </div>
      </div>
    </div>
  );
}