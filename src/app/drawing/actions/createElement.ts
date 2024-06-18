import rough from "roughjs";
import { Coordinates, ElementType } from "@/app/types/DrawingTypes";

export const createElement = (
  id: number,
  coordinates: Coordinates,
  tool: string
): ElementType => {
  const generator = rough.generator();
  const { x1, x2, y1, y2 } = coordinates;

  switch (tool) {
    case "line":
    case "rectangle":
      const roughElement =
        tool === "line"
          ? generator.line(x1, y1, x2, y2)
          : generator.rectangle(x1, y1, x2 - x1, y2 - y1);
      return { id, type: tool, ...coordinates, roughElement };
    case "pencil":
      return { id, type: tool, x1, y1, x2, y2, points: [{ x: x1, y: y1 }] };
    case "text": 
      return { id, type: tool, x1, y1, x2, y2, text: "" };
    default:
      throw new Error("Invalid tool type");
  }
};
