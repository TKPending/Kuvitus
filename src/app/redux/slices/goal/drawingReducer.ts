import { PayloadAction } from "@reduxjs/toolkit";
import { GoalType } from "@/app/types/GoalType";
import { DrawingType } from "@/app/types/DrawingType";

export const addDrawingElementReducer = (
  state: GoalType,
  action: PayloadAction<DrawingType>
) => {
  state.drawingElements.push(action.payload);
};
