export const getCursorForPointer = (positionOnElement: string | null) => {
  switch (positionOnElement) {
    case "tl":
    case "br":
    case "start":
    case "end":
      return "nwse-resize";
    case "tr":
    case "bl":
      return "news-resize";
    default:
      return "move";
  }
};
