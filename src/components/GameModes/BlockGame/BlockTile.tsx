import React from 'react';
import type { BlockType } from '../../../types';

interface BlockTileProps {
  color: BlockType;
  onClick: () => void;
}

const colorMap = {
  red: 'bg-red-500 hover:bg-red-600',
  blue: 'bg-blue-500 hover:bg-blue-600',
  green: 'bg-green-500 hover:bg-green-600',
  yellow: 'bg-yellow-500 hover:bg-yellow-600',
  purple: 'bg-purple-500 hover:bg-purple-600',
};

export function BlockTile({ color, onClick }: BlockTileProps) {
  if (!color) return <div className="w-12 h-12 bg-gray-800 rounded" />;

  return (
    <button
      onClick={onClick}
      className={`w-12 h-12 ${colorMap[color]} rounded transition-colors duration-200 transform hover:scale-105`}
    />
  );
}