import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { removeLocalGoal } from "@/app/redux/slices/localGoals/localGoalsSlice";
import SessionService from "@/services/sessionStorage/SessionService";

type Props = {
  goalUID: string;
  isFocused: boolean;
};

const GoalOptionsComponent = ({ goalUID, isFocused }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDeleteGoal = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(removeLocalGoal(goalUID));
    SessionService.deleteSessionGoal(goalUID);
    sessionStorage.removeItem("specificGoal");
    // Handle in backend
  };

  const handleEditGoal = (e: React.MouseEvent<HTMLDivElement>) => {
    router.push(`/goal/${goalUID}`);
  };

  const options = [
    { title: "View", handleChange: handleEditGoal },
    { title: "Delete", handleChange: handleDeleteGoal },
  ];

  return (
    isFocused && (
      <div className="flex gap-2">
        {options.map((option, index) => (
          <div key={index}
            onClick={option.handleChange}
            className={`${
              option.title === "Delete"
                ? "bg-red-400 hover:bg-kuvitus-uncomplete"
                : "bg-kuvitus-pending hover:bg-kuvitus-secondary-blue"
            } flex items-center justify-center transition duration-200 cursor-pointer rounded shadow-lg h-6 w-12 z-40`}
          >
            <p className="text-xs font-semibold">{option.title}</p>
          </div>
        ))}
      </div>
    )
  );
};

export default GoalOptionsComponent;
