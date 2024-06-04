import React from "react";

type Props = {
  title: string;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const GoalButtonComponent = ({ title, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`${
        title === "Delete"
          ? "bg-red-400"
          : title === "View"
          ? "bg-neutral-200"
          : "bg-neutral-200"
      } flex items-center justify-center cursor-pointer rounded shadow-lg h-6 w-12`}
    >
      <p className="text-xs font-semibold">{title}</p>
    </div>
  );
};

export default GoalButtonComponent;
