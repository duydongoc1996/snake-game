"use client";

import { produce } from "immer";
import { useEffect, useState } from "react";
import GameMenu from "./components/game-menu";
import Matrix from "./components/matrix";
import {
  DEFAULT_MATRIX_HEIGHT,
  DEFAULT_MATRIX_WIDTH,
  FRAME_TICK,
} from "./const";
import { addKeyboardListeners } from "./core/keyboard";
import { createEmptyMatrixWithSnake } from "./core/matrix";
import { moveSnake } from "./core/snake";
import { getDefaultGameState } from "./core/state";
import { Direction, GameStatus } from "./types";

export default function Game() {
  const [gameState, setGameState] = useState(getDefaultGameState());
  const [width, setWidth] = useState(DEFAULT_MATRIX_WIDTH);
  const [height, setHeight] = useState(DEFAULT_MATRIX_HEIGHT);
  let [intervalID, setIntervalID] = useState<NodeJS.Timeout | null>(null);

  console.log("State: ", gameState);

  const onKeyUp = () => {
    setGameState((state) =>
      produce(state, (draft) => {
        draft.snake.direction = Direction.UP;
      })
    );
  };
  const onKeyDown = () => {
    setGameState((state) =>
      produce(state, (draft) => {
        draft.snake.direction = Direction.DOWN;
      })
    );
  };
  const onKeyLeft = () => {
    setGameState((state) =>
      produce(state, (draft) => {
        draft.snake.direction = Direction.LEFT;
      })
    );
  };
  const onKeyRight = () => {
    setGameState((state) =>
      produce(state, (draft) => {
        draft.snake.direction = Direction.RIGHT;
      })
    );
  };

  useEffect(() => {
    addKeyboardListeners({
      up: onKeyUp,
      down: onKeyDown,
      left: onKeyLeft,
      right: onKeyRight,
    });
  }, []); // Runs only on mount and unmount

  const onChangeHeight = (height: number) => {
    setHeight(height);
    console.log("Change height", height);
  };
  const onChangeWidth = (width: number) => {
    console.log("Change width", width);
    setWidth(width);
  };

  const onWin = () => {
    alert("You win!");
    window.location.reload();
  };

  const onLose = () => {
    alert("You lose!");
    window.location.reload();
  };

  const onStart = () => {
    // Remove old interval
    if (intervalID) clearInterval(intervalID);

    // Start new game
    setGameState(
      produce(gameState, (draft) => {
        draft.status = GameStatus.PLAYING;
        draft.matrix = createEmptyMatrixWithSnake(height, width);
      }) // Reset the game state
    );

    // Start an infinite loop
    setIntervalID(
      setInterval(() => {
        // Run this every frame
        setGameState((state) =>
          produce(state, (draft) => {
            moveSnake(draft, onWin, onLose);
            draft.timer.start = new Date();
            draft.timer.time += 1;

            return draft;
          })
        );
      }, FRAME_TICK)
    );

    console.log("Start game");
  };

  return (
    <main className="flex min-h-screen flex-col items-center pt-10">
      <h1 className="text-4xl font-bold">Snake Game</h1>

      <GameMenu
        width={width}
        height={height}
        gameState={gameState}
        onChangeHeight={onChangeHeight}
        onChangeWidth={onChangeWidth}
        onStart={onStart}
      />

      <Matrix gameState={gameState} />
    </main>
  );
}
