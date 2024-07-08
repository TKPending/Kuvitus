import { useDispatch, useSelector } from "react-redux";
import {v4 as uuid} from 'uuid';
import { addSubGoal } from "@/app/redux/slices/goal/goalSlice";
import SessionService from "@/services/sessionStorage/SessionService";
import { GoalType } from "@/app/types/GoalType";
import { RootState } from "@/app/redux/store";
import { SubType } from "@/app/types/SubType";

const AddSubGoalButtonComponent = () => {
  const dispatch = useDispatch();
  const { uID }: GoalType = useSelector((state: RootState) => state.goal);

  const handleAddSubGoal = () => {
    const subUID = uuid();
    dispatch(addSubGoal(subUID));
    const subGoalData: SubType = {
      subUID,
      subTitle: "Enter goal title",
      subDetails: "Enter details about the subgoal you want to achieve",
      subStatus: 2,
      subTags: [],
      subDueDate: "",
      subCompleteDate: "",
      isPressed: false,
      
    }
    SessionService.addSubGoal(uID, subGoalData);
  };

  return (
    <div className="text-white my-10 flex items-center justify-center text-xl">
      <p onClick={handleAddSubGoal} className="cursor-pointer hover:scale-105 transition duration-200 bg-kuvitus-primary-blue p-4 rounded-lg font-semibold">
        Add a sub goal
      </p>
    </div>
  );
};

export default AddSubGoalButtonComponent;
