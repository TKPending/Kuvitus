import { useDispatch } from "react-redux";
import StatusComponent from "@/app/components/StatusComponent";
import CalendarComponent from "@/app/components/custom/calendar/CalendarComponent";
import { daysUntilCompletion } from "@/app/util/daysUntilCompletion";
import { getDaysLeftStyle } from "@/app/util/getDaysLeftStyle";
import {
  setSubGoalCompleteDate,
  setSubGoalDueDate,
  setSubGoalStatus,
} from "@/app/redux/slices/goal/goalSlice";
import { getCurrentDate } from "@/app/util/getCurrentDate";

const COMPLETED: number = 1;
const PENDING: number = 2;

type Props = {
  subUID: string;
  dueDate: string;
  status: number;
};

const SubGoalDueDateContainer = ({ subUID, dueDate, status }: Props) => {
  const dispatch = useDispatch();
  const remainingDays: number = daysUntilCompletion(dueDate);
  const remainingDaysStyle: { text: string; style: string } = getDaysLeftStyle(remainingDays);

  const handleStatusChange = (option: number) => {
    dispatch(
      setSubGoalStatus({
        subUID,
        newStatus: option,
      })
    );
    if (option === COMPLETED) {
      const completeDate: string = getCurrentDate();
      dispatch(setSubGoalCompleteDate({
        subUID,
        completeDate,
      }))
    }
  };

  const handleDateChange = (newDate: string) => {
    dispatch(
      setSubGoalDueDate({
        subUID,
        newDate,
      })
    );
  };

  return (
    <div className="flex items-center justify-end px-8 w-full">
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="flex gap-4">
          {status !== 1 && (
            <CalendarComponent
              dueDate={dueDate}
              handleDispatch={handleDateChange}
            />
          )}
          <StatusComponent
            status={status}
            handleDispatch={handleStatusChange}
          />
        </div>

        {status !== COMPLETED && status !== PENDING && dueDate && (
          <p className={`flex items-center justify-center gap-2 text-center`}>
            {dueDate}{" "}
            <span className={`${remainingDaysStyle.style}`}>
              {remainingDaysStyle.text}
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default SubGoalDueDateContainer;
