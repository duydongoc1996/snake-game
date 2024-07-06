import { Direction, GameCell, GameCellType, GameState } from "../types";

export default function Cell(props: { gameState: GameState; cell: GameCell }) {
  const buildHead = (gameState: GameState) =>
    ({
      [Direction.UP]: <span>&#9650;</span>,
      [Direction.DOWN]: <span>&#9660;</span>,
      [Direction.LEFT]: <span>&#9668;</span>,
      [Direction.RIGHT]: <span>&#9658;</span>,
    }[gameState.snake.direction]);

  const buildCell = (gameState: GameState, cell: GameCell) =>
    ({
      [GameCellType.EMPTY]: <span></span>,
      [GameCellType.HEAD]: (
        <span className="text-4xl">{buildHead(gameState)}</span>
      ),
      [GameCellType.BODY]: <span>&#11044;</span>,
      [GameCellType.TAIL]: <span>&#11044;</span>,
      [GameCellType.BAIT]: <span>&#x2B24;</span>,
    }[cell.type]);

  return (
    <td className="w-10 h-10 border border-gray-300 text-black text-center justify-center text-2xl">
      {buildCell(props.gameState, props.cell)}
    </td>
  );
}
