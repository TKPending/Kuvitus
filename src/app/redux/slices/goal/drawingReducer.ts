import { PayloadAction } from "@reduxjs/toolkit";
import { GoalType } from "@/app/types/GoalType";
import { DrawingCanvas, DrawingToolsType } from "@/app/types/DrawingTypes";

export const updateDrawingToolReducer = (
  state: GoalType,
  action: PayloadAction<DrawingToolsType>
) => {
  state.drawingToolType = action.payload;
};

export const canvasErrorReducer = (
  state: GoalType,
  action: PayloadAction<boolean>
) => {
  state.drawingCanvas.isError = action.payload;
};


export const canvasErrorMessageReducer = (
  state: GoalType,
  action: PayloadAction<string>
) => {
  state.drawingCanvas.errorMessage = action.payload;
};


export const deleteOptionsReducer = (
  state: GoalType,
  action: PayloadAction<boolean>
) => {
  state.drawingCanvas.displayDeleteOption = action.payload;
};

export const deleteAllElementsReducer = (
  state: GoalType,
  action: PayloadAction<boolean>
) => {
  state.drawingCanvas.deleteAll = action.payload;
};