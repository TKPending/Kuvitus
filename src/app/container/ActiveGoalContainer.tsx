"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import GoalContainer from "./GoalContainer";
import GoalButtonComponent from "@/app/components/GoalButtonComponent";
import { LocalGoalType } from "@/app/types/LocalGoalType";
import { removeLocalGoal, setLocalGoalFocused, setLocalGoalUnfocused } from "@/app/redux/slices/localGoals/localGoalsSlice";
import React, { useState, useEffect } from "react";

type Props = {
  goal: LocalGoalType;
};

const ActiveGoalContainer = ({ goal }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const goalUID = goal.goal.goalUID;
  const position = goal.position;
  const isFocused = goal.isFocused;
  
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isButtonClicked) {
      setStartPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging && !isButtonClicked) {
      handleDetailedGoalVisibility();
    }
    setDragging(false);
    setIsButtonClicked(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1 && !isButtonClicked) {
      const dx = Math.abs(e.clientX - startPos.x);
      const dy = Math.abs(e.clientY - startPos.y);
      if (dx > 5 || dy > 5) { // Considered as drag if moved more than 5px
        setDragging(true);
      }
    }
  };

  const handleDetailedGoalVisibility = () => {
    if (isFocused) {
      dispatch(setLocalGoalUnfocused(goalUID));
    } else {
      dispatch(setLocalGoalFocused(goalUID));
    }
  };

  const handleDeleteGoal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsButtonClicked(true);
    dispatch(removeLocalGoal(goalUID));
  };

  const handleEditGoal = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsButtonClicked(true);
    router.push(`/goal/${goalUID}`);
  };

  const handleTitleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setIsButtonClicked(true);
    // Handle title click if necessary
  };

  return (
    <div
      className="absolute flex items-end justify-center flex-col gap-2 transition-transform duration-100 ease-linear"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {isFocused && (
        <div className="flex gap-2">
          <GoalButtonComponent title="Title" onClick={handleTitleClick} />
          <GoalButtonComponent title="View" onClick={handleEditGoal} />
          <GoalButtonComponent title="Delete" onClick={handleDeleteGoal} />
        </div>
      )}
      <GoalContainer goal={goal.goal} />
    </div>
  );
};

export default ActiveGoalContainer;