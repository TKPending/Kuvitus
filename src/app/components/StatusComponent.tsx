import React, { useState, useRef, useEffect } from "react";
import { useTransition, animated } from "@react-spring/web";

type Props = {
  status: number;
  button?: boolean;
  handleDispatch?: (option: number) => void;
};

const StatusComponent = ({ status, button = true, handleDispatch }: Props) => {
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

  const transitions = useTransition(progressClicked, {
    from: { opacity: 0, transform: "translateY(-10px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
    leave: { opacity: 0, transform: "translateY(-10px)" },
  });

  return (
    <div className="relative" ref={dropdownRef}>
      <p
        className={`p-2 ${button ? "cursor-pointer hover:bg-opacity-80" : ""} rounded-lg text-white transition duration-400 ${
          status === 0 ? "bg-kuvitus-uncomplete" : status === 1 ? "bg-kuvitus-completed" : "bg-kuvitus-pending"
        }`}
        onClick={handleInitialClick}
        tabIndex={0}
      >
        {status === 0 ? "Uncomplete" : status === 1 ? "Completed" : "Pending"}
      </p>
      {transitions((style, item) =>
        item ? (
          <animated.div style={style} className="absolute z-50 top-full left-0 mt-1 bg-white shadow-md rounded-md">
            {options.map((option: string, index: number) => (
              <p
                key={index}
                className="p-2 text-black cursor-pointer hover:bg-gray-200"
                onClick={(e: React.MouseEvent<HTMLParagraphElement>) => handleOptionClick(e, index)}
                tabIndex={0}
              >
                {option}
              </p>
            ))}
          </animated.div>
        ) : null
      )}
    </div>
  );
};

export default StatusComponent;
