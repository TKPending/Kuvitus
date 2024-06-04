"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import GoalContainer from "./GoalContainer";
import GoalButtonComponent from "@/app/components/GoalButtonComponent";
import { LocalGoalType } from "@/app/types/LocalGoalType";
import { removeLocalGoal, setLocalGoalFocused, setLocalGoalUnfocused } from "@/app/redux/slices/localGoals/localGoalsSlice";
import { PositionType } from "@/app/types/PositionType";
import React, { useState } from "react";

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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) {
      handleDetailedGoalVisibility();
    }
    setDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1) {
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

  const handleDeleteGoal = () => {
    dispatch(removeLocalGoal(goalUID));
  };

  const handleEditGoal = () => {
    router.push(`/goal/${goalUID}`);
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
          <GoalButtonComponent title="Title" onClick={handleDeleteGoal} />
          <GoalButtonComponent title="View" onClick={handleEditGoal} />
          <GoalButtonComponent title="Delete" onClick={handleDeleteGoal} />
        </div>
      )}
      <GoalContainer goal={goal.goal} />
    </div>
  );
};

export default ActiveGoalContainer;
