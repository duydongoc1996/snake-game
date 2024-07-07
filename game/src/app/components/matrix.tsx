import { GameState } from "../types";
import Cell from "./cell";

export default function Matrix(props: { gameState: GameState }) {
  return (
    <div className="bg-white">
      <div className="border-8 border-green-500">
        <table className="table-fixed">
          <tbody>
            {props.gameState.matrix.objects.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <Cell
                      gameState={props.gameState}
                      cell={cell}
                      key={cellIndex}
                    />
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
