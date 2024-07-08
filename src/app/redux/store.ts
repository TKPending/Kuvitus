import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import { GoalType } from "@/app/types/GoalType";
import { LocalGoalStateType } from "@/app/types/LocalGoalStateType";
import localGoalsReducer from "./slices/localGoals/localGoalsSlice";
import goalReducer from "./slices/goal/goalSlice";

interface State {
  goal: GoalType;
  localGoals: LocalGoalStateType;
}

const rootReducer: Reducer<State> = combineReducers({
  goal: goalReducer,
  localGoals: localGoalsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
