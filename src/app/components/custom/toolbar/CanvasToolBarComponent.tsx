import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faSquare,
  faArrowPointer,
  faT,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { DrawingToolsType } from "@/app/types/DrawingTypes";
import { setDrawingTool } from "@/app/redux/slices/goal/goalSlice";

const CanvasToolBarComponent = () => {
  const dispatch = useDispatch();
  const currentTool: DrawingToolsType = useSelector((state: RootState) => state.goal.drawingToolType);

  const drawingToolOptions: DrawingToolsType[] = [
    { type: "selection", icon: faArrowPointer },
    { type: "line", icon: faPen },
    { type: "rectangle", icon: faSquare },
    { type: "pencil", icon: faPencil },
    { type: "text", icon: faT },
  ];

  const handleToolChange = (chosenTool: DrawingToolsType) => {
    dispatch(setDrawingTool(chosenTool))
  };

  return (
    <div className="absolute border-black top-4 border-4 rounded-lg bg-white flex items-center justify-center overflow-hidden">
      {drawingToolOptions.map((tool: DrawingToolsType, index: number) => (
        <div key={index} className={`cursor-pointer ${currentTool.type === tool.type ? "bg-neutral-600 text-white" : "hover:bg-black hover:text-white"} transition duration-200`}>
          <FontAwesomeIcon
            icon={tool.icon}
            onClick={() => handleToolChange(drawingToolOptions[index])}
            className="h-4 w-4 p-2"
          />
        </div>
      ))}
    </div>
  );
};

export default CanvasToolBarComponent;
