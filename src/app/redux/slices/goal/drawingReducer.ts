import { PayloadAction } from "@reduxjs/toolkit";
import { GoalType } from "@/app/types/GoalType";
import { DrawingType } from "@/app/types/DrawingType";
import { serializeDrawingElement } from "@/app/util/serializeDrawingElement";

export const addDrawingElementReducer = (
  state: GoalType,
  action: PayloadAction<DrawingType>
) => {
  state.drawingElements.push(serializeDrawingElement(action.payload));
};

export const updateDrawingElementReducer = (
  state: GoalType,
  action: PayloadAction<DrawingType>
) => {
  const index = action.payload.id;
  state.drawingElements[index] = serializeDrawingElement(action.payload);
};
