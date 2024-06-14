import { PayloadAction } from "@reduxjs/toolkit";
import { GoalType } from "@/app/types/GoalType";
import { DrawingType, DrawingToolType } from "@/app/types/DrawingTypes";

export const updateDrawingToolReducer = (
  state: GoalType,
  action: PayloadAction<DrawingToolType>
) => {
  state.drawingToolType = action.payload;
};
