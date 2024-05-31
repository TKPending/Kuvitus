import { LocalGoalType } from "@/app/types/LocalGoalType";
import { createSlice } from "@reduxjs/toolkit";
import { addLocalGoalReducer, localGoalFocusedReducer, localGoalUnfocusedReducer, removeLocalGoalReducer, updateLocalGoalsPositionReducer } from "./localGoalsReducer";


export interface LocalGoalState {
    goals: LocalGoalType[];
    blockedProximity: { x: number, y: number, t: number, b: number };
  }
  
  const initialState: LocalGoalState = {
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
  },
});

export const {
    addLocalGoal,
    removeLocalGoal,
    setLocalGoalFocused,
    setLocalGoalUnfocused,
    updateLocalPositions,
} = localGoalSlice.actions;

export default localGoalSlice.reducer;
