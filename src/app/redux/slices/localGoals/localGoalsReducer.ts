import { PayloadAction } from "@reduxjs/toolkit";
import { LocalGoalType } from "@/app/types/LocalGoalType";
import { LocalGoalStateType } from "@/app/types/LocalGoalStateType";
import { PositionType } from "@/app/types/PositionType";

export const addLocalGoalReducer = (
  state: LocalGoalStateType,
  action: PayloadAction<LocalGoalType>
) => {
  const AP = action.payload;
  state.goals.push({
    goal: AP.goal,
    position: AP.position,
    velocity: AP.velocity,
    isFocused: AP.isFocused,
    isDragged: AP.isDragged,
    titleChange: AP.titleChange,
  });
};

export const addSessionGoalsReducer = (
  state: LocalGoalStateType,
  action: PayloadAction<LocalGoalType[]>
) => {
  state.goals = action.payload;
};

export const removeLocalGoalReducer = (
  state: LocalGoalStateType,
  action: PayloadAction<string>
) => {
  state.goals = state.goals.filter(
    (goal) => goal.goal.uID !== action.payload
  );
};

export const removeAllLocalGoalsReducer = (
  state: LocalGoalStateType
) => {
  state.goals = [];
};

export const localGoalFocusedReducer = (
  state: LocalGoalStateType,
  action: PayloadAction<string>
) => {
  state.goals = state.goals.map((goal) => {
    if (goal.goal.uID === action.payload) {
      state.blockedProximity = goal.position;
      return { ...goal, isFocused: true, titleChange: true };
    }
    return goal;
  });
};

export const localGoalUnfocusedReducer = (
  state: LocalGoalStateType,
  action: PayloadAction<string>
) => {
  state.goals = state.goals.map((goal) => {
    if (goal.goal.uID === action.payload) {
      state.blockedProximity = { x: 0, y: 0, t: 0, b: 0 };
      return { ...goal, isFocused: false, titleChange: false };
    }
    return goal;
  });
};

export const updateLocalGoalsPositionReducer = (state: LocalGoalStateType) => {
  state.goals.forEach((goal) => {
    if (goal.isFocused || goal.isDragged) return;

    let { x, y, t, b } = goal.position;
    let { vx, vy, vt, vb } = goal.velocity;

    const proximityThreshold = 50;
    const dx = x - state.blockedProximity.x;
    const dy = y - state.blockedProximity.y;
    const dt = t - state.blockedProximity.t;
    const db = b - state.blockedProximity.b;

    if (Math.abs(dx) < proximityThreshold) vx = Math.sign(dx) * Math.abs(vx);
    if (Math.abs(dy) < proximityThreshold) vy = Math.sign(dy) * Math.abs(vy);
    if (Math.abs(dt) < proximityThreshold) vt = Math.sign(dt) * Math.abs(vt);
    if (Math.abs(db) < proximityThreshold) vb = Math.sign(db) * Math.abs(vb);

    x += vx;
    y += vy;
    t += vt;
    b += vb;

    if (x < 0 || x > window.innerWidth - 64) vx *= -1; // Adjust for goal size
    if (y < 0 || y > window.innerHeight - 64) vy *= -1;
    if (t < 0 || t > window.innerHeight - 64) vt *= -1;
    if (b < 0 || b > window.innerHeight - 64) vb *= -1;

    goal.position = { x, y, t, b };
    goal.velocity = { vx, vy, vt, vb };
  });
};

export const goalDraggedReducer = (
  state: LocalGoalStateType,
  action: PayloadAction<string>
) => {
  state.goals = state.goals.map((goal) => {
    if (goal.goal.uID === action.payload) {
      return { ...goal, isDragged: !goal.isDragged };
    }
    return goal;
  });
};

export const goalDraggedPositionReducer = (
  state: LocalGoalStateType,
  action: PayloadAction<{ UID: string; newPositions: PositionType }>
) => {
  state.goals = state.goals.map((goal) => {
    if (goal.goal.uID === action.payload.UID && goal.isDragged) {
      const { x, y, t, b } = goal.position;
      goal.position = {
        x: x + action.payload.newPositions.x,
        y: y + action.payload.newPositions.y,
        t: t - window.innerHeight + action.payload.newPositions.y,
        b: b - window.innerHeight + action.payload.newPositions.y,
      };
    }
    return goal;
  });
};
