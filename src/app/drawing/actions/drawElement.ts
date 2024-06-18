import { RoughCanvas } from "roughjs/bin/canvas";
import { ElementType } from "@/app/types/DrawingTypes";
import getStroke from "perfect-freehand";
import { getSvgPathFromStroke } from "../retrieval/getSvgPathFromStroke";

export const drawElement = (
  roughCanvas: RoughCanvas,
  context: CanvasRenderingContext2D,
  element: ElementType,
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
      break;
  }
};
