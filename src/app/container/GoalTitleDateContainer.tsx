import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import GoalDateComponent from "@/app/components/custom/date/GoalDateComponent";
import { setGoalDate } from "@/app/redux/slices/goal/goalSlice";
import { GoalType } from "@/app/types/GoalType";
import { daysUntilCompletion } from "../util/daysUntilCompletion";

const GoalTitleDateContainer = () => {
  const dispatch = useDispatch();
  const goal: GoalType | null = useSelector((state: RootState) => state.goal);
  const [daysRemaining, setDaysRemaining] = useState<number | null>(null);

  const handleDateChange = (newDate: string) => {
    dispatch(setGoalDate(newDate));
  };

  useEffect(() => {
    if (goal?.goalDueDate) {
      const remaining: number = daysUntilCompletion(goal.goalDueDate);
      setDaysRemaining(remaining);
    }
  }, [goal]);

  let daysRemainingText = "";
  let daysRemainingColor = "";

  if (daysRemaining === 0) {
    daysRemainingText = "Due Today";
    daysRemainingColor = "text-green-600";
  } else if (daysRemaining && daysRemaining < 0) {
    daysRemainingText = "Overdue";
    daysRemainingColor = "text-red-600";
  } else if (daysRemaining) {
    daysRemainingText = `${daysRemaining} days left`;
    daysRemainingColor = `${daysRemaining < 3 ? "text-red-600" : "text-black"}`
  }

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex flex-col items-center">
        <p className="text-2xl font-semibold">{goal?.goalDueDate}</p>
        <p className={`font-semibold text-xs ${daysRemainingColor}`}>{daysRemainingText}</p>
      </div>

      {goal?.goalDueDate && (
        <GoalDateComponent
          dueDate={goal.goalDueDate}
          handleDispatch={handleDateChange}
        />
      )}
    </div>
  );
};

export default GoalTitleDateContainer;
