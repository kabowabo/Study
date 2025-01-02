import React, { useState } from 'react';
import { TetrominoPreview } from './TetrominoPreview';
import { TETROMINOS, TetrominoType, getRandomTetrominos } from './tetrominos';
import type { TetrisGrid } from '../../../types';

interface BlockGridProps {
  onLinesCleared: (lines: number) => void;
}

const GRID_SIZE = 10;

export function BlockGrid({ onLinesCleared }: BlockGridProps) {
  const [grid, setGrid] = useState<TetrisGrid>(() => 
    Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(false))
  );
  const [availablePieces, setAvailablePieces] = useState<TetrominoType[]>(() => 
    getRandomTetrominos(5)
  );
  const [selectedPiece, setSelectedPiece] = useState<TetrominoType | null>(null);
  const [completedLines, setCompletedLines] = useState(0);

  const canPlacePiece = (piece: TetrominoType, row: number, col: number): boolean => {
    const tetromino = TETROMINOS[piece].shape;
    
    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[i].length; j++) {
        if (tetromino[i][j]) {
          const newRow = row + i;
          const newCol = col + j;
          
          if (
            newRow >= GRID_SIZE || 
            newCol >= GRID_SIZE || 
            (grid[newRow] && grid[newRow][newCol])
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const placePiece = (piece: TetrominoType, row: number, col: number) => {
    if (!canPlacePiece(piece, row, col)) return;

    const newGrid = grid.map(row => [...row]);
    const tetromino = TETROMINOS[piece].shape;

    for (let i = 0; i < tetromino.length; i++) {
      for (let j = 0; j < tetromino[i].length; j++) {
        if (tetromino[i][j]) {
          newGrid[row + i][col + j] = true;
        }
      }
    }

    setGrid(newGrid);
    setAvailablePieces(prev => prev.filter(p => p !== piece));
    setSelectedPiece(null);

    // Check for completed lines
    checkCompletedLines(newGrid);

    // Check if no more moves are possible
    if (availablePieces.length === 1) {
      setAvailablePieces(getRandomTetrominos(5));
    }
  };

  const checkCompletedLines = (currentGrid: TetrisGrid) => {
    let linesCleared = 0;
    
    // Check rows
    for (let i = 0; i < GRID_SIZE; i++) {
      if (currentGrid[i].every(cell => cell)) {
        linesCleared++;
      }
    }

    // Check columns
    for (let j = 0; j < GRID_SIZE; j++) {
      if (currentGrid.every(row => row[j])) {
        linesCleared++;
      }
    }

    if (linesCleared > 0) {
      setCompletedLines(prev => prev + linesCleared);
      onLinesCleared(completedLines + linesCleared);
      
      // Clear completed lines
      const newGrid = currentGrid.map(row => 
        row.every(cell => cell) ? Array(GRID_SIZE).fill(false) : row
      );
      
      // Clear completed columns
      for (let j = 0; j < GRID_SIZE; j++) {
        if (currentGrid.every(row => row[j])) {
          newGrid.forEach(row => row[j] = false);
        }
      }
      
      setGrid(newGrid);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-center gap-4 mb-4">
        {availablePieces.map((piece, index) => (
          <TetrominoPreview
            key={`${piece}-${index}`}
            piece={piece}
            isSelected={selectedPiece === piece}
            onClick={() => setSelectedPiece(piece)}
          />
        ))}
      </div>

      <div className="grid grid-cols-10 gap-1 bg-gray-700 p-4 rounded-lg">
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              onClick={() => selectedPiece && placePiece(selectedPiece, rowIndex, colIndex)}
              className={`
                w-10 h-10 rounded transition-colors
                ${cell 
                  ? 'bg-gray-400'
                  : selectedPiece && canPlacePiece(selectedPiece, rowIndex, colIndex)
                    ? 'bg-gray-600 hover:bg-gray-500'
                    : 'bg-gray-800'
                }
              `}
            />
          ))
        ))}
      </div>
    </div>
  );
}