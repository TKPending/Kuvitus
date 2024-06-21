import { useDispatch, useSelector } from "react-redux";
import { removeSubGoal } from "@/app/redux/slices/goal/goalSlice";
import SessionService from "@/services/sessionStorage/SessionService";
import { GoalType } from "@/app/types/GoalType";
import { RootState } from "@/app/redux/store";

type Props = {
  subGoalUID: string;
  onClickState: () => void;
};

const ConfirmDeletionComponent = ({ subGoalUID, onClickState }: Props) => {
  const dispatch = useDispatch();
  const { uID }: GoalType = useSelector((state: RootState) => state.goal);

  const handleGoalDeletion = async () => {
    // Remove from Redux
    dispatch(removeSubGoal(subGoalUID));

    // Handle in backend
    SessionService.removeSubGoal(uID, subGoalUID);

    onClickState();
  };

  return (
    <div className="h-12 w-full flex items-center justify-end gap-4">
      <p>Are you sure you want to delete this sub goal?</p>

      <div className="flex gap-2 transition duration-200 font-semibold">
        <p
          onClick={handleGoalDeletion}
          className="text-green-600 hover:text-green-800 cursor-pointer"
        >
          Yes
        </p>
        <p>/</p>
        <p
          onClick={onClickState}
          className="text-red-600 hover:text-green-800 cursor-pointer"
        >
          No
        </p>
      </div>
    </div>
  );
};

export default ConfirmDeletionComponent;
