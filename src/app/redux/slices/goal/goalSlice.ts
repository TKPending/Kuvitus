import { GoalType } from "@/app/types/GoalType";
import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const {
} = goalSlice.actions;

export default goalSlice.reducer;
