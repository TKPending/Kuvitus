import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import ProgressionComponent from "@/app/components/custom/progression/ProgressionComponent";
import { SubType } from "@/app/types/SubType";

const SubGoalHeaderComponent = () => {
  const subGoals: SubType[] = useSelector((state: RootState) => state.goal.subGoals);

  return (
    <div className="sticky top-0 p-8 bg-kuvitus-primary-blue text-white flex items-center justify-between rounded-tr-xl rounded-tl-xl">
      <p className="text-xl lg:text-3xl">Steps to achieving your goals</p>
      {subGoals.length > 0 && <ProgressionComponent subGoals={subGoals} />}
    </div>
  );
};

export default SubGoalHeaderComponent;
