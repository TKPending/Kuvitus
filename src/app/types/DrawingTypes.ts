export interface Coordinates {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface DrawingToolsType {
  type: string;
  icon: any;
}

export interface ElementType {
  id: number;
  roughElement?: any;
  type: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  offsetX?: number;
  offsetY?: number;
  position?: string | null;
  points?: { x: number; y: number }[];
  text?: string;
  xOffsets?: number[];
  yOffsets?: number[];
};

export type ActionsType =
  | "selection"
  | "writing"
  | "drawing"
  | "moving"
  | "panning"
  | "resizing"
  | "none";

export interface DrawingCanvas {
  isError: boolean;
  errorMessage: string;
  displayDeleteOption: boolean;
  deleteAll: boolean;
  specificDelete: number | null;
};
