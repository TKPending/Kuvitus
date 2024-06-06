import { GoalType } from "@/app/types/GoalType";
import { createSlice } from "@reduxjs/toolkit";
import { addToGoalTagsReducer, includeGoalDateReducer, processGoalDepthReducer, removeFromGoalTagsReducer, updateGoalDescriptionReducer, updateGoalStatusReducer, updateGoalTitleReducer } from "./goalReducer";

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
    setGoalTitle: updateGoalTitleReducer,
    setGoalDescription: updateGoalDescriptionReducer,
    setGoalStatus: updateGoalStatusReducer,
    setGoalProgression: processGoalDepthReducer,
    setGoalTags: addToGoalTagsReducer,
    removeGoalTag: removeFromGoalTagsReducer,
    setGoalDate: includeGoalDateReducer,
  },
});

export const {
  setGoalTitle,
  setGoalDescription,
  setGoalStatus,
  setGoalProgression,
  setGoalTags,
  removeGoalTag,
  setGoalDate,
} = goalSlice.actions;

export default goalSlice.reducer;
