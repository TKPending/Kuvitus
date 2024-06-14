import { Drawable } from "roughjs/bin/core";

export const deserializeRoughElement = (serializedElement: any): Drawable => {
  return {
    ...serializedElement,
    options: {
      ...serializedElement.options,
      randomizer: { seed: 0 }, // Adjust this as necessary
    },
    sets: [], // Recreate this as necessary
  };
};
