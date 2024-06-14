import rough from "roughjs";
import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import { useLayoutEffect, useState } from "react";
import CanvasToolBarComponent from "@/app/components/custom/toolbar/CanvasToolBarComponent";
import { DrawingToolType } from "@/app/types/DrawingTypes";

const DrawingCanvas = () => {
  const currentTool: DrawingToolType = useSelector((state: RootState) => state.goal.drawingToolType);

  useLayoutEffect(() => {}, []);

  return (
    <div className="relative flex items-center justify-center h-full w-full">
      <CanvasToolBarComponent />
    </div>
  );
};

export default DrawingCanvas;
