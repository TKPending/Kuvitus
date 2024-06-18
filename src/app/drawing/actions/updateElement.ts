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
  const elementsCopy = [...elements];
  
  switch (type) {
    case "line":
    case "rectangle":
      const updatedElement = createElement(id, { x1, y1, x2, y2 }, type);
      elementsCopy[id] = updatedElement;
      break;
    case "pencil":
      const existingPoints = elementsCopy[id].points || [];
      elementsCopy[id].points = [...existingPoints, { x: x2, y: y2 }];
      break;
    default:
      break;
  }

  setElements(elementsCopy, true);
};
