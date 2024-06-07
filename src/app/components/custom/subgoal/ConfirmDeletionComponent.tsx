import { useDispatch } from "react-redux";
import { removeSubGoal } from "@/app/redux/slices/goal/goalSlice";

type Props = {
    subGoalUID: string;
    onClickState: () => void;
};

const ConfirmDeletionComponent = ({ subGoalUID, onClickState }: Props) => {
    const dispatch = useDispatch();

    const handleGoalDeletion = async () => {
        // Remove from Redux
        dispatch(removeSubGoal(subGoalUID));

        onClickState();
    };

  return (
    <div className="h-12 w-full flex items-center justify-end gap-4">
      <p>Are you sure you want to delete this sub goal?</p>

      <div className="flex gap-2 transition duration-200 font-semibold">
        <p onClick={handleGoalDeletion} className="text-green-600 hover:text-green-800 cursor-pointer">Yes</p>
        <p>/</p>
        <p onClick={onClickState} className="text-red-600 hover:text-green-800 cursor-pointer">No</p>
      </div>
    </div>
  );
};

export default ConfirmDeletionComponent;
