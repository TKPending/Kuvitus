import rough from "roughjs";
import React, { useLayoutEffect, useState, useEffect, useRef } from "react";
import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "@/app/hooks/useHistory";
import { usePressedKeys } from "@/app/hooks/usePressedKeys";
import { createElement } from "./actions/createElement";
import { updateElement } from "./actions/updateElement";
import { drawElement } from "./actions/drawElement";
import { adjustElementCoordinates } from "./actions/adjustElementCoordinates";
import { getRelativeCoordinates } from "./retrieval/getRelativeCoordinates";
import { getElementAtPosition } from "./retrieval/getElementAtPosition";
import { getCursorForPointer } from "./retrieval/getCursorForPointer";
import { getResizedCoordinates } from "./retrieval/getResizedCoordinates";
import { adjustmentRequired } from "./util/adjustmentRequired";
import {
  DrawingToolsType,
  ElementType,
  ActionsType,
} from "@/app/types/DrawingTypes";
import CanvasToolBarComponent from "@/app/components/canvas/CanvasToolBarComponent";
import CanvasTextAreaComponent from "@/app/components/canvas/CanvasTextAreaComponent";
import { setDrawingTool } from "@/app/redux/slices/goal/goalSlice";
import { faArrowPointer } from "@fortawesome/free-solid-svg-icons";
import CanvasSureDeleteComponent from "@/app/components/canvas/CanvasSureDeleteComponent";
import CanvasErrorComponent from "@/app/components/canvas/CanvasErrorComponent";
import CanvasControllerContainer from "@/app/containers/CanvasControllerContainer";

