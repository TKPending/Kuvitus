import { DrawingType } from "./DrawingType";
import { SubType } from "./SubType";

export interface GoalType {
    goalUID: string;
    goalTitle: string;
    goalDescription: string;
    goalStatus: number | 0 | 1 | 2; // (Uncomplete, Complete, Pending)
    goalDepth: "basic" | "medium" | "advanced"; // (Basic, Medium, Advanced)
    goalTags: string[];
    goalDueDate: string;
    goalSteps: SubType[];
    drawingElements: DrawingType[];
};
