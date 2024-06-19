import { nearPoint } from "./nearPoint";
import { onLine } from "./onLine";
import { ElementType } from "@/app/types/DrawingTypes";

export const positionWithinElement = (x: number, y: number, element: ElementType) => {
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
    } else if (type === "text") {
        return x >= x1 && x <= x2 && y >= y1 && y <= y2 ? "inside" : null;
    } else {
      const on = onLine(x1, y1, x2, y2, x, y);
      const start = nearPoint(x, y, x1, y1, "start");
      const end = nearPoint(x, y, x2, y2, "end");
  
      return start || end || on;
    }
  };