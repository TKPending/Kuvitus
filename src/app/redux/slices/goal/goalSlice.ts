import { GoalType } from "@/app/types/GoalType";
import { createSlice } from "@reduxjs/toolkit";
import {
  addToGoalTagsReducer,
  updateGoalCompleteDateReducer,
  loadGoalReducer,
  processGoalDepthReducer,
  removeFromGoalTagsReducer,
  updateGoalDescriptionReducer,
  updateGoalStatusReducer,
  updateGoalTitleReducer,
  updateGoalDueDateReducer,
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
  updateSubGoalCompleteDateReducer,
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
  completeDate: "",
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
    setGoalDueDate: updateGoalDueDateReducer,
    setCompleteDate: updateGoalCompleteDateReducer,

    setSubGoalFocus: subGoalFocusedReducer,
    removeSubGoal: removeSubGoalReducer,
    addSubGoal: addSubGoalReducer,
    setSubGoalTitle: updateSubGoalTitleReducer,
    setSubGoalDetails: updateSubGoalDescriptionReducer,
    addSubGoalTag: addSubGoalTagReducer,
    removeSubGoalTag: removeTagFromSubGoalReducer,
    setSubGoalStatus: updateSubGoalStatusReducer,
    setSubGoalDueDate: updateSubGoalDueDateReducer,
    setSubGoalCompleteDate: updateSubGoalCompleteDateReducer,

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
  setGoalDueDate,
  setCompleteDate,

  setSubGoalFocus,
  removeSubGoal,
  addSubGoal,
  setSubGoalTitle,
  setSubGoalDetails,
  addSubGoalTag,
  removeSubGoalTag,
  setSubGoalStatus,
  setSubGoalDueDate,
  setSubGoalCompleteDate,

  setDrawingTool,
  setCanvasError,
  setCanvasErrorMessage,
  setDeleteOptionVisible,
  deleteAllElements,
} = goalSlice.actions;

export default goalSlice.reducer;
