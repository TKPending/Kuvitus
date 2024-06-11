import { Drawable } from "roughjs/bin/core";

export interface DrawingType {
  id: number,
  roughElement: Drawable,
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};
