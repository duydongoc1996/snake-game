"use client";

import Matrix from "./components/matrix";
import { DEFAULT_MATRIX_HEIGHT, DEFAULT_MATRIX_WIDTH } from "./const";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Matrix
        height={DEFAULT_MATRIX_HEIGHT}
        width={DEFAULT_MATRIX_WIDTH}
        gameState={{}}
      />
    </main>
  );
}