const DrawingCanvas = () => {
  const dispatch = useDispatch();
  const currentTool: DrawingToolsType = useSelector(
    (state: RootState) => state.goal.drawingToolType
  );
  const displayDeleteOptions: boolean = useSelector(
    (state: RootState) => state.goal.drawingCanvas.displayDeleteOption
  );
  const isError: boolean = useSelector(
    (state: RootState) => state.goal.drawingCanvas.isError
  );
  const { elements, setElements, undo, redo } = useHistory([]);
  const [userAction, setUserAction] = useState<ActionsType>("none");
  const [selectedElement, setSelectedElement] = useState<ElementType | null>(
    null
  );
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [startMouesPanPosition, setStartMousePanPosition] = useState({
    x: 0,
    y: 0,
  });
  const [scale, setScale] = useState<number>(1);
  const [scaleOffset, setScaleOffset] = useState({ x: 0, y: 0 });
  const textAreaRef = useRef<HTMLTextAreaElement>();
  const pressedKeys = usePressedKeys();

  useLayoutEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    // Keeps drawing relative to parent div
    canvas.width = canvas.parentElement?.clientWidth || 0;
    canvas.height = canvas.parentElement?.clientHeight || 0;
    const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    const scaledWidth = canvas.width * scale;
    const scaledHeight = canvas.height * scale;
    const scaleOffsetX = (scaledWidth - canvas.width) / 2;
    const scaleOffsetY = (scaledHeight - canvas.height) / 2;
    setScaleOffset({ x: scaleOffsetX, y: scaleOffsetY });

    canvasContext.save();
    canvasContext.translate(
      panOffset.x * scale - scaleOffsetX,
      panOffset.y * scale - scaleOffsetY
    );
    canvasContext.scale(scale, scale);

    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element: ElementType) => {
      if (userAction === "writing" && selectedElement!.id === element.id)
        return;
      drawElement(roughCanvas, canvasContext, element, dispatch);
    });
    canvasContext.restore();
  }, [elements, userAction, selectedElement, panOffset, scale]);

  useEffect(() => {
    const undoRedoFunction = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === "z") {
          if (event.shiftKey) {
            redo();
          } else {
            undo();
          }
        } else if (event.key === "y") {
          redo();
        }
      }
    };

    document.addEventListener("keydown", undoRedoFunction);
    return () => {
      document.removeEventListener("keydown", undoRedoFunction);
    };
  }, [undo, redo]);

  const handleOnZoom = (delta: number) => {
    setScale((prevState) => Math.min(Math.max(prevState + delta, 0.1), 2));
  };

  useEffect(() => {
    const panOrZoomFunction = (event: WheelEvent) => {
      if (pressedKeys.has("Meta") || pressedKeys.has("Control")) {
        handleOnZoom(event.deltaY * -0.01);
      } else {
        setPanOffset((prevState) => ({
          x: prevState.x - event.deltaX * 0.5,
          y: prevState.y - event.deltaY * 0.5,
        }));
      }
    };

    document.addEventListener("wheel", panOrZoomFunction);
    return () => {
      document.removeEventListener("wheel", panOrZoomFunction);
    };
  }, [pressedKeys]);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (userAction === "writing" && textArea) {
      setTimeout(() => {
        textArea.focus();
        textArea.value = selectedElement!.text!;
      }, 0);
    }
  }, [userAction, selectedElement]);

  const handleMouseDown = (event: React.MouseEvent) => {
    if (userAction === "writing") return;

    const { clientX, clientY } = getRelativeCoordinates(event, {
      x: panOffset.x,
      y: panOffset.y,
    }, scaleOffset, scale);

    if (event.button === 1 || pressedKeys.has(" ")) {
      setUserAction("panning");
      setStartMousePanPosition({ x: clientX, y: clientY });
    }

    if (currentTool.type === "selection") {
      const clickedElement = getElementAtPosition(clientX, clientY, elements);

      if (clickedElement) {
        if (clickedElement.type === "pencil" && clickedElement.points) {
          const xOffsets = clickedElement.points.map(
            (point) => clientX - point.x
          );
          const yOffsets = clickedElement.points.map(
            (point) => clientY - point.y
          );
          setSelectedElement({ ...clickedElement, xOffsets, yOffsets });
        } else {
          const offsetX = clientX - clickedElement.x1;
          const offsetY = clientY - clickedElement.y1;

          setSelectedElement({ ...clickedElement, offsetX, offsetY });
        }

        setElements((prevState) => prevState);

        if (clickedElement.position === "inside") {
          setUserAction("moving");
        } else {
          setUserAction("resizing");
        }
      }
    } else {
      const id = elements.length;
      const element = createElement(
        id,
        { x1: clientX, y1: clientY, x2: clientX, y2: clientY },
        currentTool.type,
        dispatch
      );
      setSelectedElement(element);
      setElements((prevState) => [...prevState, element]);

      setUserAction(currentTool.type === "text" ? "writing" : "drawing");
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = getRelativeCoordinates(event, {
      x: panOffset.x,
      y: panOffset.y,
    }, scaleOffset, scale);

    if (userAction === "panning") {
      const deltaX = clientX - startMouesPanPosition.x;
      const deltaY = clientX - startMouesPanPosition.y;
      setPanOffset((prevState) => ({
        x: panOffset.x + deltaX,
        y: panOffset.y + deltaY,
      }));
      return;
    }

    if (currentTool.type === "selection") {
      const element = getElementAtPosition(clientX, clientY, elements);
      // @ts-ignore
      event.target.style.cursor = element
        ? getCursorForPointer(element.position)
        : "default";
    }

    if (userAction === "drawing" && selectedElement) {
      const index = selectedElement.id;
      const { x1, y1 } = elements[index];

      updateElement(
        index,
        x1,
        y1,
        clientX,
        clientY,
        currentTool.type,
        elements,
        setElements,
        dispatch
      );
    } else if (userAction === "moving" && selectedElement) {
      if (selectedElement.type === "pencil" && selectedElement.points) {
        const newPoints = selectedElement.points.map((_, index) => ({
          x: clientX - selectedElement.xOffsets![index],
          y: clientY - selectedElement.yOffsets![index],
        }));

        const elementsCopy = [...elements];
        elementsCopy[selectedElement.id] = {
          ...elementsCopy[selectedElement.id],
          points: newPoints,
        };
        setElements(elementsCopy, true);
      } else {
        const { id, x1, y1, x2, y2, type, offsetX, offsetY } = selectedElement;
        const width = x2 - x1;
        const height = y2 - y1;

        if (offsetX && offsetY) {
          const newX1 = clientX - offsetX;
          const newY1 = clientY - offsetY;
          const text =
            type === "text" && selectedElement.text ? selectedElement.text : "";

          updateElement(
            id,
            newX1,
            newY1,
            newX1 + width,
            newY1 + height,
            type,
            elements,
            setElements,
            dispatch,
            text
          );
        }
      }
    } else if (userAction === "resizing" && selectedElement) {
      const { id, type, position, ...coordinates } = selectedElement;
      const { x1, y1, x2, y2 } = getResizedCoordinates(
        clientX,
        clientY,
        position,
        coordinates
      );

      updateElement(id, x1, y1, x2, y2, type, elements, setElements, dispatch);
    }
  };

  const handleMouseUp = (event: React.MouseEvent) => {
    const { clientX, clientY } = getRelativeCoordinates(event, {
      x: panOffset.x,
      y: panOffset.y,
    }, scaleOffset, scale);

    if (selectedElement) {
      if (
        selectedElement.type === "text" &&
        clientX - selectedElement.offsetX! === selectedElement.x1 &&
        clientY - selectedElement.offsetY! === selectedElement.y1
      ) {
        setUserAction("writing");
        return;
      }

      const index = selectedElement.id;
      const { id, type } = elements[index];

      if (
        (userAction === "drawing" || userAction == "resizing") &&
        adjustmentRequired(type)
      ) {
        const { x1, y1, x2, y2 } = adjustElementCoordinates(elements[index]);
        updateElement(
          id,
          x1,
          y1,
          x2,
          y2,
          type,
          elements,
          setElements,
          dispatch
        );
      }
    }

    if (userAction === "writing") return;

    setUserAction("none");
    setSelectedElement(null);
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    const { id, x1, y1, x2, y2, type } = selectedElement!;

    setUserAction("selection");
    dispatch(
      setDrawingTool({
        type: "selection",
        icon: faArrowPointer,
      })
    );
    setSelectedElement(null);

    updateElement(
      id,
      x1,
      y1,
      x2,
      y2,
      type,
      elements,
      setElements,
      dispatch,
      event.target.value
    );
  };

  return (
    <div className="relative flex items-center justify-center h-full w-full overflow-hidden">
      <CanvasToolBarComponent />
      {isError && <CanvasErrorComponent />}
      {displayDeleteOptions && <CanvasSureDeleteComponent />}
      {userAction === "writing" ? (
        <CanvasTextAreaComponent
          textAreaRef={textAreaRef}
          y={selectedElement?.y1}
          x={selectedElement?.x1}
          panOffset={panOffset}
          scale={scale}
          scaleOffset={scaleOffset}
          handleOnBlur={handleOnBlur}
        />
      ) : null}
      <canvas
        id="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className={`h-full w-full absolute z-0`}
        style={{ transform: `translate(${panOffset.x}px, ${panOffset.y}px)` }}
      ></canvas>
      <CanvasControllerContainer
        scale={scale}
        displayTrashCan={elements.length > 0}
        onUndo={undo}
        onRedo={redo}
        handleZoom={handleOnZoom}
      />
    </div>
  );
};

export default DrawingCanvas;
