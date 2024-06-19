import { useDispatch } from "react-redux";
import GoalStatusContainer from "./GoalStatusContainer";
import GoalDateComponent from "@/app/components/custom/date/GoalDateComponent";
import { setSubGoalDueDate, setSubGoalStatus } from "@/app/redux/slices/goal/goalSlice";

type Props = {
  subUID: string;
  status: number;
  dueDate: string;
};

const StatusDateContainer = ({ subUID, status, dueDate }: Props) => {
  const dispatch = useDispatch();

  const handleStatusChange = (option: number) => {
    dispatch(setSubGoalStatus({
        subUID,
        newStatus: option,
      }));
  };

  const handleDateChange = (newDate: string) => {
    dispatch(setSubGoalDueDate({
      subUID,
      newDate
    }));
  };

  return (
    <div className="flex gap-4">
      {status !== 1 && <GoalDateComponent dueDate={dueDate} handleDispatch={handleDateChange} />}
      <GoalStatusContainer status={status} handleDispatch={handleStatusChange} />
    </div>
  );
};

export default StatusDateContainer;
