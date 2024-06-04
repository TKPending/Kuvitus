import ProgressionComponent from "@/app/components/custom/progression/ProgressionComponent";
import { SubType } from "@/app/types/SubType";

type Props = {
    title?: string;
    dueDate: string;
    subGoals: SubType[];
  };
  
  const AdvancedGoalComponent = ({ title, dueDate, subGoals }: Props) => {
    return (
      <div className="h-full w-full flex items-center text-center gap-4 py-2">
        <p className="font-semibold select-none">{!title ? "An Adavnaced Goal Has Been Created" : title}</p>

        <div className="flex flex-col items-center gap-4 w-1/2">
            <ProgressionComponent subGoals={subGoals}  />
            <p className="text-base">by {dueDate}</p>
        </div>
      </div>
    );
  };
  
  export default AdvancedGoalComponent;
  