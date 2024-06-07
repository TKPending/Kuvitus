import { useDispatch } from "react-redux";
import { addSubGoal } from "@/app/redux/slices/goal/goalSlice";

const AddSubGoalButtonComponent = () => {
  const dispatch = useDispatch();

  const handleAddSubGoal = async () => {
    // Get UID from database and place in function
    dispatch(addSubGoal("8"));
  };

  return (
    <div className="text-white my-10 flex items-center justify-center text-2xl">
      <p onClick={handleAddSubGoal} className="cursor-pointer hover:scale-105 transition duration-200 bg-black p-4 rounded-lg font-semibold">
        Add a sub goal
      </p>
    </div>
  );
};

export default AddSubGoalButtonComponent;
