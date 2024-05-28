import {
    combineReducers,
    configureStore,
    Store,
    Reducer,
  } from "@reduxjs/toolkit";
  
import { GoalType } from "@/app/types/GoalType";
import goalReducer from "./slices/goal/goalSlice";
  interface Action {
    type: string;
    payload: any;
  };
  
  interface State {
    goal: GoalType;
  };
  
  const rootReducer: Reducer<State, Action> = combineReducers<State>({
    goal: goalReducer,
  }); 
  
  const store: Store<State, Action> = configureStore({
    reducer: rootReducer,
  });
  
  export type RootState = ReturnType<typeof rootReducer>;
  export type AppDispatch = typeof store.dispatch;
  
  export default store;
  