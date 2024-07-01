import { GoalType } from "@/app/types/GoalType";
import { PayloadAction } from "@reduxjs/toolkit";

export const subGoalFocusedReducer = (
  state: GoalType,
  action: PayloadAction<string>
) => {
  state.subGoals = state.subGoals.map((goal) => {
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
  state.subGoals = state.subGoals.filter(
    (goal) => goal.subUID !== action.payload
  );
};

export const removeAllSubGoalsReducer = (
  state: GoalType,
) => {
  state.subGoals = [];
};

export const addSubGoalReducer = (
  state: GoalType,
  action: PayloadAction<string>
) => {
  state.subGoals.push({
    subUID: action.payload,
    subTitle: "Enter goal title",
    subDetails: "Enter details about the subgoal you want to achieve",
    subStatus: 2,
    subTags: [],
    subDueDate: "",
    subCompleteDate: "",
    isPressed: false,
  });
};

export const updateSubGoalTitleReducer = (
  state: GoalType,
  action: PayloadAction<{ subUID: string; newTitle: string }>
) => {
  const AP = action.payload;

  state.subGoals = state.subGoals.map((goal) => {
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

  state.subGoals = state.subGoals.map((goal) => {
    if (goal.subUID === AP.subUID) {
      return { ...goal, subDetails: AP.newDesc };
    }
    return goal;
  });
};

export const removeTagFromSubGoalReducer = (
  state: GoalType,
  action: PayloadAction<{ subUID: string | undefined; tagToRemove: string }>
) => {
  const AP = action.payload;
  if (!AP.subUID) {
    return;
  }

  state.subGoals = state.subGoals.map((goal) => {
    if (goal.subUID === AP.subUID) {
      const updatedTags: string[] = goal.subTags.filter(
        (tags) => tags !== AP.tagToRemove
      );

      return { ...goal, subTags: updatedTags };
    }
    return goal;
  });
};

export const addSubGoalTagReducer = (
  state: GoalType,
  action: PayloadAction<{ subUID: string | undefined; tagToAdd: string }>
) => {
  const AP = action.payload;
  if (!AP.subUID) {
    return;
  }

  state.subGoals = state.subGoals.map((goal) => {
    if (goal.subUID === AP.subUID) {
      return { ...goal, subTags: [...goal.subTags, AP.tagToAdd] };
    }
    return goal;
  });
};

export const updateSubGoalStatusReducer = (
  state: GoalType,
  action: PayloadAction<{ subUID: string; newStatus: number }>
) => {
  const AP = action.payload;

  state.subGoals = state.subGoals.map((goal) => {
    if (goal.subUID === AP.subUID) {
      return { ...goal, subStatus: AP.newStatus };
    }
    return goal;
  });
};

export const updateSubGoalDueDateReducer = (
  state: GoalType,
  action: PayloadAction<{ subUID: string; newDate: string }>
) => {
  const AP = action.payload;

  state.subGoals = state.subGoals.map((goal) => {
    if (goal.subUID === AP.subUID) {
      return { ...goal, subDueDate: AP.newDate };
    }
    return goal;
  });
};

export const updateSubGoalCompleteDateReducer = (
  state: GoalType,
  action: PayloadAction<{ subUID: string; completeDate: string }>
) => {
  const AP = action.payload;

  state.subGoals = state.subGoals.map((goal) => {
    if (goal.subUID === AP.subUID) {
      return { ...goal, subCompleteDate: AP.completeDate };
    }
    return goal;
  });
};
