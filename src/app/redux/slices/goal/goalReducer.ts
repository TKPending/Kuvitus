import { GoalType } from "@/app/types/GoalType";
import { SubType } from "@/app/types/SubType";
import { PayloadAction } from "@reduxjs/toolkit";

export const loadGoalReducer = (
  state: GoalType,
  action: PayloadAction<GoalType>
) => {
  const AP = action.payload;
  state.goalUID = AP.goalUID;
  state.goalDepth = AP.goalDepth;
  state.goalDescription = AP.goalDescription;
  state.goalDueDate = AP.goalDueDate;
  state.goalStatus = AP.goalStatus;
  state.goalTags = AP.goalTags;
  state.goalTitle = AP.goalTitle;
  state.goalSteps = AP.goalSteps;
};

export const updateGoalTitleReducer = (
  state: GoalType,
  action: PayloadAction<string>
) => {
  state.goalTitle = action.payload;
};

export const updateGoalDescriptionReducer = (
  state: GoalType,
  action: PayloadAction<string>
) => {
  state.goalDescription = action.payload;
};

export const updateGoalStatusReducer = (
  state: GoalType,
  action: PayloadAction<number>
) => {
  state.goalStatus = action.payload;
};

export const processGoalDepthReducer = (
  state: GoalType,
  action: PayloadAction<"basic" | "medium" | "advanced">
) => {
  state.goalDepth = action.payload;
};

export const addToGoalTagsReducer = (
  state: GoalType,
  action: PayloadAction<string>
) => {
  state.goalTags.push(action.payload);
};

export const removeFromGoalTagsReducer = (
  state: GoalType,
  action: PayloadAction<string>
) => {
  state.goalTags = state.goalTags.filter((tag) => tag !== action.payload);
};

export const includeGoalDateReducer = (
  state: GoalType,
  action: PayloadAction<string>
) => {
  state.goalDueDate = action.payload;
};
