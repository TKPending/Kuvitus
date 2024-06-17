import { createElement } from "./createElement";

export const updateElement = (
  id: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  type: string,
  elements: any[],
  setElements: (e: any[]) => void,
) => {
  const updatedElement = createElement(id, { x1, y1, x2, y2 }, type);

  const elementsCopy = [...elements];
  elementsCopy[id] = updatedElement;
  setElements(elementsCopy);
};
