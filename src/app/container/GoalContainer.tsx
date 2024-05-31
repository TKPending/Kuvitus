import BasicGoalComponent from "@/app/components/custom/goal/BasicGoalComponent";
import MediumGoalComponent from "@/app/components/custom/goal/MediumGoalComponent";
import AdvancedGoalComponent from "@/app/components/custom/goal/AdvancedGoalComponent";
import TagsComponent from "@/app/components/TagsComponent";
import { BASIC, MEDIUM, ADVANCED } from "@/temp/tempGoalData";
import { GoalType } from "../types/GoalType";

type Props = {
  goal: GoalType;
  onClick: () => void;
};

const GoalContainer = ({ goal, onClick }: Props) => {
  return (
    <div onClick={onClick} className={`relative h-auto hover:bg-opacity-60 bg-black rounded-lg bg-opacity-40 py-2 px-4 cursor-pointer shadow-lg`}>
      <div className="w-full px-2 flex justify-end gap-2">
        {goal.goalTags.map((topic: string, index: number) => (
          <TagsComponent key={index} title={topic} />
        ))}
      </div>
      {goal.goalDepth === "basic" && <BasicGoalComponent />}
      {goal.goalDepth === "medium" && <MediumGoalComponent dueDate={goal.goalDueDate} />}
      {goal.goalDepth === "advanced" && <AdvancedGoalComponent dueDate={goal.goalDueDate} subGoals={goal.goalSteps} />}
    </div>
  );
};

export default GoalContainer;
