import { DEFAULT_MATRIX_HEIGHT, DEFAULT_MATRIX_WIDTH } from "../const";
import { GameState, GameStatus } from "../types";
import { createEmptyMatrixWithSnake } from "./matrix";
import { getDefaultSnake } from "./snake";

export function getDefaultGameState(): GameState {
  return {
    status: GameStatus.INIT,
    timer: {
      time: 0,
      start: new Date(),
    },
    matrix: createEmptyMatrixWithSnake(
      DEFAULT_MATRIX_HEIGHT,
      DEFAULT_MATRIX_WIDTH
    ),
    snake: getDefaultSnake(),
    bait: {
      position: { x: 0, y: 0 },
    },
  };
}
