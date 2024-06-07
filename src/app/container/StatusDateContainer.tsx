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
    <div className="flex px-8 gap-6">
      <GoalStatusContainer status={status} handleDispatch={handleStatusChange} />
      <GoalDateComponent dueDate={dueDate} handleDispatch={handleDateChange} />
    </div>
  );
};

export default StatusDateContainer;
