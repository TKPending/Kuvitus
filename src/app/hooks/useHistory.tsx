import { useState } from "react";
import { ElementType } from "@/app/types/DrawingTypes";

export const useHistory = (initialState: ElementType[]) => {
  const [index, setIndex] = useState<number>(0);
  const [history, setHistory] = useState<ElementType[][]>([initialState]);

  const setState = (
    action: ElementType[] | ((current: ElementType[]) => ElementType[]),
    overwrite: boolean = false
  ) => {
    const newState =
      typeof action === "function" ? action(history[index]) : action;

    if (overwrite) {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      setHistory(historyCopy);
    } else {
      const updatedState = [...history].slice(0, index + 1);
      setHistory([...updatedState, newState]);
      setIndex((prevState) => prevState + 1);
    }
  };

  const undo = () => index > 0 && setIndex((prevState) => prevState - 1);
  const redo = () => index < history.length - 1 && setIndex((prevState) => prevState + 1);

  return {
    elements: history[index],
    setElements: setState,
    undo,
    redo,
  };
};
