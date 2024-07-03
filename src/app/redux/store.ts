import {
  combineReducers,
  configureStore,
  Store,
  Reducer,
} from "@reduxjs/toolkit";

import { GoalType } from "@/app/types/GoalType";
import { LocalGoalStateType } from "@/app/types/LocalGoalStateType";
import localGoalsReducer from "./slices/localGoals/localGoalsSlice";
import goalReducer from "./slices/goal/goalSlice";

interface Action {
  type: string;
  payload: any;
}

interface State {
  goal: GoalType;
  localGoals: LocalGoalStateType;
}

const rootReducer: Reducer<State, Action> = combineReducers<State>({
  goal: goalReducer,
  localGoals: localGoalsReducer,
});

const store: Store<State, Action> = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
