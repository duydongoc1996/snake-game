import { useState } from "react";
import { GameState } from "../types";

export default function Matrix(props: {
  height: number;
  width: number;
  gameState: GameState;
}) {
  console.log(`Render matrix:  ${props.height}x${props.width}`);

  const [matrix, setMatrix] = useState(
    Array.from({ length: props.height }, () =>
      Array.from({ length: props.width }, () => null)
    )
  );

  return (
    <div className="bg-white">
      <div className="border-8 border-green-500">
        <table className="table-fixed">
          <tbody>
            {matrix.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <Cell cell={cell} key={cellIndex} />
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Cell(props: { cell: any }) {
  return <td className="w-10 h-10 border border-gray-300"></td>;
}
