import { useDispatch } from "react-redux";
import { daysUntilCompletion } from "@/app/util/daysUntilCompletion";
import GoalStatusContainer from "./GoalStatusContainer";
import { setSubGoalStatus } from "../redux/slices/goal/goalSlice";

const COMPLETED: number = 1;
const PENDING: number = 2;

type Props = {
  subUID: string;
  dueDate: string;
  status: number;
};

const SubGoalDateContainer = ({ subUID, dueDate, status }: Props) => {
    const dispatch = useDispatch();
  const remainingDays: number = daysUntilCompletion(dueDate);

  const handleStatusChange = (option: number) => {
    dispatch(setSubGoalStatus({
        subUID,
        newStatus: option,
    }));
  };

  return (
    <div className="w-full flex items-center justify-end px-8">
      <div className="flex flex-col gap-2 items-center justify-center">
        <GoalStatusContainer status={status} handleDispatch={(option) => handleStatusChange(option)} />
        {status !== COMPLETED && status !== PENDING  && dueDate && (
          <p className="flex items-center gap-2">
            {dueDate}{" "}
            {remainingDays > 0 ? (
              <span
                className={`text-xs ${
                  remainingDays > 3 ? "text-neutral-200" : "text-red-800"
                }`}
              >
                {remainingDays} left
              </span>
            ) : (
              <span className="text-xs text-red-200">Overdue</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default SubGoalDateContainer;
