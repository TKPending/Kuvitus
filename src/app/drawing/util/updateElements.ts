import { DrawingType } from "@/app/types/DrawingType";

export const updateElements = (elements: DrawingType[], newElement: DrawingType, index: number) => {
    const copyElements: DrawingType[] = [...elements];
    copyElements[index] = newElement;

    return copyElements;
};
