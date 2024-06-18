import { ElementType } from "@/app/types/DrawingTypes";

const distance = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
};

const nearPoint = (
  x: number,
  y: number,
  x1: number,
  y1: number,
  area: string
) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? area : null;
};

const onLine = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x: number,
  y: number,
  space: number = 1
) => {
  const a = { x: x1, y: y1 };
  const b = { x: x2, y: y2 };
  const c = { x, y };
  const offset = distance(a, b) - (distance(a, c) + distance(b, c));

  return Math.abs(offset) < space ? "inside" : null;
};

const positionWithinElement = (x: number, y: number, element: ElementType) => {
  const { type, x1, x2, y1, y2 } = element;

  if (type === "rectangle") {
    const topLeft = nearPoint(x, y, x1, y1, "tl");
    const topRight = nearPoint(x, y, x2, y1, "tr");
    const bottomLeft = nearPoint(x, y, x1, y2, "bl");
    const bottomRight = nearPoint(x, y, x2, y2, "br");

    const inside = x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;

    return topLeft || topRight || bottomLeft || bottomRight || inside;
  } else if (type === "pencil") {
    const betweenAnyPoint = element.points!.some((point, index) => {
      const nextPoint = element.points![index + 1];
      if (!nextPoint) return false;
      return (
        onLine(point.x, point.y, nextPoint.x, nextPoint.y, x, y, 5) != null
      );
    });

    return betweenAnyPoint ? "inside" : null;
  } else {
    const on = onLine(x1, y1, x2, y2, x, y);
    const start = nearPoint(x, y, x1, y1, "start");
    const end = nearPoint(x, y, x2, y2, "end");

    return start || end || on;
  }
};

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
