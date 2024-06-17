import rough from "roughjs";
import React, { useLayoutEffect, useState } from "react";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { createElement } from "./actions/createElement";
import { updateElement } from "./actions/updateElement";
import { adjustElementCoordinates } from "./actions/adjustElementCoordinates";
import { getRelativeCoordinates } from "./retrieval/getRelativeCoordinates";
import { getElementAtPosition } from "./retrieval/getElementAtPosition";
import { getCursorForPointer } from "./retrieval/getCursorForPointer";
import { getResizedCoordinates } from "./retrieval/getResizedCoordinates";
import { DrawingToolsType } from "@/app/types/DrawingTypes";
import CanvasToolBarComponent from "@/app/components/custom/toolbar/CanvasToolBarComponent";

const DrawingCanvas = () => {
  const currentTool: DrawingToolsType = useSelector((state: RootState) => state.goal.drawingToolType);
  const [elements, setElements] = useState<any[]>([]);
  const [userAction, setUserAction] = useState<string>("");
  const [selectedElement, setSelectedElement] = useState<any>(null);

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
    const { clientX, clientY } = getRelativeCoordinates(event);

    if (currentTool.type === "selection") {
      const clickedElement = getElementAtPosition(clientX, clientY, elements);
      if (clickedElement) {
        const offsetX = clientX - clickedElement.x1;
        const offsetY = clientY - clickedElement.y1;

        setSelectedElement({...clickedElement, offsetX, offsetY});

        if (clickedElement.position === "inside") {
          setUserAction("moving");
        } else {
          setUserAction("resizing");
        }
      }
    } else {
      const id = elements.length;
      const element = createElement(id, { x1: clientX, y1: clientY, x2: clientX, y2: clientY }, currentTool.type);
      setSelectedElement(element)
      setElements((prevState) => [...prevState, element]);

      setUserAction("drawing");
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = getRelativeCoordinates(event);

    if (currentTool.type === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      // @ts-ignore
      event.target.style.cursor = element
        ? getCursorForPointer(element.position)
        : "default"
    }

    if (userAction === "drawing") {
      const index = selectedElement.id;
      const { x1, y1 } = elements[index];

      updateElement(index, x1, y1, clientX, clientY, currentTool.type, elements, setElements);

    } else if (userAction === "moving") {
      const { id, x1, y1, x2, y2, type, offsetX, offsetY } = selectedElement;
      const width = x2 - x1;
      const height = y2 - y1;
      const newX1 = clientX - offsetX;
      const newY1 = clientY - offsetY;

      updateElement(id, newX1, newY1, newX1 + width, newY1 + height, type, elements, setElements);
    } else if (userAction === "resizing") {
        const { id, type, position, ...coordinates } = selectedElement;
        const { x1, y1, x2, y2 } = getResizedCoordinates(clientX, clientY, position, coordinates);

        updateElement(id, x1, y1, x2, y2, type, elements, setElements);
    }
  };

  const handleMouseUp = () => {
    const index = selectedElement.id
    const { id, type } = elements[index];

    if (userAction === "drawing" || userAction == "resizing") {
      const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
      updateElement(id, x1, y1, x2, y2, type, elements, setElements);
    };

    setUserAction("none");
    setSelectedElement(null);
  };

  return (
    <div className="relative flex items-center justify-center h-full w-full overflow-hidden">
      <CanvasToolBarComponent />
      <canvas
        id="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={`h-full w-full`}
      ></canvas>
    </div>
  );
};

export default DrawingCanvas;
