import rough from "roughjs";
import React, { useLayoutEffect, useState } from "react";
import { getCanvasDimension } from "./util/getCanvasDimension";
import { createElement } from "./util/createElement";
import CanvasToolBarComponent from "./component/CanvasToolBarComponent";

const DrawingProvider = () => {
  const [elements, setElements] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [elementType, setElementType] = useState<string>("pointer");

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    const roughCanvas = rough.canvas(canvas);

    context.clearRect(0, 0, canvas.width, canvas.height);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (elementType === "pointer") {
        return;
    };
    setIsDrawing(true);

    const { canvasX, canvasY } = getCanvasDimension(e);

    const element = createElement(
      canvasX,
      canvasY,
      canvasX,
      canvasY,
      elementType
    );
    setElements((prevState) => [...prevState, element]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;

    const { canvasX, canvasY } = getCanvasDimension(e);

    const currentDrawingIndex: number = elements.length - 1;
    const { x1, y1 } = elements[currentDrawingIndex];
    const updatedElement = createElement(x1, y1, canvasX, canvasY, elementType);

    const copyElements = [...elements];
    copyElements[currentDrawingIndex] = updatedElement;
    setElements(copyElements);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleElementChange = (element: string) => {
    setElementType(element);
  };

  return (
    <div className="flex flex-col items-center justify-center relative h-full w-full border-4 rounded-lg border-black">
        <CanvasToolBarComponent elementType={elementType} onClick={handleElementChange} />

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

export default DrawingProvider;
