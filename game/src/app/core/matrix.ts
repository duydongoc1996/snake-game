import { GameCellType, GameMatrix } from "../types";

export function createEmptyMatrixWithSnake(
  height: number,
  width: number
): GameMatrix {
  const objects = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => ({ type: GameCellType.EMPTY }))
  );

  // Default snake
  objects[0][0] = { type: GameCellType.TAIL };
  objects[0][1] = { type: GameCellType.BODY };
  objects[1][1] = { type: GameCellType.HEAD };

  return {
    height,
    width,
    objects,
  };
}
