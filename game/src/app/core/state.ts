import * as _ from "lodash";
import { DEFAULT_MATRIX_HEIGHT, DEFAULT_MATRIX_WIDTH } from "../const";
import { GameState, GameStatus } from "../types";
import { createEmptyMatrix } from "./matrix";
import { getDefaultSnake, injectSnakeToMatrix } from "./snake";

export function getDefaultGameState(): GameState {
  return {
    status: GameStatus.INIT,
    timer: {
      time: 0,
      start: null,
    },
    matrix: _.flow([createEmptyMatrix, injectSnakeToMatrix])(
      DEFAULT_MATRIX_HEIGHT,
      DEFAULT_MATRIX_WIDTH
    ),
    snake: getDefaultSnake(),
    bait: null,
  };
}
