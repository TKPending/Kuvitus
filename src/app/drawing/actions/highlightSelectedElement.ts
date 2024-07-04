import { ElementType } from "@/app/types/DrawingTypes";

export const highlightSelectedElement = (
  canvasContext: CanvasRenderingContext2D,
  selectedElement: ElementType | null,
  element: ElementType
) => {
  if (selectedElement && selectedElement.id === element.id) {
    const { x1, y1, x2, y2 } = element;
    canvasContext.fillStyle = "red";
    canvasContext.strokeStyle= "#fff";
    const radius = 4;
    [x1, y1, x2, y2].forEach((corner, i) => {
      const x = i % 2 === 0 ? corner : x2;
      const y = i % 2 === 0 ? y1 : corner;
      canvasContext.beginPath();
      canvasContext.arc(x, y, radius, 0, 2 * Math.PI);
      canvasContext.fill();
    });
  }
};
