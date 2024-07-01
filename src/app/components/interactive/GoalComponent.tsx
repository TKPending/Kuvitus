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
import TagsContainer from "@/app/containers/TagsContainer";
import TextInputComponent from "@/app/components/TextInputComponent";

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
  const { tags, title, dueDate, subGoals, status } = goal;
  const subGoalsAmount: number = subGoals.length;
  const completedSubGoals: number = subGoals.filter(
    (subGoal) => subGoal.subStatus === 1
  ).length;

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
      className={`relative w-300px flex flex-col overflow-auto gap-2 bg-kuvitus-secondary-blue hover:bg-kuvitus-primary-blue transition duration-400 rounded-lg bg-opacity-40 py-2 px-4 shadow-lg ${
        isDragging ? "cursor-move" : "cursor-pointer"
      }`}
    >
      <div className="flex items-center justify-center gap-8">
        <p className="font-semibold select-none min-w-[80px] max-w-[400px] text-base">
          {title}
        </p>

        {dueDate || subGoalsAmount > 0 ? (
          <div className="flex flex-col items-center gap-2">
            {tags.length > 0 && <TagsContainer tags={tags} button={false} />}
            {dueDate && status !== 1 && (
              <div className="flex items-center justify-center flex-col">
                <p className="text-xs">
                  Due Date: <span className="font-semibold">{dueDate}</span>
                </p>
                {subGoalsAmount > 0 && (
                  <p className="text-xs">
                    {completedSubGoals} / {subGoalsAmount} Tasks Completed
                  </p>
                )}
              </div>
            )}
            {status === 1 && (
              <p className="text-kuvitus-completed">Completed</p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GoalComponent;
