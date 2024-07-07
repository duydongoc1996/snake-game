import {
  GameBait,
  GameCellType,
  GameMatrix,
  GameState,
  Position,
} from "../types";

export function generateBait(gameState: GameState): GameBait | null {
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

  if (emptyCells.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const bait = { position: emptyCells[randomIndex] };
  printBait(bait);
  return bait;
}

export function injectBaitToMatrix(bait: GameBait | null) {
  if (bait === null) return (gameMatrix: GameMatrix): GameMatrix => gameMatrix;

  return (gameMatrix: GameMatrix): GameMatrix => {
    // Add bait
    gameMatrix.objects[bait.position.y][bait.position.x] = {
      type: GameCellType.BAIT,
    };
    return gameMatrix;
  };
}

export function printBait(bait: GameBait | null) {
  if (bait === null) console.debug("Bait: NULL");
  else console.debug(`Bait: (${bait.position.x}, ${bait.position.y})`);
}
