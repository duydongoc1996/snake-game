import { GameCellType, GameMatrix } from "../types";

export function validateMatrixSize(size: {
  height: number;
  width: number;
}): boolean {
  if (size.height < 3 || size.height > 20 || size.width < 3 || size.width > 20)
    return false;

  return true;
}

export function createEmptyMatrix(size: {
  height: number;
  width: number;
}): GameMatrix {
  const objects = Array.from({ length: size.height }, () =>
    Array.from({ length: size.width }, () => ({ type: GameCellType.EMPTY }))
  );

  return {
    height: size.height,
    width: size.width,
    objects,
  };
}

export function printMatrix(matrix: GameMatrix) {
  // Print matrix
  console.log("Matrix:");
  console.table(matrix.objects.map((row) => row.map((cell) => cell.type)));
}
