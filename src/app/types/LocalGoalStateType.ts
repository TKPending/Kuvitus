import { LocalGoalType } from "./LocalGoalType";
import { PositionType } from "./PositionType";

export interface LocalGoalStateType {
    goals: LocalGoalType[];
    blockedProximity: PositionType;
};
