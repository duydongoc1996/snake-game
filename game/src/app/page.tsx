"use client";

import { produce } from "immer";
import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import GameMenu from "./components/game-menu";
import Matrix from "./components/matrix";
import {
  DEFAULT_MATRIX_HEIGHT,
  DEFAULT_MATRIX_WIDTH,
  FRAME_TICK,
} from "./const";
import { addKeyboardListeners } from "./core/keyboard";
import { validateMatrixSize } from "./core/matrix";
import { moveSnake, printSnake } from "./core/snake";
import { getDefaultGameState, getNewGameState } from "./core/state";
import { Direction, GameStatus } from "./types";

export default function Game() {
  const [gameState, setGameState] = useState(getDefaultGameState());
  const [width, setWidth] = useState(DEFAULT_MATRIX_WIDTH);
  const [height, setHeight] = useState(DEFAULT_MATRIX_HEIGHT);

  useEffect(() => {
    printSnake(gameState.snake);
  }, []); // Runs only on mount and unmount

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
    console.log("Change height", height);
    setHeight(height);
  };
  const onChangeWidth = (width: number) => {
    console.log("Change width", width);
    setWidth(width);
  };

  const onWin = () => {
    console.log("You win!");
  };

  const onLose = () => {
    console.log("You lose!");
  };

  const onStart = () => {
    // Validate matrix size
    if (!validateMatrixSize({ height, width }))
      return console.error("Invalid matrix size");

    // Start new game
    setGameState(
      produce(gameState, (draft) => {
        draft.matrix.height = height;
        draft.matrix.width = width;
        getNewGameState(draft);
      })
    );

    console.log("Start game");
  };

  // Game loop
  useInterval(
    () => {
      // Run this every frame
      setGameState((state) =>
        produce(state, (draft) => {
          moveSnake(draft, onWin, onLose);
          draft.timer.time += 1;
          return draft;
        })
      );
      printSnake(gameState.snake);
      // printMatrix(gameState.matrix);
    },
    // Delay in milliseconds or null to stop it
    gameState.status === GameStatus.PLAYING ? FRAME_TICK : null
  );

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
