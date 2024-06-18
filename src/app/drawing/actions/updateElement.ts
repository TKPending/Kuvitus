import { ElementType } from "@/app/types/DrawingTypes";
import { createElement } from "./createElement";

export const updateElement = (
  id: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  type: string,
  elements: ElementType[],
  setElements: (e: ElementType[], overwrite?: boolean) => void
) => {
  const updatedElement = createElement(id, { x1, y1, x2, y2 }, type);
  const elementsCopy = [...elements];
  
  if (JSON.stringify(elementsCopy[id]) !== JSON.stringify(updatedElement)) {
    elementsCopy[id] = updatedElement;
    setElements(elementsCopy, true);
  }
};
