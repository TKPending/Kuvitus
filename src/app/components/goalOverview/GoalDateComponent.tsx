import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import CalendarComponent from "@/app/components/custom/calendar/CalendarComponent";
import { setGoalDate } from "@/app/redux/slices/goal/goalSlice";
import { GoalType } from "@/app/types/GoalType";
import { daysUntilCompletion } from "@/app/util/daysUntilCompletion";
import { getDaysLeftStyle } from "@/app/util/getDaysLeftStyle";

const GoalDateComponent = () => {
  const dispatch = useDispatch();
  const darkMode: boolean = true;
  const goal: GoalType | null = useSelector((state: RootState) => state.goal);
  const remainingDays: number = daysUntilCompletion(goal.dueDate);
  const remainingDaysSyle: { text: string, style: string } = getDaysLeftStyle(remainingDays, darkMode);

  const handleDateChange = (newDate: string) => {
    dispatch(setGoalDate(newDate));
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <div className="flex flex-col items-center">
        <p className="text-2xl font-semibold">{goal?.dueDate}</p>
        <p className={`font-semibold text-xs ${remainingDaysSyle.style}`}>{remainingDaysSyle.text}</p>
      </div>

      {goal?.dueDate && (
        <CalendarComponent
          dueDate={goal.dueDate}
          handleDispatch={handleDateChange}
        />
      )}
    </div>
  );
};

export default GoalDateComponent;
