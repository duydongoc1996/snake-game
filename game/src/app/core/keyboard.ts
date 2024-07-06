export function addKeyboardListeners(action: {
  up: () => void;
  down: () => void;
  left: () => void;
  right: () => void;
}) {
  const handleKeyDown = (event: KeyboardEvent) => {
    const arrowKeys: { [key: string]: () => void } = {
      ArrowUp: action.up,
      ArrowDown: action.down,
      ArrowLeft: action.left,
      ArrowRight: action.right,
      default: () => {
        // Handle other keys, Do nothing
      },
    };

    return (arrowKeys[event.key] || arrowKeys["default"])();
  };

  // Add event listener
  window.addEventListener("keydown", handleKeyDown);

  // Cleanup function
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}
