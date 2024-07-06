import { GameCellType, GameMatrix } from "../types";

export function createEmptyMatrix(height: number, width: number): GameMatrix {
  const objects = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({ type: GameCellType.EMPTY }))
  );

  return {
    height,
    width,
    objects,
  };
}
