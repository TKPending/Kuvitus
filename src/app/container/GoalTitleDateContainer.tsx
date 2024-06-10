import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import GoalDateComponent from "@/app/components/custom/date/GoalDateComponent";
import { setGoalDate } from "@/app/redux/slices/goal/goalSlice";
import { GoalType } from "@/app/types/GoalType";
import { daysUntilCompletion } from "@/app/util/daysUntilCompletion";
import { getDaysLeftStyle } from "../util/getDaysLeftStyle";

const GoalTitleDateContainer = () => {
  const dispatch = useDispatch();
  const darkMode: boolean = true;
  const goal: GoalType | null = useSelector((state: RootState) => state.goal);
  const remainingDays: number = daysUntilCompletion(goal.goalDueDate);
  const remainingDaysSyle: { text: string, style: string } = getDaysLeftStyle(remainingDays, darkMode);

  const handleDateChange = (newDate: string) => {
    dispatch(setGoalDate(newDate));
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex flex-col items-center">
        <p className="text-2xl font-semibold">{goal?.goalDueDate}</p>
        <p className={`font-semibold text-xs ${remainingDaysSyle.style}`}>{remainingDaysSyle.text}</p>
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
