import React, { useState } from "react";

type Props = {
  status: number;
  onSave?: () => void;
  handleDispatch: (option: number) => void;
};

const GoalStatusContainer = ({ status, onSave, handleDispatch }: Props) => {
  const [progressClicked, setProgressClicked] = useState<boolean>(false);
  const options: string[] = ["Uncomplete", "Completed", "Pending"];

  const handleInitialClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
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
            ? "bg-red-600"
            : status === 1
            ? "bg-green-600"
            : "bg-neutral-400"
        }`}
        onClick={handleInitialClick} // Toggle dropdown visibility
      >
        {status === 0 ? "Uncomplete" : status === 1 ? "Completed" : "Pending"}
      </p>
      {progressClicked && (
        <div className="absolute top-full left-0 mt-1 bg-white shadow-md rounded-md">
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

export default GoalStatusContainer;
