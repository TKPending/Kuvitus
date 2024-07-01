import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { ElementType } from "@/app/types/DrawingTypes";
import { deleteAllElements, specificDelete } from "@/app/redux/slices/goal/goalSlice";
import SessionService from "@/services/sessionStorage/SessionService";

export const useHistory = (initialState: ElementType[]) => {
  const dispatch = useDispatch();
  const goalUID: string = useSelector((state: RootState) => state.goal.uID);
  const deleteAll: boolean = useSelector((state: RootState) => state.goal.drawingCanvas.deleteAll);
  const elementToDelete: number | null = useSelector((state: RootState) => state.goal.drawingCanvas.specificDelete);
  const [index, setIndex] = useState<number>(0);
  const [history, setHistory] = useState<ElementType[][]>([initialState]);

  useEffect(() => {
    const deleteElements = () => {
      if (deleteAll) {
        setHistory(prevState => [...prevState.slice(0, index + 1), []]);
        setIndex(prevState => prevState + 1);

        dispatch(deleteAllElements(false));
        SessionService.updateValue(goalUID, "drawingElements", []);
      }
    }

    deleteElements();
  }, [deleteAll]);

  useEffect(() => {
    const deleteSpecificElement = () => {
      if (elementToDelete) {
        const newHistory = history[index].filter((element: ElementType) => element.id !== elementToDelete);
        setHistory(prevState => [...prevState, newHistory]);
        setIndex(prevState => prevState + 1);

        dispatch(specificDelete(null));
        SessionService.updateValue(goalUID, "drawingElements", newHistory);
      }
    }

    deleteSpecificElement();

  }, [elementToDelete])

  useEffect(() => {
    setHistory([initialState]);
  }, [initialState]);

  const updateSessionStorage = (history: ElementType[][]) => {
    const mostRecentVersion: ElementType[] = history[history.length - 1];
    SessionService.updateValue(goalUID, "drawingElements", mostRecentVersion);
  };

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
      updateSessionStorage(historyCopy);
    } else {
      const updatedState = [...history].slice(0, index + 1);
      setHistory([...updatedState, newState]);
      updateSessionStorage([...updatedState, newState]);
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
