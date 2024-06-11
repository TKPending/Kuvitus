import rough from "roughjs";
import React, { useLayoutEffect, useState } from "react";
import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getCanvasDimension } from "./util/getCanvasDimension";
import { createElement } from "./util/createElement";
import CanvasToolBarComponent from "./component/CanvasToolBarComponent";
import { DrawingType } from "@/app/types/DrawingType";
import { setDrawingElements, updateDrawingElements } from "@/app/redux/slices/goal/goalSlice";
import { selectElement } from "./util/selectElement";

const DrawingCanvas = () => {
  const dispatch = useDispatch();
  const elements: DrawingType[] = useSelector((state: RootState) => state.goal.drawingElements);
  const [tool, setTool] = useState<string>("none");
  const [action, setAction] = useState<string>("none");
  const [selectedElement, setSelectedElement] = useState<DrawingType | null>(null);

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    const roughCanvas = rough.canvas(canvas);

    context.clearRect(0, 0, canvas.width, canvas.height);

    elements.forEach(({ roughElement }) => roughCanvas.draw(roughElement));
  }, [elements]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const { canvasX, canvasY } = getCanvasDimension(e);

    if (tool === "selection") {
      const element = selectElement(canvasX, canvasY, elements);
      if (element) {
        const offsetX = canvasX - element.x1;
        const offsetY = canvasY - element.y1;
        setSelectedElement({...element, x1: canvasX - offsetX , y1: canvasY - offsetY});
        setAction("moving");
      }
    } else {
      const id: number = elements.length;
      const element = createElement(id, canvasX, canvasY, canvasX, canvasY, tool);

      setAction("drawing");
      dispatch(setDrawingElements(element));
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { canvasX, canvasY } = getCanvasDimension(e);

    if (action === "drawing") {
      const currentDrawingIndex: number = elements.length - 1;
      const { x1, y1 } = elements[currentDrawingIndex];
      const updatedElement = createElement(currentDrawingIndex, x1, y1, canvasX, canvasY, tool);

      dispatch(updateDrawingElements(updatedElement));
    } else if (action === "moving" && selectedElement) {
      const { x1, y1, x2, y2 } = selectedElement;

      const width: number = x2 - x1;
      const height: number = y2 - y1;

      const updatedElement: DrawingType = {
        ...selectedElement,
        x2: x1 + width,
        y2: x2 + height,
      };

      dispatch(updateDrawingElements(updatedElement));
    }
  };

  const handleMouseUp = () => {
    setAction("none");
    setSelectedElement(null);
  };

  const handleElementChange = (element: string) => {
    setTool(element);
  };

  return (
    <div className="flex flex-col items-center justify-center relative h-full w-full border-4 rounded-lg border-black">
      <CanvasToolBarComponent tool={tool} onClick={handleElementChange} />
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
