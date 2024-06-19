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
  updateSubGoalDueDateReducer,
} from "./subGoalReducer";
import {
  canvasErrorMessageReducer,
  canvasErrorReducer,
  deleteOptionsReducer,
  deleteAllElementsReducer,
  updateDrawingToolReducer,
} from "./drawingReducer";

const UNCOMPLETE = 0;

const initialState: GoalType = {
  uID: "",
  title: "",
  description: "",
  status: UNCOMPLETE,
  depth: "basic",
  tags: [],
  dueDate: "",
  subGoals: [],
  drawingElements: [],
  drawingToolType: {
    type: "selection",
    icon: "",
  },
  drawingCanvas: {
    isError: false,
    errorMessage: "",
    displayDeleteOption: false,
    deleteAll: false,
  },
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

    setDrawingTool: updateDrawingToolReducer,
    setCanvasError: canvasErrorReducer,
    setCanvasErrorMessage: canvasErrorMessageReducer,
    setDeleteOptionVisible: deleteOptionsReducer,
    deleteAllElements: deleteAllElementsReducer,
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

  setDrawingTool,
  setCanvasError,
  setCanvasErrorMessage,
  setDeleteOptionVisible,
  deleteAllElements,
} = goalSlice.actions;

export default goalSlice.reducer;
