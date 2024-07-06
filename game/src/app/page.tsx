"use client";

import { useState } from "react";
import GameMenu from "./components/game-menu";
import Matrix from "./components/matrix";
import { DEFAULT_MATRIX_HEIGHT, DEFAULT_MATRIX_WIDTH } from "./const";
import { createEmptyMatrix } from "./core/matrix";
import { createTimer, getDefaultGameState, increaseTimer } from "./core/state";
import { GameStatus } from "./types";

export default function Home() {
  const [gameState, setGameState] = useState(getDefaultGameState());
  const [width, setWidth] = useState(DEFAULT_MATRIX_WIDTH);
  const [height, setHeight] = useState(DEFAULT_MATRIX_HEIGHT);

  const onChangeHeight = (height: number) => {
    setHeight(height);
    console.log("Change height", height);
  };
  const onChangeWidth = (width: number) => {
    console.log("Change width", width);
    setWidth(width);
  };

  const onStart = () => {
    // Remove old interval
    if (gameState.timer.interval) clearInterval(gameState.timer.interval);

    // Start new game
    const newTimer = createTimer(() => {
      setGameState((state) => {
        return {
          ...state,
          timer: increaseTimer(state.timer),
        };
      });
    });

    setGameState({
      ...gameState,
      timer: newTimer,
      status: GameStatus.PLAYING,
      matrix: createEmptyMatrix(height, width),
    });
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
