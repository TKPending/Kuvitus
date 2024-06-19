import { useDispatch } from "react-redux";
import React, { useState } from "react";
import {
  setLocalGoalFocused,
  setLocalGoalUnfocused,
} from "@/app/redux/slices/localGoals/localGoalsSlice";
import { GoalType } from "@/app/types/GoalType";
import {
  setDragLocalPosition,
  setLocalGoalDrag,
} from "@/app/redux/slices/localGoals/localGoalsSlice";
import { getGoalDimensions } from "@/app/util/getGoalDimensions";
import TagsContainer from "../../container/TagsContainer";
import ProgressionComponent from "@/app/components/custom/progression/ProgressionComponent";


type Props = {
  goalUID: string;
  isFocused: boolean;
  goal: GoalType;
};

const GoalComponent = ({ goalUID, isFocused, goal }: Props) => {
  const dispatch = useDispatch();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const { tags, title, dueDate, subGoals } = goal;
  const dimensions: { height: number; width: number } = getGoalDimensions(
    goal.goalDepth
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setStartPos({ x: e.clientX, y: e.clientY });
    dispatch(setLocalGoalDrag(goalUID)); // Start dragging
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1) {
      const dx = Math.abs(e.clientX - startPos.x);
      const dy = Math.abs(e.clientY - startPos.y);
      if (dx > 5 || dy > 5) {
        // Considered as drag if moved more than 5px
        setIsDragging(true);
      }
    }

    if (isDragging) {
      const newX = e.clientX - startPos.x;
      const newY = e.clientY - startPos.y;
      dispatch(
        setDragLocalPosition({
          UID: goalUID,
          newPositions: {
            x: newX,
            y: newY,
            t: window.innerHeight,
            b: window.innerHeight,
          },
        })
      );
      setStartPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleDetailedGoalVisibility = () => {
    if (isFocused) {
      dispatch(setLocalGoalUnfocused(goalUID));
    } else {
      dispatch(setLocalGoalFocused(goalUID));
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) {
      handleDetailedGoalVisibility();
    } else {
      setIsDragging(false);
      dispatch(setLocalGoalDrag(goalUID)); // Stop isDragging
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className={`relative flex flex-col fap-2 h-${dimensions.height} w-${
        dimensions.width
      }  hover:bg-opacity-60 bg-black rounded-lg bg-opacity-40 py-2 px-4 shadow-lg ${
        isDragging ? "cursor-move" : "cursor-pointer"
      }`}
    >
      {tags.length > 0 && <TagsContainer tags={tags} button={false} />}
      <div className="flex items-center justify-center gap-8">
        <p className="font-semibold select-none">{title}</p>

        {dueDate || subGoals.length > 0 ? (
          <div className="flex flex-col items-center gap-2">
            {subGoals.length > 0 && (
              <ProgressionComponent subGoals={subGoals} />
            )}
            {dueDate && (
              <p className="text-xs">
                Due Date: <span className="font-semibold">{dueDate}</span>
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GoalComponent;
