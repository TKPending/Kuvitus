import { useDispatch } from "react-redux";
import GoalStatusContainer from "./GoalStatusContainer";
import GoalDate from "@/app/components/custom/date/GoalDate";
import { setSubGoalStatus } from "../redux/slices/goal/goalSlice";

type Props = {
  subUID: string;
  status: number;
};

const StatusDateContainer = ({ subUID, status }: Props) => {
  const dispatch = useDispatch();

  const handleStatusChange = (option: number) => {
    dispatch(setSubGoalStatus({
        subUID,
        newStatus: option,
      }));
  };

  return (
    <div className="flex px-8 gap-6">
      <GoalStatusContainer status={status} handleDispatch={(option) => handleStatusChange(option)} />
      <GoalDate />
    </div>
  );
};

export default StatusDateContainer;
