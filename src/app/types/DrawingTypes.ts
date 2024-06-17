import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface Coordinates {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

export interface DrawingToolsType {
    type: string;
    icon: IconDefinition;
};
