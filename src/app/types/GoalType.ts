import { ElementType, DrawingToolsType, DrawingCanvas } from "./DrawingTypes";
import { SubType } from "./SubType";

export interface GoalType {
    uID: string;
    title: string;
    description: string;
    status: number | 0 | 1 | 2; // (Uncomplete, Complete, Pending)
    depth: "basic" | "medium" | "advanced"; // (Basic, Medium, Advanced)
    tags: string[];
    dueDate: string;
    subGoals: SubType[];
    drawingElements: ElementType[];
    drawingToolType:  DrawingToolsType;
    drawingCanvas: DrawingCanvas;
};
