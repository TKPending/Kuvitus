"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import GoalContainer from "./GoalContainer";
import GoalButtonComponent from "@/app/components/GoalButtonComponent";
import { LocalGoalType } from "@/app/types/LocalGoalType";
import { removeLocalGoal, setLocalGoalFocused, setLocalGoalUnfocused } from "@/app/redux/slices/localGoals/localGoalsSlice";

type Props = {
  goal: LocalGoalType;
};

const ActiveGoalContainer = ({ goal }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const goalUID: string = goal.goal.goalUID;
  const position: { x: number, y: number, t: number, b: number } = goal.position;
  const isFocused: boolean = goal.isFocused;

  const handleDetailedGoalVisibility = () => {
    if (isFocused) {
      dispatch(setLocalGoalUnfocused(goalUID));
    } else {
      dispatch(setLocalGoalFocused(goalUID));
    };
  };

  const handleDeleteGoal = () => {
    console.log("Delete Task");
    dispatch(removeLocalGoal(goalUID));
    // Activate modal
  };

  const handleTitleChange = () => {
    console.log("Change task title");
  };

  const handleEditGoal = () => {
    console.log("Edit Goal");
    // Redirect user
    router.push(`/goal/${goalUID}`);
  };

  return (
    <div className="absolute flex items-end justify-center flex-col gap-2 transition-transform duration-100 ease-linear"
        style={{ 
          left: `${position.x}px`,
          right: `${position.y}px`,
          top: `${position.t}px`,
          bottom: `${position.b}px`,
        }}
    >
      {isFocused && (
        <div className="flex gap-2">
          <GoalButtonComponent title="Title" onClick={handleDeleteGoal} />
          <GoalButtonComponent title="View" onClick={handleEditGoal} />
          <GoalButtonComponent title="Delete" onClick={handleDeleteGoal} />
        </div>
      )}

      <GoalContainer goal={goal.goal} onClick={handleDetailedGoalVisibility} />
    </div>
  );
};

export default ActiveGoalContainer;
