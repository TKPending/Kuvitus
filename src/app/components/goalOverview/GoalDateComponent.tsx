import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import CalendarComponent from "@/app/components/custom/calendar/CalendarComponent";
import { setGoalDueDate } from "@/app/redux/slices/goal/goalSlice";
import { GoalType } from "@/app/types/GoalType";
import { daysUntilCompletion } from "@/app/util/daysUntilCompletion";
import { getDaysLeftStyle } from "@/app/util/getDaysLeftStyle";
import SessionService from "@/services/sessionStorage/SessionService";

const GoalDateComponent = () => {
  const dispatch = useDispatch();
  const darkMode: boolean = true;
  const { uID, dueDate, status, completeDate }: GoalType = useSelector((state: RootState) => state.goal);
  const remainingDays: number = daysUntilCompletion(dueDate);
  const remainingDaysSyle: { text: string; style: string } = getDaysLeftStyle(
    remainingDays,
    darkMode
  );
  const COMPLETED: number = 1;

  const handleDateChangeBackend = (newDate: string) => {
    if (status !== COMPLETED) {
      dispatch(setGoalDueDate(newDate));
      SessionService.updateValue(uID, "dueDate", newDate);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {status === 1 ? (
        <div className="flex flex-col flex-wrap items-center justify-center">
          {completeDate && (
            <p className="font-semibold flex items-center justify-center flex-col">
              Completed: <span className="text-green-600">{completeDate}</span>
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center w-32">
          <p className="text-base font-semibold">Due: {dueDate}</p>
          <p className={`font-semibold text-xs ${remainingDaysSyle.style}`}>
            {dueDate && remainingDaysSyle.text}
          </p>
        </div>
      )}

      {status != 1 && (
        <CalendarComponent
          dueDate={dueDate}
          handleDispatch={handleDateChangeBackend}
        />
      )}
    </div>
  );
};

export default GoalDateComponent;
