import React, { useState } from "react";
import { useDispatch } from "react-redux";
import BasicGoalComponent from "@/app/components/custom/goal/BasicGoalComponent";
import MediumGoalComponent from "@/app/components/custom/goal/MediumGoalComponent";
import AdvancedGoalComponent from "@/app/components/custom/goal/AdvancedGoalComponent";
import TagsComponent from "@/app/components/TagsComponent";
import { GoalType } from "@/app/types/GoalType";
import { setDragLocalPosition, setLocalGoalDrag } from "@/app/redux/slices/localGoals/localGoalsSlice";

type Props = {
  goal: GoalType;
};

const GoalContainer = ({ goal }: Props) => {
  const dispatch = useDispatch();
  const goalUID = goal.goalUID;
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

  const handleDragEnd = () => {
    setIsDragging(false);
    dispatch(setLocalGoalDrag(goalUID)); // Stop dragging
  };

  return (
    <div
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      className={`relative h-auto hover:bg-opacity-60 bg-black rounded-lg bg-opacity-40 py-2 px-4 cursor-pointer shadow-lg ${isDragging ? 'dragging' : ''}`}
    >
      <div className="w-full px-2 flex justify-end gap-2">
        {goal.goalTags.map((topic, index) => (
          <TagsComponent key={index} title={topic} />
        ))}
      </div>
      {goal.goalDepth === "basic" && <BasicGoalComponent />}
      {goal.goalDepth === "medium" && <MediumGoalComponent dueDate={goal.goalDueDate} />}
      {goal.goalDepth === "advanced" && <AdvancedGoalComponent dueDate={goal.goalDueDate} subGoals={goal.goalSteps} />}
    </div>
  );
};

export default GoalContainer;
