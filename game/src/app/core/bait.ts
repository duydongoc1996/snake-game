import { GameCellType, GameState, Position } from "../types";

export function generateBait(gameState: GameState): boolean {
  // Find empty cells in the matrix
  const emptyCells: Position[] = gameState.matrix.objects.reduce(
    (acc, row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        if (cell.type === GameCellType.EMPTY) {
          acc.push({ x: cellIndex, y: rowIndex });
        }
      });
      return acc;
    },
    [] as Position[]
  );

  if (emptyCells.length === 0) return false;

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const position = emptyCells[randomIndex];

  // Add bait
  gameState.matrix.objects[position.y][position.x] = {
    type: GameCellType.BAIT,
  };
  return true;
}
