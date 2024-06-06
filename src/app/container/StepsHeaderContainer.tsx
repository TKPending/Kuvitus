import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

import ProgressionComponent from "../components/custom/progression/ProgressionComponent";
import { SubType } from "@/app/types/SubType";

const StepsHeaderContainer = () => {
  const subTasks: SubType[] = useSelector((state: RootState) => state.goal.goalSteps);

  return (
    <div className="sticky top-0 p-8 bg-black text-white flex items-center justify-between">
      <p className="text-3xl">Steps to achieving your goals</p>
      {subTasks.length > 0 && <ProgressionComponent subGoals={subTasks} />}
    </div>
  );
};

export default StepsHeaderContainer;
