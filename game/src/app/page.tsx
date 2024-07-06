"use client";

import Matrix from "./components/matrix";
import {
  DEFAULT_MATRIX_HEIGHT,
  DEFAULT_MATRIX_WIDTH,
  DEFAULT_SNAKE_LENGTH,
} from "./const";
import { Direction, GameStatus } from "./types";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Matrix
        height={DEFAULT_MATRIX_HEIGHT}
        width={DEFAULT_MATRIX_WIDTH}
        gameState={{
          status: GameStatus.INIT,
          timer: {
            step: 0,
            start: new Date(),
            interval: null,
          },
          matrix: {
            height: DEFAULT_MATRIX_HEIGHT,
            width: DEFAULT_MATRIX_WIDTH,
            objects: [],
          },
          snake: {
            length: DEFAULT_SNAKE_LENGTH,
            head: { x: 0, y: 0 },
            tail: { x: 0, y: 0 },
            direction: Direction.RIGHT,
          },
          bait: {
            position: { x: 0, y: 0 },
          },
        }}
      />
    </main>
  );
}
