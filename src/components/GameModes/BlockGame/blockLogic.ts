import type { BlockType, GridType } from '../../../types';

const COLORS: BlockType[] = ['red', 'blue', 'green', 'yellow', 'purple'];
const GRID_SIZE = 8;

export function generateRandomGrid(): GridType {
  return Array(GRID_SIZE).fill(null).map(() =>
    Array(GRID_SIZE).fill(null).map(() =>
      COLORS[Math.floor(Math.random() * COLORS.length)]
    )
  );
}

export function checkForMatches(
  grid: GridType,
  row: number,
  col: number,
  color: BlockType
): { row: number; col: number }[] {
  const matches: { row: number; col: number }[] = [];
  const visited = new Set<string>();

  function dfs(r: number, c: number) {
    const key = `${r},${c}`;
    if (
      r < 0 || r >= GRID_SIZE ||
      c < 0 || c >= GRID_SIZE ||
      visited.has(key) ||
      grid[r][c] !== color
    ) {
      return;
    }

    visited.add(key);
    matches.push({ row: r, col: c });

    // Check adjacent blocks
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  dfs(row, col);
  return matches;
}

export function removeMatches(
  grid: GridType,
  matches: { row: number; col: number }[]
): GridType {
  const newGrid = grid.map(row => [...row]);
  matches.forEach(({ row, col }) => {
    newGrid[row][col] = null;
  });
  return newGrid;
}

export function dropBlocks(grid: GridType): GridType {
  const newGrid = grid.map(row => [...row]);

  // Drop existing blocks
  for (let col = 0; col < GRID_SIZE; col++) {
    let writeRow = GRID_SIZE - 1;
    for (let row = GRID_SIZE - 1; row >= 0; row--) {
      if (newGrid[row][col] !== null) {
        if (writeRow !== row) {
          newGrid[writeRow][col] = newGrid[row][col];
          newGrid[row][col] = null;
        }
        writeRow--;
      }
    }
  }

  // Fill empty spaces with new blocks
  for (let col = 0; col < GRID_SIZE; col++) {
    for (let row = 0; row < GRID_SIZE; row++) {
      if (newGrid[row][col] === null) {
        newGrid[row][col] = COLORS[Math.floor(Math.random() * COLORS.length)];
      }
    }
  }

  return newGrid;
}