import { PayloadAction } from "@reduxjs/toolkit";
import { GoalType } from "@/app/types/GoalType";
import { DrawingType } from "@/app/types/DrawingType";

export const addDrawingElementReducer = (
  state: GoalType,
  action: PayloadAction<DrawingType>
) => {
  state.drawingElements.push(action.payload);
};

export const updateDrawingElementReducer = (
  state: GoalType,
  action: PayloadAction<DrawingType>
) => {
  const index: number = state.drawingElements.length - 1;
  const drawingElementsCopy: DrawingType[] = [...state.drawingElements];
  drawingElementsCopy[index] = action.payload;

  state.drawingElements = drawingElementsCopy;
};
