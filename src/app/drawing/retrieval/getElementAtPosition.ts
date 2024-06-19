import { ElementType } from "@/app/types/DrawingTypes";
import { positionWithinElement } from "../util/positionWithinElement";

export const getElementAtPosition = (
  x: number,
  y: number,
  elements: ElementType[]
) => {
  return elements
    .map((element) => ({
      ...element,
      position: positionWithinElement(x, y, element),
    }))
    .find((element) => element.position !== null);
};
