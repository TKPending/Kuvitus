import { DrawingType } from "@/app/types/DrawingType";

const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

export const selectElement = (
  canvasX: number,
  canvasY: number,
  elements: DrawingType[]
) => {
  return elements.find((element) => {
    const shape: string = element.roughElement.shape;

    if (shape === "rectangle") {
      const minX = Math.min(element.x1, element.x2);
      const maxX = Math.max(element.x1, element.x2);
      const minY = Math.min(element.y1, element.y2);
      const maxY = Math.max(element.y1, element.y2);

      return (
        canvasX > minX && canvasX <= maxX && canvasY > minY && canvasY <= maxY
      );
    } else {
      const a = { x: element.x1, y: element.y1 };
      const b = { x: element.x2, y: element.y2 };
      const c = { x: canvasX, y: canvasY };
      const offset = distance(a, b) - (distance(a, c) + distance(b, c));

      return Math.abs(offset) < 1;
    }
  });
};
