import {
  DEFAULT_MATRIX_HEIGHT,
  DEFAULT_MATRIX_WIDTH,
  FRAME_TICK,
} from "../const";
import { GameState, GameStatus, GameTimer } from "../types";
import { createEmptyMatrixWithSnake } from "./matrix";
import { getDefaultSnake } from "./snake";

export function getDefaultGameState(): GameState {
  return {
    status: GameStatus.INIT,
    timer: {
      time: 0,
      start: new Date(),
      interval: null,
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

export function createTimer(render: () => void): GameTimer {
  return {
    time: 0,
    start: new Date(),
    interval: setInterval(() => {
      render();
    }, FRAME_TICK),
  };
}

export function increaseTimer(timer: GameTimer): GameTimer {
  console.log("Increase timer", timer.time);
  return {
    ...timer,
    time: timer.time + 1,
  };
}
