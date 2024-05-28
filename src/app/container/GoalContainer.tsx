import BasicGoalComponent from "@/app/components/custom/goal/BasicGoalComponent";
import MediumGoalComponent from "@/app/components/custom/goal/MediumGoalComponent";
import AdvancedGoalComponent from "@/app/components/custom/goal/AdvancedGoalComponent";
import TagsComponent from "@/app/components/TagsComponent";
import { BASIC, MEDIUM, ADVANCED } from "@/temp/tempGoalData";
import { GoalType } from "../types/GoalType";

type Props = {
  onClick: () => void;
};

const GoalContainer = ({ onClick }: Props) => {
  const goal: GoalType = ADVANCED;

  return (
    <div onClick={onClick} className={`relative h-auto bg-black rounded-lg bg-opacity-40 py-2 px-4 cursor-pointer shadow-lg`}>
      <div className="w-full px-2 flex justify-end gap-2">
        {goal.goalTags.map((topic: string, index: number) => (
          <TagsComponent key={index} title={topic} />
        ))}
      </div>
      {goal.goalDepth === "basic" && <BasicGoalComponent />}
      {goal.goalDepth === "medium" && <MediumGoalComponent dueDate={goal.goalDueDate} />}
      {goal.goalDepth === "advanced" && <AdvancedGoalComponent dueDate={goal.goalDueDate} />}
    </div>
  );
};

export default GoalContainer;
