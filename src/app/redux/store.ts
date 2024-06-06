import {
  combineReducers,
  configureStore,
  Store,
  Reducer,
} from "@reduxjs/toolkit";

import { GoalType } from "@/app/types/GoalType";
import localGoalsReducer, {
  LocalGoalState,
} from "./slices/localGoals/localGoalsSlice";
import goalReducer from "./slices/goal/goalSlice";


interface Action {
  type: string;
  payload: any;
}

interface State {
  goal: GoalType;
  localGoals: LocalGoalState;
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
