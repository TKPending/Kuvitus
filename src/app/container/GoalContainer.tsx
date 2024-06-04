"use client";

import { useDispatch } from "react-redux";
import React, { useState } from "react";
import GoalLayout from "@/app/layouts/GoalLayout";
import { setLocalGoalFocused, setLocalGoalUnfocused } from "@/app/redux/slices/localGoals/localGoalsSlice";
import { PositionType } from "@/app/types/PositionType";
import { GoalType } from "../types/GoalType";

type Props = {
  goalUID: string;
  position: PositionType;
  isFocused: boolean;
  goal: GoalType;
};

const GoalContainer = ({ goalUID, position, isFocused, goal }: Props) => {
  const dispatch = useDispatch();
  
  const [dragging, setDragging] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{x: number, y: number}>({ x: 0, y: 0 });
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);

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

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <GoalLayout goal={goal} />
    </div>
  );
};

export default GoalContainer;