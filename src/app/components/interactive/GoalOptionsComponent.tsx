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

  const options = [
    { title: "Title", handleChange: handleTitleClick },
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
                ? "bg-red-400"
                : option.title === "View"
                ? "bg-neutral-200"
                : "bg-neutral-200"
            } flex items-center justify-center cursor-pointer rounded shadow-lg h-6 w-12 z-50`}
          >
            <p className="text-xs font-semibold">{option.title}</p>
          </div>
        ))}
      </div>
    )
  );
};

export default GoalOptionsComponent;
