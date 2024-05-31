"use client";

import { useState } from "react";
import GoalContainer from "./GoalContainer";
import GoalButtonComponent from "@/app/components/GoalButtonComponent";
import { GoalType } from "@/app/types/GoalType";

type Props = {
  goal: GoalType;
  position: { x: number, y: number, t: number, b: number };
};

const ActiveGoalContainer = ({ goal, position }: Props) => {
  const [buttonsVisible, setButtonsVisible] = useState<boolean>(false);

  const handleButtonVisibility = () => {
    setButtonsVisible(!buttonsVisible);
  };

  const handleDelete = () => {
    console.log("Delete Task");
    // Activate modal
  };

  const handleTitleChange = () => {
    console.log("Change task title");
  };

  const handleEditGoal = () => {
    console.log("Edit Goal");
    // Redirect user
  };

  return (
    <div className="absolute flex items-end justify-center flex-col gap-2"
        style={{ 
          left: `${position.x}px`,
          right: `${position.y}px`,
          top: `${position.t}px`,
          bottom: `${position.b}px`,
        }}
    >
      {buttonsVisible && (
        <div className="flex gap-2">
          <GoalButtonComponent title="Title" onClick={handleDelete} />
          <GoalButtonComponent title="View" onClick={handleDelete} />
          <GoalButtonComponent title="Delete" onClick={handleDelete} />
        </div>
      )}

      <GoalContainer goal={goal} onClick={handleButtonVisibility} />
    </div>
  );
};

export default ActiveGoalContainer;
