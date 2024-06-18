import rough from "roughjs";
import { Coordinates } from "@/app/types/DrawingTypes";

export const createElement = (
  id: number,
  coordinates: Coordinates,
  tool: string
) => {
  const generator = rough.generator();

  const { x1, x2, y1, y2 } = coordinates;
  const roughElement =
    tool === "line"
      ? generator.line(x1, y1, x2, y2)
      : generator.rectangle(x1, y1, x2 - x1, y2 - y1);

  return { id, type: tool, ...coordinates, roughElement };
};
