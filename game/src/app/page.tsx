"use client";

import { produce } from "immer";
import * as _ from "lodash";
import { useEffect, useState } from "react";
import GameMenu from "./components/game-menu";
import Matrix from "./components/matrix";
import {
  DEFAULT_MATRIX_HEIGHT,
  DEFAULT_MATRIX_WIDTH,
  FRAME_TICK,
} from "./const";
import { generateBait } from "./core/bait";
import { addKeyboardListeners } from "./core/keyboard";
import { createEmptyMatrix } from "./core/matrix";
import { getDefaultSnake, injectSnakeToMatrix, moveSnake } from "./core/snake";
import { getDefaultGameState } from "./core/state";
import { Direction, GameStatus } from "./types";

export default function Game() {
  const [gameState, setGameState] = useState(getDefaultGameState());
  const [width, setWidth] = useState(DEFAULT_MATRIX_WIDTH);
  const [height, setHeight] = useState(DEFAULT_MATRIX_HEIGHT);
  const [intervalID, setIntervalID] = useState<any>(null);

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
    if (intervalID) window.clearInterval(intervalID);
    console.log("You win!");
  };

  const onLose = () => {
    if (intervalID) window.clearInterval(intervalID);
    console.log("You lose!");
  };

  const onStart = () => {
    // Remove old intervalID
    if (intervalID) window.clearInterval(intervalID);

    // Start new game
    setGameState(
      produce(gameState, (draft) => {
        draft.status = GameStatus.PLAYING;
        draft.snake = getDefaultSnake();
        draft.timer.time = 0;
        draft.timer.start = new Date();
        draft.matrix = _.flow([createEmptyMatrix, injectSnakeToMatrix])(
          height,
          width
        );
        generateBait(draft);
      }) // Reset the game state
    );

    // Start an infinite intervalID
    const loop = window.setInterval(() => {
      // Run this every frame
      setGameState((state) =>
        produce(state, (draft) => {
          moveSnake(draft, onWin, onLose);
          console.debug("in: ", intervalID);

          draft.timer.time += 1;

          return draft;
        })
      );
    }, FRAME_TICK);
    console.debug("loop: ", loop);

    setIntervalID(loop);

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
