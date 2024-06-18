import { useState, useRef } from "react";
import { ElementType } from "@/app/types/DrawingTypes";

export const useHistory = (initialState: ElementType[]) => {
  const [index, setIndex] = useState<number>(0);
  const [history, setHistory] = useState<ElementType[][]>([initialState]);
  const prevHistoryRef = useRef<ElementType[][]>(history);

  const setState = (
    action: ElementType[] | ((current: ElementType[]) => ElementType[]),
    overwrite: boolean = false
  ) => {
    const newState =
      typeof action === "function" ? action(history[index]) : action;

    if (overwrite) {
      const historyCopy = [...history];
      historyCopy[index] = newState;
      if (JSON.stringify(historyCopy) !== JSON.stringify(prevHistoryRef.current)) {
        setHistory(historyCopy);
        prevHistoryRef.current = historyCopy;
      }
    } else {
      const updatedState = [...history].slice(0, index + 1);
      const newHistory = [...updatedState, newState];
      setHistory(newHistory);
      setIndex((prevState) => prevState + 1);
      prevHistoryRef.current = newHistory;
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
