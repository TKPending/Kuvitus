import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import GoalOptionComponent from "@/app/components/interactive/GoalOptionComponent";
import { removeLocalGoal } from "@/app/redux/slices/localGoals/localGoalsSlice";

type Props = {
  goalUID: string;
  isFocused: boolean;
};

const GoalOptionsContainer = ({ goalUID, isFocused }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDeleteGoal = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(removeLocalGoal(goalUID));
    // Handle in backend
  };

  const handleEditGoal = (e: React.MouseEvent<HTMLDivElement>) => {
    router.push(`/goal/${goalUID}`);
  };

  const handleTitleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("Hello There");
    // Handle title click if necessary
    // Handle in backend
  };

  return (
    isFocused && (
      <div className="flex gap-2">
        <GoalOptionComponent title="Title" onClick={handleTitleClick} />
        <GoalOptionComponent title="View" onClick={handleEditGoal} />
        <GoalOptionComponent title="Delete" onClick={handleDeleteGoal} />
      </div>
    )
  );
};

export default GoalOptionsContainer;
