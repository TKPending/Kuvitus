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
} from "./goalReducer";
import {
  subGoalFocusedReducer,
  removeSubGoalReducer,
  addSubGoalReducer,
  updateSubGoalTitleReducer,
  updateSubGoalDescriptionReducer,
  removeTagFromSubGoalReducer,
  addSubGoalTagReducer,
  updateSubGoalStatusReducer,
  updateSubGoalDueDateReducer
}  from "./subGoalReducer"
import { addDrawingElementReducer, updateDrawingElementReducer } from "./drawingReducer";

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
  drawingElements: [],
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
    setSubGoalTitle: updateSubGoalTitleReducer,
    setSubGoalDetails: updateSubGoalDescriptionReducer,
    addSubGoalTag: addSubGoalTagReducer,
    removeSubGoalTag: removeTagFromSubGoalReducer,
    setSubGoalStatus: updateSubGoalStatusReducer,
    setSubGoalDueDate: updateSubGoalDueDateReducer,

    setDrawingElements: addDrawingElementReducer,
    updateDrawingElements: updateDrawingElementReducer,
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
  setSubGoalTitle,
  setSubGoalDetails,
  addSubGoalTag,
  removeSubGoalTag,
  setSubGoalStatus,
  setSubGoalDueDate,

  setDrawingElements,
  updateDrawingElements,
} = goalSlice.actions;

export default goalSlice.reducer;
