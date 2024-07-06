export type Position = {
  x: number;
  y: number;
};

export enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export enum GameStatus {
  INIT = "INIT",
  PLAYING = "PLAYING",
  WIN = "WIN",
  LOSE = "LOSE",
}

export enum GameCellType {
  EMPTY = "EMPTY",
  BODY = "BODY",
  HEAD = "HEAD",
  TAIL = "TAIL",
  BAIT = "BAIT",
}

export type GameTimer = {
  time: number;
  start: Date;
  interval: NodeJS.Timeout | null;
};

export type GameCell = {
  type: GameCellType;
};

export type GameMatrix = {
  height: number;
  width: number;

  objects: Array<Array<GameCell>>;
};

export type GameSnake = {
  length: number;
  head: Position;
  tail: Position;
  direction: Direction;
};

export type GameBait = {
  position: Position;
};

export type GameState = {
  status: GameStatus;

  timer: GameTimer;

  matrix: GameMatrix;

  snake: GameSnake;

  bait: GameBait;
};
