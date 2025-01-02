// Define standard Tetris pieces
export const TETROMINOS = {
  I: {
    shape: [
      [true, true, true, true]
    ],
    color: 'bg-cyan-500 hover:bg-cyan-600'
  },
  O: {
    shape: [
      [true, true],
      [true, true]
    ],
    color: 'bg-yellow-500 hover:bg-yellow-600'
  },
  T: {
    shape: [
      [true, true, true],
      [false, true, false]
    ],
    color: 'bg-purple-500 hover:bg-purple-600'
  },
  S: {
    shape: [
      [false, true, true],
      [true, true, false]
    ],
    color: 'bg-green-500 hover:bg-green-600'
  },
  Z: {
    shape: [
      [true, true, false],
      [false, true, true]
    ],
    color: 'bg-red-500 hover:bg-red-600'
  },
  J: {
    shape: [
      [true, false, false],
      [true, true, true]
    ],
    color: 'bg-blue-500 hover:bg-blue-600'
  },
  L: {
    shape: [
      [false, false, true],
      [true, true, true]
    ],
    color: 'bg-orange-500 hover:bg-orange-600'
  }
} as const;

export type TetrominoType = keyof typeof TETROMINOS;

export function getRandomTetrominos(count: number) {
  const types = Object.keys(TETROMINOS) as TetrominoType[];
  const pieces: TetrominoType[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * types.length);
    pieces.push(types[randomIndex]);
  }
  
  return pieces;
}