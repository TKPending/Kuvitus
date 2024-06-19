import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GoalType } from "@/app/types/GoalType";
import { setDragLocalPosition, setLocalGoalDrag } from "@/app/redux/slices/localGoals/localGoalsSlice";
import { getGoalDimensions } from "@/app/util/getGoalDimensions";
import GoalComponent from "@/app/components/interactive/GoalComponent";

type Props = {
  goal: GoalType;
};

const GoalLayout = ({ goal }: Props) => {
  const dispatch = useDispatch();
  const goalUID: string = goal.goalUID;
  const goalDepth: "basic" | "medium" | "advanced" = goal.goalDepth;
  const dimensions: {height: number, width: number} = getGoalDimensions(goalDepth);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
    dispatch(setLocalGoalDrag(goalUID));
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newX = e.clientX - startPos.x;
      const newY = e.clientY - startPos.y;
      dispatch(setDragLocalPosition({
        UID: goalUID,
        newPositions: { x: newX, y: newY, t: window.innerHeight, b: window.innerHeight }
      }));
      setStartPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleDragEnd = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.type !== "mouseleave") {
      setIsDragging(false);
      dispatch(setLocalGoalDrag(goalUID)); // Stop dragging
    };
  };

  return (
    <div
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      className={`relative h-${dimensions.height} w-${dimensions.width}  hover:bg-opacity-60 bg-black rounded-lg bg-opacity-40 py-2 px-4 cursor-pointer shadow-lg ${isDragging ? 'dragging' : ''}`}
    >
      <GoalComponent goal={goal} />
    </div>
  );
};

export default GoalLayout;
