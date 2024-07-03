import { RoughCanvas } from "roughjs/bin/canvas";
import { ElementType } from "@/app/types/DrawingTypes";
import getStroke from "perfect-freehand";
import { getSvgPathFromStroke } from "@/app/drawing/retrieval/getSvgPathFromStroke";
import { setCanvasErrorMessage } from "@/app/redux/slices/goal/goalSlice";
import { Dispatch, UnknownAction } from "@reduxjs/toolkit";

export const drawElement = (
  roughCanvas: RoughCanvas,
  context: CanvasRenderingContext2D,
  element: ElementType,
  dispatch: Dispatch<UnknownAction>,
) => {
  switch (element.type) {
    case "line":
    case "rectangle":
      roughCanvas.draw(element.roughElement);
      break;
    case "pencil":
      if (element.points) {
        const stroke = getSvgPathFromStroke(getStroke(element.points, {
          size: 4,

        }));
        context.fill(new Path2D(stroke));
      }
      break;
    case "text":
      context.textBaseline = "top"
      context.font = "16px Arial";
      const text = element.text || "";
      context.fillText(text, element.x1, element.y1);
      break;
    default:
      const errorMessage: string = "Problem creating a new element";
      dispatch(setCanvasErrorMessage(errorMessage));
      break;
  }
};
