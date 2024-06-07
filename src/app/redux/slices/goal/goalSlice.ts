import { GoalType } from "@/app/types/GoalType";
import { createSlice } from "@reduxjs/toolkit";
import {
  addToGoalTagsReducer,
  includeGoalDateReducer,
  loadGoalReducer,
  processGoalDepthReducer,
  removeFromGoalTagsReducer,
  updateGoalDescriptionReducer,
  updateGoalStatusReducer,
  updateGoalTitleReducer,
  subGoalFocusedReducer,
  removeSubGoalReducer,
  addSubGoalReducer,
} from "./goalReducer";

const UNCOMPLETE = 0;

const initialState: GoalType = {
  goalUID: "",
  goalTitle: "",
  goalDescription: "",
  goalStatus: UNCOMPLETE,
  goalDepth: "basic",
  goalTags: [],
  goalDueDate: "",
  goalSteps: [],
};

const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    setGoal: loadGoalReducer,
    setGoalTitle: updateGoalTitleReducer,
    setGoalDescription: updateGoalDescriptionReducer,
    setGoalStatus: updateGoalStatusReducer,
    setGoalProgression: processGoalDepthReducer,
    setGoalTags: addToGoalTagsReducer,
    removeGoalTag: removeFromGoalTagsReducer,
    setGoalDate: includeGoalDateReducer,
    setSubGoalFocus: subGoalFocusedReducer,
    removeSubGoal: removeSubGoalReducer,
    addSubGoal: addSubGoalReducer,
  },
});

export const {
  setGoal,
  setGoalTitle,
  setGoalDescription,
  setGoalStatus,
  setGoalProgression,
  setGoalTags,
  removeGoalTag,
  setGoalDate,
  setSubGoalFocus,
  removeSubGoal,
  addSubGoal,
} = goalSlice.actions;

export default goalSlice.reducer;
