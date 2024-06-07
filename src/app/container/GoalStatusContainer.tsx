import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setGoalStatus } from "@/app/redux/slices/goal/goalSlice";

type Props = {
  subGoal?: boolean;
  onSave?: () => void;
};

const GoalStatusContainer = ({ subGoal=false, onSave }: Props) => {
  const dispatch = useDispatch();
  const status: number = useSelector((state: RootState) => state.goal.goalStatus);
  const [progressClicked, setProgressClicked] = useState<boolean>(false);
  const options: string[] = ["Uncomplete", "Completed", "Pending"];

  const handleOptionClick = (option: number) => {
    dispatch(setGoalStatus(option))
    setProgressClicked(false); 
  };

  return (
    <div className="relative">
      <p
        className={`p-2 cursor-pointer rounded-lg text-white ${status === 0 ? "bg-red-600" : status === 1 ? "bg-green-600" : "bg-neutral-400"}`}
        onClick={() => setProgressClicked(!progressClicked)} // Toggle dropdown visibility
      >
        {status === 0 ? "Uncomplete" : status === 1 ? "Completed" : "Pending"}
      </p>
      {progressClicked && (
        <div className="absolute top-full left-0 mt-1 bg-white shadow-md rounded-md">
          {options.map((option: string, index: number) => (
            <p
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionClick(index)}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalStatusContainer;
