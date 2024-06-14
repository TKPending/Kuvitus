import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faSquare,
  faArrowPointer,
} from "@fortawesome/free-solid-svg-icons";
import { DrawingToolType } from "@/app/types/DrawingToolType";

type Props = {
  drawingTool: string;
  onClick: (element: string) => void;
};

const CanvasToolBarComponent = ({ drawingTool, onClick }: Props) => {
  const drawingToolOptions: DrawingToolType[] = [
    { type: "selection", icon: faArrowPointer },
    { type: "line", icon: faPen },
    { type: "rectangle", icon: faSquare },
  ];

  return (
    <div className="absolute border-black top-4 border-4 rounded-lg bg-white flex items-center justify-center overflow-hidden">
      {drawingToolOptions.map((tool: DrawingToolType, index: number) => (
        <div
          key={index}
          className={`${
            tool.type === drawingTool && "bg-neutral-600 text-white"
          }  hover:bg-black hover:text-white transition duration-200 cursor-pointer`}
        >
          <FontAwesomeIcon
            icon={tool.icon}
            onClick={() => onClick(tool.type)}
            className="h-4 w-4 p-2"
          />
        </div>
      ))}
    </div>
  );
};

export default CanvasToolBarComponent;
