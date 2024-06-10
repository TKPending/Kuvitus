import { createSlice } from "@reduxjs/toolkit";
import {
  addLocalGoalReducer,
  goalDraggedPositionReducer,
  goalDraggedReducer,
  localGoalFocusedReducer,
  localGoalUnfocusedReducer,
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
    removeLocalGoal: removeLocalGoalReducer,
    setLocalGoalFocused: localGoalFocusedReducer,
    setLocalGoalUnfocused: localGoalUnfocusedReducer,
    updateLocalPositions: updateLocalGoalsPositionReducer,
    setLocalGoalDrag: goalDraggedReducer,
    setDragLocalPosition: goalDraggedPositionReducer,
  },
});

export const {
  addLocalGoal,
  removeLocalGoal,
  setLocalGoalFocused,
  setLocalGoalUnfocused,
  updateLocalPositions,
  setLocalGoalDrag,
  setDragLocalPosition,
} = localGoalSlice.actions;

export default localGoalSlice.reducer;
