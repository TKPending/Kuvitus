import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotateLeft,
  faRotateRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { setDeleteOptionVisible, specificDelete } from "@/app/redux/slices/goal/goalSlice";
import { ElementType } from "@/app/types/DrawingTypes";
import { RootState } from "@/app/redux/store";

type Props = {
  displayTrashCan: boolean;
  selectedElement: ElementType | null;
  onUndo: () => void;
  onRedo: () => void;
};

const CanvasRevisionComponent = ({ displayTrashCan, selectedElement, onUndo, onRedo }: Props) => {
  const dispatch = useDispatch();
  const elementToDelete: number | null = useSelector((state: RootState) => state.goal.drawingCanvas.specificDelete);
  const [isOptionHovered, setIsOptionHovered] = useState<string | null>(null);
  
  const handleOptionHover = (option: string) => {
    setIsOptionHovered(option);
  };

  const handleDisplayDelete = () => {
    if (selectedElement) {
      dispatch(specificDelete(selectedElement.id));
    } else {
      dispatch(setDeleteOptionVisible(true));
    }
  }
  const revisionOptions = [
    { type: "undo", icon: faRotateLeft, action: onUndo },
    { type: "redo", icon: faRotateRight, action: onRedo },
    { type: `${elementToDelete ? "delete" : "delete-all"}`, icon: faTrash, action: handleDisplayDelete },
  ];

  return (
    <div className="flex items-center justify-center gap-4">
      {revisionOptions.map((option, index) => (
        <div
          key={index}
          className={`${option.type === "delete-all" || option.type === "delete" && !displayTrashCan && "hidden"} flex flex-col items-center justify-center gap-2`}
        >
          <p
            className={`${
              isOptionHovered === option.type
                ? "text-kuvitus-secondary-blue scale-110"
                : "text-white"
            } transition duration-500 text-xs`}
          >
            {option.type}
          </p>
          <FontAwesomeIcon
            icon={option.icon}
            onClick={option.action}
            onMouseOver={() => handleOptionHover(option.type)}
            onMouseLeave={() => setIsOptionHovered(null)}
            className={`hover:cursor-pointer hover:scale-105 rounded-full p-2 
              ${option.type === "delete-all" ? "bg-kuvitus-uncomplete bg-opacity-40 hover:bg-opacity-80 transition duration-400" : "bg-kuvitus-secondary-blue"}
              
            `}
          />
        </div>
      ))}
    </div>
  );
};

export default CanvasRevisionComponent;
