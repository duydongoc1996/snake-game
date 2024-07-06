import { GameState } from "../types";

export default function Matrix(props: { gameState: GameState }) {
  console.log(
    `Render matrix:  ${props.gameState.matrix.height}x${props.gameState.matrix.width}`
  );

  return (
    <div className="bg-white">
      <div className="border-8 border-green-500">
        <table className="table-fixed">
          <tbody>
            {props.gameState.matrix.objects.map((row, rowIndex) => {
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
