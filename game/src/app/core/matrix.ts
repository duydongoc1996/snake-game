import {
  MAX_MATRIX_HEIGHT,
  MAX_MATRIX_WIDTH,
  MIN_MATRIX_HEIGHT,
  MIN_MATRIX_WIDTH,
} from "../const";
import { GameCellType, GameMatrix } from "../types";

export function validateMatrixSize(size: {
  height: number;
  width: number;
}): boolean {
  if (
    size.height < MIN_MATRIX_HEIGHT ||
    size.height > MAX_MATRIX_HEIGHT ||
    size.width < MIN_MATRIX_WIDTH ||
    size.width > MAX_MATRIX_WIDTH
  )
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
