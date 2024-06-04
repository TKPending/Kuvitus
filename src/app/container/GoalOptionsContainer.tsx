import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import GoalButtonComponent from "@/app/components/GoalButtonComponent";
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
      };
    
      const handleEditGoal = (e: React.MouseEvent<HTMLDivElement>) => {
        router.push(`/goal/${goalUID}`);
      };
    
      const handleTitleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log("Hello There");
        // Handle title click if necessary
      };

    return isFocused && (
        <div className="flex gap-2">
          <GoalButtonComponent title="Title" onClick={handleTitleClick} />
          <GoalButtonComponent title="View" onClick={handleEditGoal} />
          <GoalButtonComponent title="Delete" onClick={handleDeleteGoal} />
        </div>
      )
};

export default GoalOptionsContainer;
