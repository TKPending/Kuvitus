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
} = goalSlice.actions;

export default goalSlice.reducer;
