import { GoalType } from "@/app/types/GoalType";
import { SubType } from "@/app/types/SubType";
import { PayloadAction } from "@reduxjs/toolkit";

export const subGoalFocusedReducer = (
  state: GoalType,
  action: PayloadAction<string>
) => {
  state.goalSteps = state.goalSteps.map((goal) => {
    if (goal.subUID === action.payload) {
      return { ...goal, isPressed: !goal.isPressed };
    }
    return goal;
  });
};

export const removeSubGoalReducer = (
  state: GoalType,
  action: PayloadAction<string>
) => {
  state.goalSteps = state.goalSteps.filter(
    (goal) => goal.subUID !== action.payload
  );
};

export const addSubGoalReducer = (
  state: GoalType,
  action: PayloadAction<string>
) => {
  state.goalSteps.push({
    subUID: action.payload,
    subTitle: "",
    subDetails: "",
    subStatus: 0,
    subTags: [],
    subDueDate: "",
    isPressed: false,
  });
};

export const updateSubGoalTitleReducer = (
  state: GoalType,
  action: PayloadAction<{ subUID: string; newTitle: string }>
) => {
  const AP = action.payload;

  state.goalSteps = state.goalSteps.map((goal) => {
    if (goal.subUID === AP.subUID) {
      return { ...goal, subTitle: AP.newTitle };
    }
    return goal;
  });
};

export const updateSubGoalDescriptionReducer = (
  state: GoalType,
  action: PayloadAction<{ subUID: string; newDesc: string }>
) => {
  const AP = action.payload;

  state.goalSteps = state.goalSteps.map((goal) => {
    if (goal.subUID === AP.subUID) {
      return { ...goal, subDetails: AP.newDesc };
    }
    return goal;
  });
};
