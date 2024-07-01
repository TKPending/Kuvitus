import { createSlice } from "@reduxjs/toolkit";
import {
  addLocalGoalReducer,
  addSessionGoalsReducer,
  goalDraggedPositionReducer,
  goalDraggedReducer,
  localGoalFocusedReducer,
  localGoalUnfocusedReducer,
  removeAllLocalGoalsReducer,
  removeLocalGoalReducer,
  updateLocalGoalsPositionReducer,
} from "./localGoalsReducer";
import { LocalGoalStateType } from "@/app/types/LocalGoalStateType";

const initialState: LocalGoalStateType = {
  goals: [],
  blockedProximity: { x: 0, y: 0, t: 0, b: 0 },
};

const localGoalSlice = createSlice({
  name: "localGoal",
  initialState,
  reducers: {
    addLocalGoal: addLocalGoalReducer,
    addSessionGoals: addSessionGoalsReducer,
    removeLocalGoal: removeLocalGoalReducer,
    removeAllLocalGoals: removeAllLocalGoalsReducer,
    setLocalGoalFocused: localGoalFocusedReducer,
    setLocalGoalUnfocused: localGoalUnfocusedReducer,
    updateLocalPositions: updateLocalGoalsPositionReducer,
    setLocalGoalDrag: goalDraggedReducer,
    setDragLocalPosition: goalDraggedPositionReducer,
  },
});

export const {
  addLocalGoal,
  addSessionGoals,
  removeLocalGoal,
  removeAllLocalGoals,
  setLocalGoalFocused,
  setLocalGoalUnfocused,
  updateLocalPositions,
  setLocalGoalDrag,
  setDragLocalPosition,
} = localGoalSlice.actions;

export default localGoalSlice.reducer;
