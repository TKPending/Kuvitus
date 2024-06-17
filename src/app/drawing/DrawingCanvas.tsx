import rough from "roughjs";
import React, { useLayoutEffect, useState } from "react";
import { RootState } from "@/app/redux/store"
import { useSelector } from "react-redux";
import { createElement } from "./actions/createElement";
import { getRelativeCoordinates } from "./retrieval/getRelativeCoordinates";
import { DrawingToolsType } from "@/app/types/DrawingTypes";
import CanvasToolBarComponent from "@/app/components/custom/toolbar/CanvasToolBarComponent";

const DrawingCanvas = () => {
  const currentTool: DrawingToolsType = useSelector((state: RootState) => state.goal.drawingToolType);
  const [elements, setElements] = useState<any[]>([]);
  const [drawing, setDrawing] = useState<boolean>(false);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    // Keeps drawing relative to parent div
    canvas.width = canvas.parentElement?.clientWidth || 0;
    canvas.height = canvas.parentElement?.clientHeight || 0;
    const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);

  const handleMouseDown = (event: React.MouseEvent) => {
    setDrawing(true);
    const { clientX, clientY } = getRelativeCoordinates(event);

    const element = createElement({x1: clientX, y1: clientY, x2: clientX, y2: clientY}, currentTool.type);
    setElements((prevState => [...prevState, element]));
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!drawing) return;

    const { clientX, clientY } = getRelativeCoordinates(event);
    const index = elements.length - 1;
    const { x1, y1 } = elements[index];
    const updatedElement = createElement({x1, y1, x2: clientX, y2: clientY}, currentTool.type);

    const elementsCopy = [...elements];
    elementsCopy[index] = updatedElement;
    setElements(elementsCopy);
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    setDrawing(false);
  };


  return (
    <div className="relative flex items-center justify-center h-full w-full overflow-hidden">
      <CanvasToolBarComponent />
      <canvas
        id="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="h-full w-full"
      ></canvas>
    </div>
  );
};

export default DrawingCanvas;
