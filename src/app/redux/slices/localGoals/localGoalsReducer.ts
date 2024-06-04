import { PayloadAction } from "@reduxjs/toolkit";
import { LocalGoalType } from "@/app/types/LocalGoalType";
import { LocalGoalState } from "./localGoalsSlice";
import { PositionType } from "@/app/types/PositionType";

export const addLocalGoalReducer = (state: LocalGoalState, action: PayloadAction<LocalGoalType>) => {
  const AP = action.payload;
  state.goals.push({
    goal: AP.goal,
    position: AP.position,
    velocity: AP.velocity,
    isFocused: AP.isFocused,
    isDragged: AP.isDragged,
  });
};

export const removeLocalGoalReducer = (state: LocalGoalState, action: PayloadAction<string>) => {
  state.goals = state.goals.filter(goal => goal.goal.goalUID !== action.payload);
};

export const localGoalFocusedReducer = (state: LocalGoalState, action: PayloadAction<string>) => {
  state.goals = state.goals.map(goal => {
    if (goal.goal.goalUID === action.payload) {
      state.blockedProximity = goal.position;
      return { ...goal, isFocused: true };
    }
    return goal;
  });
};

export const localGoalUnfocusedReducer = (state: LocalGoalState, action: PayloadAction<string>) => {
  state.goals = state.goals.map(goal => {
    if (goal.goal.goalUID === action.payload) {
      state.blockedProximity = { x: 0, y: 0, t: 0, b: 0 };
      return { ...goal, isFocused: false };
    }
    return goal;
  });
};

export const updateLocalGoalsPositionReducer = (state: LocalGoalState) => {
  state.goals.forEach(goal => {
    if (goal.isFocused || goal.isDragged) return;

    let { x, y, t, b } = goal.position;
    let { vx, vy, vt, vb } = goal.velocity;

    const distanceX = Math.abs(x - state.blockedProximity.x);
    const distanceY = Math.abs(y - state.blockedProximity.y);
    const distanceT = Math.abs(t - state.blockedProximity.t);
    const distanceB = Math.abs(b - state.blockedProximity.b);

    const proximityThreshold = 50;
    if (distanceX < proximityThreshold || distanceY < proximityThreshold || distanceT < proximityThreshold || distanceB < proximityThreshold) {
      if (x < state.blockedProximity.x) vx *= -1;
      if (x > state.blockedProximity.x) vx *= 1;
      if (y < state.blockedProximity.y) vy *= -1;
      if (y > state.blockedProximity.y) vy *= 1;
      if (t < state.blockedProximity.t) vt *= -1;
      if (t > state.blockedProximity.t) vt *= 1;
      if (b < state.blockedProximity.b) vb *= -1;
      if (b > state.blockedProximity.b) vb *= 1;
    }

    x += vx;
    y += vy;
    t += vt;
    b += vb;

    if (x < 0 || x > window.innerWidth - 10) vx *= -1;
    if (y < 0 || y > window.innerHeight - 10) vy *= -1;
    if (t < 0 || t > window.innerHeight - 10) vt *= -1;
    if (b < 0 || b > window.innerHeight - 10) vb *= -1;

    goal.position = { x, y, t, b };
    goal.velocity = { vx, vy, vt, vb };
  });
};

export const goalDraggedReducer = (state: LocalGoalState, action: PayloadAction<string>) => {
  state.goals = state.goals.map(goal => {
    if (goal.goal.goalUID === action.payload) {
      return { ...goal, isDragged: !goal.isDragged };
    }
    return goal;
  });
};

export const goalDraggedPositionReducer = (state: LocalGoalState, action: PayloadAction<{ UID: string, newPositions: PositionType }>) => {
  state.goals = state.goals.map(goal => {
    if (goal.goal.goalUID === action.payload.UID && goal.isDragged) {
      const { x, y, t, b } = goal.position;
      goal.position = {
        x: x + action.payload.newPositions.x,
        y: y + action.payload.newPositions.y,
        t: t - window.innerHeight + action.payload.newPositions.y,
        b: b - window.innerHeight + action.payload.newPositions.y
      };
    }
    return goal;
  });
};
