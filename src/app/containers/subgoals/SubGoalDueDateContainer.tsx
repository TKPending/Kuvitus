import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
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
import SessionService from "@/app/services/sessionStorage/SessionService";

const COMPLETED: number = 1;
const PENDING: number = 2;

type Props = {
  subUID: string;
  dueDate: string;
  status: number;
};

const SubGoalDueDateContainer = ({ subUID, dueDate, status }: Props) => {
  const dispatch = useDispatch();
  const goalUID: string = useSelector((state: RootState) => state.goal.uID);

  const handleDueDateComplete = () => {
    const currentDate: string = getCurrentDate();
    dispatch(setSubGoalCompleteDate({
      subUID,
      completeDate: currentDate,
    }));
    SessionService.updateSubGoalValue(goalUID, subUID, "subCompleteDate", currentDate);
  };

  const handleStatusDispatch = (option: number) => {
    dispatch(setSubGoalStatus({
        subUID,
        newStatus: option,
      })
    );

    if (option === COMPLETED) {
      handleDueDateComplete();
    } else {
      dispatch(setSubGoalCompleteDate({
        subUID,  
        completeDate: "",
      }));
      SessionService.updateSubGoalValue(goalUID, subUID, "subCompleteDate", "");
    }
    SessionService.updateSubGoalValue(goalUID, subUID, "subStatus", option);
  };

  const handleDueDateDispatch = (newDate: string) => {
    dispatch(
      setSubGoalDueDate({
        subUID,
        newDate,
      })
    );
    if (status !== 1) {
      SessionService.updateSubGoalValue(goalUID, subUID, "subDueDate", newDate);
    };
  };

  const remainingDays: number = daysUntilCompletion(dueDate);
  const remainingDaysStyle: { text: string; style: string } = getDaysLeftStyle(remainingDays);

  return (
    <div className=" flex items-center justify-end px-8 w-full z-50">
      <div className="flex flex-col gap-2 justify-center items-center z-50">
        <div className="flex gap-4">
          {status !== 1 && (
            <CalendarComponent
              dueDate={dueDate}
              handleDispatch={handleDueDateDispatch}
            />
          )}
          <StatusComponent
            status={status}
            handleDispatch={handleStatusDispatch}
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
