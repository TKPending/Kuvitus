import rough from "roughjs";
import React, { useLayoutEffect, useState } from "react";
import { DrawingType } from "@/app/types/DrawingType";
import CanvasToolBarComponent from "./components/CanvasToolBarComponent";
import { getCanvasDimension } from "./util/getDimensions";
import { createElement } from "./util/createElement";
import { updateElements } from "./util/updateElements";
import { selectElement } from "./util/selectElement";

const DrawingCanvas = () => {
  const [elements, setElements] = useState<DrawingType[]>([]);
  const [drawingTool, setDrawingTool] = useState<string>("");
  const [userAction, setUserAction] = useState<string>("none");
  const [selectedElement, setSelectedElement] = useState<DrawingType | null>(
    null
  );

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    const roughCanvas = rough.canvas(canvas);

    context.clearRect(0, 0, canvas.width, canvas.height);

    elements.forEach(({ roughElement }) => {
      roughCanvas.draw(roughElement);
    });
  }, [elements]);

  const handleMouseDown = (event: React.MouseEvent) => {
    const { canvasX, canvasY } = getCanvasDimension(event);

    if (drawingTool === "selection") {
      const chosenElement = selectElement(canvasX, canvasY, elements);
      if (chosenElement) {
        setUserAction("moving");
        setSelectedElement(chosenElement);
      }
    } else {
      const id: number = elements.length;
      const newElement: DrawingType = createElement(
        id,
        canvasX,
        canvasY,
        canvasX,
        canvasY,
        drawingTool
      );

      setUserAction("drawing");
      setElements((prevState) => [...prevState, newElement]);
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    const { canvasX, canvasY } = getCanvasDimension(event);

    if (userAction === "drawing") {
      const newestElementIndex: number = elements.length - 1;
      const { x1, y1 } = elements[newestElementIndex];
      const updatedElement: DrawingType = createElement(
        newestElementIndex,
        x1,
        y1,
        canvasX,
        canvasY,
        drawingTool
      );

      const refreshedElements: DrawingType[] = updateElements(
        elements,
        updatedElement,
        newestElementIndex
      );
      setElements(refreshedElements);
    } else if (userAction === "moving" && selectedElement) {
      const { x1, y1, x2, y2 } = selectedElement;
      const width = x2 - x1;
      const height = y2 - y1;

      const updatedElement: DrawingType = {
        ...selectedElement,
        x1: canvasX,
        y1: canvasY,
        x2: canvasX + width,
        y2: canvasY + height,
      };

      const refreshedElements: DrawingType[] = updateElements(
        elements,
        updatedElement,
        selectedElement.id
      );
      setElements(refreshedElements);
    }
  };

  const handleMouseUp = () => {
    setUserAction("none");
    setSelectedElement(null);
  };

  const handleToolChange = (tool: string) => {
    setDrawingTool(tool);
  };

  return (
    <div className="flex flex-col items-center justify-center relative h-full w-full border-4 rounded-lg border-black">
      <CanvasToolBarComponent
        drawingTool={drawingTool}
        onClick={handleToolChange}
      />
      <canvas
        id="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="w-full h-full"
      ></canvas>
    </div>
  );
};

export default DrawingCanvas;
