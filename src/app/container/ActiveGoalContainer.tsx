"use client";

import { useState } from "react";
import GoalContainer from "./GoalContainer";
import GoalButtonComponent from "@/app/components/GoalButtonComponent";

const ActiveGoalContainer = () => {
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
    <div className="flex items-end justify-center flex-col gap-2">
      {buttonsVisible && (
        <div className="flex gap-2">
          <GoalButtonComponent title="Title" onClick={handleDelete} />
          <GoalButtonComponent title="View" onClick={handleDelete} />
          <GoalButtonComponent title="Delete" onClick={handleDelete} />
        </div>
      )}

      <GoalContainer onClick={handleButtonVisibility} />
    </div>
  );
};

export default ActiveGoalContainer;
