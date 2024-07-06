import { DEFAULT_SNAKE_LENGTH } from "../const";
import {
  Direction,
  GameCellType,
  GameState,
  GameStatus,
  Position,
} from "../types";

export function getDefaultSnake() {
  return {
    array: [
      { x: 0, y: 0 }, // tail
      { x: 1, y: 0 }, // body
      { x: 1, y: 1 }, // head
    ],
    length: DEFAULT_SNAKE_LENGTH,
    head: { x: 1, y: 1 },
    tail: { x: 0, y: 0 },
    direction: Direction.DOWN,
  };
}

export function moveSnake(
  gameState: GameState,
  onWin: () => void,
  onLose: () => void
): GameState {
  const { snake } = gameState;
  const { head, tail, direction } = snake;

  const directions = {
    [Direction.UP]: () => ({ x: head.x, y: head.y - 1 }),
    [Direction.DOWN]: () => ({ x: head.x, y: head.y + 1 }),
    [Direction.LEFT]: () => ({ x: head.x - 1, y: head.y }),
    [Direction.RIGHT]: () => ({ x: head.x + 1, y: head.y }),
    default: () => {
      throw new Error("Invalid direction");
    },
  };

  const newHead = (directions[direction] || directions["default"])();

  // Check next move
  const movements = {
    [GameCellType.EMPTY]: () => moveToEmptyCell(gameState, newHead),
    [GameCellType.BAIT]: () => moveToBait(gameState, onWin),
    [GameCellType.HEAD]: () => moveToItself(gameState, onLose),
    [GameCellType.BODY]: () => moveToItself(gameState, onLose),
    [GameCellType.TAIL]: () => moveToItself(gameState, onLose),
    default: () => moveToWall(gameState, onLose),
  };

  return (
    movements[gameState.matrix.objects[newHead.y]?.[newHead.x]?.type] ||
    movements["default"]
  )();
}

function moveToEmptyCell(gameState: GameState, newHead: Position) {
  const head = gameState.snake.head;

  // Add new head in empty space (with direction)
  gameState.snake.head = newHead;
  gameState.matrix.objects[newHead.y][newHead.x] = { type: GameCellType.HEAD };
  gameState.snake.array.push(newHead);

  // Remove tail
  const tail = gameState.snake.array.shift() as Position;
  gameState.matrix.objects[tail.y][tail.x] = { type: GameCellType.EMPTY };

  // Update new tail
  gameState.snake.tail = gameState.snake.array[0];

  // Replace old head with body
  gameState.matrix.objects[head.y][head.x] = { type: GameCellType.BODY };

  return gameState;
}
function moveToBait(gameState: GameState, onWin: () => void) {
  return gameState;
}
function moveToItself(gameState: GameState, onLose: () => void) {
  gameState.status = GameStatus.LOSE;
  onLose();
  return gameState;
}
function moveToWall(gameState: GameState, onLose: () => void) {
  gameState.status = GameStatus.LOSE;
  onLose();
  return gameState;
}
