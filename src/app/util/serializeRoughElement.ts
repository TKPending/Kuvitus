import { Drawable } from "roughjs/bin/core";

export const serializeRoughElement = (roughElement: Drawable): Drawable => {
  return {
    ...roughElement,
    sets: roughElement.sets, // Ensure sets is included
    options: {
      ...roughElement.options,
      randomizer: undefined, // Remove non-serializable property
    },
  };
};
