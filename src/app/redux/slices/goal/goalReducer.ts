import { GoalType } from "@/app/types/GoalType";
import { PayloadAction } from "@reduxjs/toolkit";

export const loadGoalReducer = (
  state: GoalType,
  action: PayloadAction<GoalType>
) => {
  const AP = action.payload;
  state.uID = AP.uID;
  state.depth = AP.depth;
  state.description = AP.description;
  state.dueDate = AP.dueDate;
  state.status = AP.status;
  state.tags = AP.tags;
  state.title = AP.title;
  state.subGoals = AP.subGoals;
};

export const updateGoalTitleReducer = (
  state: GoalType,
  action: PayloadAction<string>
) => {
  state.title = action.payload;
};

export const updateGoalDescriptionReducer = (
  state: GoalType,
  action: PayloadAction<string>
) => {
  state.description = action.payload;
};

export const updateGoalStatusReducer = (
  state: GoalType,
  action: PayloadAction<number>
) => {
  state.status = action.payload;
};

export const processGoalDepthReducer = (
  state: GoalType,
  action: PayloadAction<"basic" | "medium" | "advanced">
) => {
  state.depth = action.payload;
};

export const addToGoalTagsReducer = (
  state: GoalType,
  action: PayloadAction<string>
) => {
  state.tags.push(action.payload);
};

export const removeFromGoalTagsReducer = (
  state: GoalType,
  action: PayloadAction<string>
) => {
  state.tags = state.tags.filter((tag) => tag !== action.payload);
};

export const includeGoalDateReducer = (
  state: GoalType,
  action: PayloadAction<string>
) => {
  state.dueDate = action.payload;
};
