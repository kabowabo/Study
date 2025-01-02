import React from 'react';
import { TETROMINOS, TetrominoType } from './tetrominos';

interface TetrominoPreviewProps {
  piece: TetrominoType;
  isSelected: boolean;
  onClick: () => void;
}

export function TetrominoPreview({ piece, isSelected, onClick }: TetrominoPreviewProps) {
  const tetromino = TETROMINOS[piece];

  return (
    <button
      onClick={onClick}
      className={`
        p-2 rounded-lg transition-transform
        ${isSelected ? 'scale-110 ring-2 ring-blue-500' : 'hover:scale-105'}
      `}
    >
      <div className="grid gap-1" style={{
        gridTemplateRows: `repeat(${tetromino.shape.length}, 1fr)`,
        gridTemplateColumns: `repeat(${tetromino.shape[0].length}, 1fr)`
      }}>
        {tetromino.shape.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`
                w-6 h-6 rounded
                ${cell ? tetromino.color : 'bg-transparent'}
              `}
            />
          ))
        )}
      </div>
    </button>
  );
}