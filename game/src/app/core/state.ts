import {
  DEFAULT_MATRIX_HEIGHT,
  DEFAULT_MATRIX_WIDTH,
  DEFAULT_SNAKE_LENGTH,
  FRAME_TICK,
} from "../const";
import { Direction, GameState, GameStatus, GameTimer } from "../types";
import { createEmptyMatrix } from "./matrix";

export function getDefaultGameState(): GameState {
  return {
    status: GameStatus.INIT,
    timer: {
      time: 0,
      start: new Date(),
      interval: null,
    },
    matrix: createEmptyMatrix(DEFAULT_MATRIX_HEIGHT, DEFAULT_MATRIX_WIDTH),
    snake: {
      length: DEFAULT_SNAKE_LENGTH,
      head: { x: 0, y: 0 },
      tail: { x: 0, y: 0 },
      direction: Direction.RIGHT,
    },
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
