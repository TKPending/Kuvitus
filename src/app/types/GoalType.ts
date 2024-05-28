import { SubType } from "./SubType";

export interface GoalType {
    goalUID: string;
    goalTitle: string;
    goalDescription: string;
    goalStatus: number | 0 | 1 | 2; // (Uncomplete, Complete, Pending)
    goalTags: string[];
    goalDueDate: string;
    goalSteps: SubType[];
    excalidraw?: any;
};
