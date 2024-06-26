import { GoalType } from "./GoalType";
import { PositionType } from "./PositionType";

export interface LocalGoalType {
    goal: GoalType,
    position: PositionType,
    velocity: { vx: number, vy: number, vt: number, vb: number },
    isFocused: boolean,
    isDragged: boolean,
    titleChange: boolean,
};
