import { PayloadAction } from "@reduxjs/toolkit";
import { getRandomPosition } from "@/app/util/getRandomPosition";
import { LocalGoalType } from "@/app/types/LocalGoalType";
import { LocalGoalState } from "./localGoalsSlice";

export const addLocalGoalReducer = (
  state: LocalGoalState,
  action: PayloadAction<LocalGoalType>
) => {
  const AP = action.payload;

  state.goals.push({
    goal: AP.goal,
    position: AP.position,
    velocity: AP.velocity,
    isFocused: AP.isFocused,
  });
};

export const removeLocalGoalReducer = (
  state: LocalGoalState,
  action: PayloadAction<string>
) => {
  state.goals = state.goals.filter(
    (goal: LocalGoalType) => goal.goal.goalUID !== action.payload
  );
};

export const localGoalFocusedReducer = (
  state: LocalGoalState,
  action: PayloadAction<string>
) => {
  state.goals = state.goals.map((goal: LocalGoalType) => {
    if (goal.goal.goalUID === action.payload) {
        state.blockedProximity = goal.position;
      return { ...goal, isFocused: true };
    }
    return goal;
  });
};

export const localGoalUnfocusedReducer = (
  state: LocalGoalState,
  action: PayloadAction<string>
) => {
  state.goals = state.goals.map((goal: LocalGoalType) => {
    if (goal.goal.goalUID === action.payload) {
        state.blockedProximity = { x: 0, y: 0, t: 0, b: 0 };
      return { ...goal, isFocused: false };
    }
    return goal;
  });
};

export const updateLocalGoalsPositionReducer = (
    state: LocalGoalState,
) => {
    state.goals.forEach((goal: LocalGoalType) => {
        if (goal.isFocused) {
            return;
        }

        let { x, y, t, b } = goal.position;
        let { vx, vy, vt, vb } = goal.velocity;

        // Calculate the distance between the goal and the blockedProximity
        const distanceX = Math.abs(x - state.blockedProximity.x);
        const distanceY = Math.abs(y - state.blockedProximity.y);
        const distanceT = Math.abs(t - state.blockedProximity.t);
        const distanceB = Math.abs(b - state.blockedProximity.b);

        // Check if the goal is within a certain proximity to the blockedProximity
        const proximityThreshold = 50; // Adjust this threshold as needed
        if (
            distanceX < proximityThreshold ||
            distanceY < proximityThreshold ||
            distanceT < proximityThreshold ||
            distanceB < proximityThreshold
        ) {
            // Push away the goal from the blockedProximity
            if (x < state.blockedProximity.x) vx *= -1;
            if (x > state.blockedProximity.x) vx *= 1;
            if (y < state.blockedProximity.y) vy *= -1;
            if (y > state.blockedProximity.y) vy *= 1;
            if (t < state.blockedProximity.t) vt *= -1;
            if (t > state.blockedProximity.t) vt *= 1;
            if (b < state.blockedProximity.b) vb *= -1;
            if (b > state.blockedProximity.b) vb *= 1;
        }

        // Update the position and velocity of the goal
        x += vx;
        y += vy;
        t += vt;
        b += vb;

        // Reverse velocity if the goal reaches the screen boundaries
        if (x < 0 || x > window.innerWidth - 10) vx *= -1;
        if (y < 0 || y > window.innerHeight - 10) vy *= -1;
        if (t < 0 || t > window.innerHeight - 10) vt *= -1;
        if (b < 0 || b > window.innerHeight - 10) vb *= -1;

        // Update the goal's position and velocity
        goal.position = { x, y, t, b };
        goal.velocity = { vx, vy, vt, vb };
    });
};

