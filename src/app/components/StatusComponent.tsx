import React, { useState } from "react";

type Props = {
  status: number;
  button?: boolean;
  onSave?: () => void;
  handleDispatch?: (option: number) => void;
};

const StatusComponent = ({ status, button=true, onSave, handleDispatch }: Props) => {
  const [progressClicked, setProgressClicked] = useState<boolean>(false);
  const options: string[] = ["Uncomplete", "Completed", "Pending"];

  const handleInitialClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    if (!button) {
      return;
    }
    e.stopPropagation();
    setProgressClicked(!progressClicked);
  };

  const handleOptionClick = (e: React.MouseEvent<HTMLParagraphElement>, option: number) => {
    e.stopPropagation();
    handleDispatch(option);
    setProgressClicked(false);
  };

  return (
    <div className="relative">
      <p
        className={`p-2 cursor-pointer rounded-lg text-white ${
          status === 0
            ? "bg-kuvitus-uncomplete"
            : status === 1
            ? "bg-kuvitus-completed"
            : "bg-kuvitus-pending"
        }`}
        onClick={handleInitialClick} // Toggle dropdown visibility
      >
        {status === 0 ? "Uncomplete" : status === 1 ? "Completed" : "Pending"}
      </p>
      {progressClicked && (
        <div className="absolute z-50 top-full left-0 mt-1 bg-white shadow-md rounded-md">
          {options.map((option: string, index: number) => (
            <p
              key={index}
              className="p-2 text-black cursor-pointer hover:bg-gray-200"
              onClick={(e: React.MouseEvent<HTMLParagraphElement>) => handleOptionClick(e, index)}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusComponent;
