import { DEFAULT_SNAKE_LENGTH } from "../const";
import { Direction } from "../types";

export function getDefaultSnake() {
  return {
    length: DEFAULT_SNAKE_LENGTH,
    head: { x: 1, y: 1 },
    tail: { x: 0, y: 0 },
    direction: Direction.DOWN,
  };
}
