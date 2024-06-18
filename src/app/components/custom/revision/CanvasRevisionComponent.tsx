import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft, faRotateRight } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onUndo: () => void;
  onRedo: () => void;
};

const CanvasRevisionComponent = ({ onUndo, onRedo }: Props) => {
  const [isOptionHovered, setIsOptionHovered] = useState<string | null>(null);

  const revisionOptions = [
    { type: "undo", icon: faRotateLeft, action: onUndo },
    { type: "redo", icon: faRotateRight, action: onRedo },
  ];

  const handleOptionHover = (option: string) => {
    setIsOptionHovered(option);
  };

  return (
    <div className="absolute left-10 bottom-2 h-12 flex items-center justify-center gap-4">
      {revisionOptions.map((option, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center gap-2"
        >
          <p className={`${isOptionHovered === option.type ? "decoration-black scale-110" : "text-white"} transition duration-500 text-xs`}>
            {option.type}
          </p>
          <FontAwesomeIcon
            icon={option.icon}
            onClick={option.action}
            onMouseOver={() => handleOptionHover(option.type)}
            onMouseLeave={() => setIsOptionHovered(null)}
            className="hover:cursor-pointer hover:scale-105 bg-neutral-400 rounded-full p-2"
          />
        </div>
      ))}
    </div>
  );
};

export default CanvasRevisionComponent;
