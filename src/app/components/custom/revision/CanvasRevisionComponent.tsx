import { useDispatch } from "react-redux";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRotateLeft,
  faRotateRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { setDeleteOptionVisible } from "@/app/redux/slices/goal/goalSlice";

type Props = {
  displayTrashCan: boolean;
  onUndo: () => void;
  onRedo: () => void;
};

const CanvasRevisionComponent = ({ displayTrashCan, onUndo, onRedo }: Props) => {
  const dispatch = useDispatch();
  const [isOptionHovered, setIsOptionHovered] = useState<string | null>(null);
  
  const handleOptionHover = (option: string) => {
    setIsOptionHovered(option);
  };

  const handleDisplayDelete = () => {
    dispatch(setDeleteOptionVisible(true));
  }
  const revisionOptions = [
    { type: "undo", icon: faRotateLeft, action: onUndo },
    { type: "redo", icon: faRotateRight, action: onRedo },
    { type: "delete-all", icon: faTrash, action: handleDisplayDelete },
  ];

  return (
    <div className="absolute left-10 bottom-2 h-12 flex items-center justify-center gap-4">
      {revisionOptions.map((option, index) => (
        <div
          key={index}
          className={`${option.type === "delete-all" && !displayTrashCan && "hidden"} flex flex-col items-center justify-center gap-2`}
        >
          <p
            className={`${
              isOptionHovered === option.type
                ? "decoration-black scale-110"
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
            className={`hover:cursor-pointer hover:scale-105 bg-neutral-400 rounded-full p-2 
              ${option.type === "delete-all" && "bg-red-600 bg-opacity-40 hover:bg-opacity-80 transition duration-400"}
              
            `}
          />
        </div>
      ))}
    </div>
  );
};

export default CanvasRevisionComponent;
