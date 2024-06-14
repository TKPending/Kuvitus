import rough from "roughjs";
import { RoughGenerator } from "roughjs/bin/generator";

const generator: RoughGenerator = rough.generator();

export const createElement = (
  id: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  elementType: string
) => {
  const roughElement = elementType === "line" ? generator.line(x1, y1, x2, y2) : generator.rectangle(x1, y1, x2 - x1, y2 - y1);

  return { id,  x1, y1, x2, y2, roughElement };
};
