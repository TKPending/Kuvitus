import { DrawingType } from "@/app/types/DrawingType";

export const serializeDrawingElement = (element: DrawingType): DrawingType => {
  const { roughElement, ...rest } = element;
  const serializedRoughElement = {
    ...roughElement,
    options: {
      ...roughElement.options,
      randomizer: undefined, 
    },
  };
  return {
    ...rest,
    roughElement: serializedRoughElement,
  };
};
