import { LocalGoalType } from "@/app/types/LocalGoalType";
import { createSlice } from "@reduxjs/toolkit";
import { addLocalGoalReducer, goalDraggedPositionReducer, goalDraggedReducer, localGoalFocusedReducer, localGoalUnfocusedReducer, removeLocalGoalReducer, updateLocalGoalsPositionReducer } from "./localGoalsReducer";
import { PositionType } from "@/app/types/PositionType";


export interface LocalGoalState {
    goals: LocalGoalType[];
    blockedProximity: PositionType;
  }
  
  const initialState: LocalGoalState = {
    goals: [],
    blockedProximity: { x: 0, y: 0 , t: 0, b: 0 },
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
