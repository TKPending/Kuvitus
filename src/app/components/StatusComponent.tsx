import React, { useState, useRef, useEffect } from "react";

type Props = {
  status: number;
  button?: boolean;
  onSave?: () => void;
  handleDispatch?: (option: number) => void;
};

const StatusComponent = ({ status, button = true, onSave, handleDispatch }: Props) => {
  const [progressClicked, setProgressClicked] = useState<boolean>(false);
  const options: string[] = ["Uncomplete", "Completed", "Pending"];
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleInitialClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    if (!button) {
      return;
    }
    e.stopPropagation();
    setProgressClicked(!progressClicked);
  };

  const handleOptionClick = (e: React.MouseEvent<HTMLParagraphElement>, option: number) => {
    e.stopPropagation();
    if (handleDispatch) {
      handleDispatch(option);
      setProgressClicked(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setProgressClicked(false);
    }
  };

  useEffect(() => {
    if (progressClicked) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [progressClicked]);

  return (
    <div className="relative" ref={dropdownRef}>
      <p
        className={`p-2 cursor-pointer rounded-lg text-white hover:bg-opacity-80 transition duration-400 ${
          status === 0 ? "bg-kuvitus-uncomplete" : status === 1 ? "bg-kuvitus-completed" : "bg-kuvitus-pending"
        }`}
        onClick={handleInitialClick} // Toggle dropdown visibility
        tabIndex={0} // Make focusable
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
              tabIndex={0} // Make focusable
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
