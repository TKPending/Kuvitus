import { Coordinates } from "@/app/types/DrawingTypes";

export const getResizedCoordinates = (
  clientX: number,
  clientY: number,
  positionOnElement: string | null | undefined,
  coordinates: Coordinates
) => {
  const { x1, y1, x2, y2 } = coordinates;

  switch (positionOnElement) {
    case "tl":
    case "start":
      return { x1: clientX, y1: clientY, x2, y2 };
    case "tr":
      return { x1, y1: clientY, x2: clientX, y2 };
    case "bl":
      return { x1: clientX, y1, x2, y2: clientY };
    case "br":
    case "end":
      return { x1, y1, x2: clientX, y2: clientY };
    default:
      return { x1, y1, x2, y2 };
  }
};
