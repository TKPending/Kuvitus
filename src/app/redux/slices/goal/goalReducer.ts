import { GoalType } from "@/app/types/GoalType";
import { PayloadAction } from "@reduxjs/toolkit";

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
    action: PayloadAction<0 | 1 | 2>
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
    state.goalTags = state.goalTags.filter(tag => tag !== action.payload);
};

export const includeGoalDateReducer = (
    state: GoalType,
    action: PayloadAction<string>
) => {
    state.goalDueDate = action.payload;
};
