export interface ElementType {
  id: number;
  roughElement: any;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface DrawingToolType {
  type: string;
  icon: any;
}

export const Tools = {
  pan: "pan",
  selection: "selection",
  rectangle: "rectangle",
  line: "line",
  pencil: "pencil",
  text: "text",
};
