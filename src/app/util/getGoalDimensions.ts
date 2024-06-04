export const getGoalDimensions = (
  goalDepth: "basic" | "medium" | "advanced"
) => {
  switch (goalDepth) {
    case "basic":
      return { width: 34, height: 12 };
    case "medium":
      return { width: 96, height: 96 };
    case "advanced":
      return { width: 96, height: 96 };
    default:
      return { width: 64, height: 64 };
  }
};
