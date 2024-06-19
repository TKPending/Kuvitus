import { ElementType, DrawingToolsType, DrawingCanvas } from "./DrawingTypes";
import { SubType } from "./SubType";

export interface GoalType {
    uID: string;
    title: string;
    description: string;
    status: number | 0 | 1 | 2; // (Uncomplete, Complete, Pending)
    depth: "basic" | "medium" | "advanced" | string; // (Basic, Medium, Advanced)
    tags: string[];
    dueDate: string;
    completeDate: string;
    subGoals: SubType[];
    drawingElements: ElementType[];
    drawingToolType:  DrawingToolsType;
    drawingCanvas: DrawingCanvas;
};
