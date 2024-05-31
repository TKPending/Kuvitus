import { GoalType } from "./GoalType";

export interface LocalGoalType {
    goal: GoalType,
    position: { x: number, y: number, t: number, b: number },
    velocity: { vx: number, vy: number, vt: number, vb: number },
    isFocused: boolean,
};
