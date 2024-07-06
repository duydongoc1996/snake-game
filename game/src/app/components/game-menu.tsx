import { GameState } from "../types";

export default function GameMenu(props: {
  width: number;
  height: number;
  gameState: GameState;
  onStart: () => void;
  onChangeHeight: (height: number) => void;
  onChangeWidth: (width: number) => void;
}) {
  return (
    <div className="flex p-4 bg-white-200">
      <h2 className="pt-2 h-10">Game size: </h2>
      <input
        type="number"
        placeholder="Height"
        className="ml-2 w-20 h-10 text-black text-center"
        value={props.height}
        onChange={(e) => props.onChangeHeight(Number(e.target.value))}
        min={3}
        max={20}
      />
      <h2 className="pt-2 h-10">x</h2>
      <input
        type="number"
        placeholder="Width"
        className="w-20 h-10 text-black text-center"
        value={props.width}
        onChange={(e) => props.onChangeWidth(Number(e.target.value))}
        min={3}
        max={20}
      />

      <button
        className="ml-2 w-20 h-10 bg-green-500 text-white rounded-md"
        onClick={props.onStart}
      >
        Start
      </button>
      <button className="ml-2 w-20 h-10 bg-green-500 text-white rounded-md text-center">
        {props.gameState.timer.time}s
      </button>
    </div>
  );
}
