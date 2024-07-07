import * as _ from "lodash";
import { DEFAULT_MATRIX_HEIGHT, DEFAULT_MATRIX_WIDTH } from "../const";
import { GameState, GameStatus } from "../types";
import { generateBait, injectBaitToMatrix } from "./bait";
import { createEmptyMatrix } from "./matrix";
import { getDefaultSnake, injectSnakeToMatrix } from "./snake";

export function getDefaultGameState(): GameState {
  return {
    status: GameStatus.INIT,
    timer: {
      time: 0,
      start: null,
    },
    matrix: _.flow([createEmptyMatrix, injectSnakeToMatrix])({
      height: DEFAULT_MATRIX_HEIGHT,
      width: DEFAULT_MATRIX_WIDTH,
    }),
    snake: getDefaultSnake(),
    bait: null,
  };
}

export function getNewGameState(gameState: GameState): GameState {
  // Reset the game state
  gameState.status = GameStatus.PLAYING;
  gameState.snake = getDefaultSnake();
  gameState.timer.time = 0;
  gameState.timer.start = new Date();

  // Generate snake fisrt
  gameState.matrix = _.flow([createEmptyMatrix, injectSnakeToMatrix])({
    height: gameState.matrix.height,
    width: gameState.matrix.width,
  });

  // Then generate bait in empty cell
  gameState.bait = generateBait(gameState);
  gameState.matrix = injectBaitToMatrix(gameState.bait)(gameState.matrix);

  return gameState;
}
