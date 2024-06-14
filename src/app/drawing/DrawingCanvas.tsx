import rough from "roughjs";
import React, { useLayoutEffect, useState } from "react";
import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { DrawingType } from "@/app/types/DrawingType";
import CanvasToolBarComponent from "./components/CanvasToolBarComponent";
import { getCanvasDimension } from "./util/getDimensions";
import { createElement } from "./util/createElement";
import { updateElements } from "./util/updateElements";
import { setDrawingElements, updateDrawingElements } from "@/app/redux/slices/goal/goalSlice";
import { selectElement } from "./util/selectElement";

const DrawingCanvas = () => {
  const dispatch = useDispatch();
  const elements: DrawingType[] = useSelector((state: RootState) => state.goal.drawingElements);
  const [ drawingTool, setDrawingTool ] = useState<string>("");
  const [ userAction, setUserAction ] = useState<string>("none");
  const [ selectedElement, setSelectedElement] = useState<DrawingType | null>(null);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    const roughCanvas = rough.canvas(canvas);

    context.clearRect(0, 0, canvas.width, canvas.height);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);

  const handleMouseDown = (event: React.MouseEvent) => {
    const { canvasX, canvasY } = getCanvasDimension(event);

    if (drawingTool === "selection") {
      const chosenElement = selectElement(canvasX, canvasY, elements);
      if (chosenElement) {
        setUserAction("moving");
        // setSelectedElement()
      };
    } else {
      const id: number = elements.length;
      const newElement: DrawingType = createElement(id, canvasX, canvasY, canvasX, canvasY, drawingTool);

      setUserAction("drawing");
      dispatch(setDrawingElements(newElement));
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    const { canvasX, canvasY } = getCanvasDimension(event);

    if (userAction === "drawing") {
      const newestElementIndex: number = elements.length - 1;
      const { x1, y1 } = elements[newestElementIndex];
      const updatedElement: DrawingType = createElement(newestElementIndex, x1, y1, canvasX, canvasY, drawingTool);

      const refreshedElements: DrawingType[] = updateElements(elements, updatedElement, newestElementIndex);
      dispatch(updateDrawingElements(refreshedElements));
    } else if (userAction === "moving" && selectedElement) {
      const { x1, y1, x2, y2 } = selectedElement;


      // Update Elements
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
      <CanvasToolBarComponent drawingTool={drawingTool} onClick={handleToolChange} />
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
