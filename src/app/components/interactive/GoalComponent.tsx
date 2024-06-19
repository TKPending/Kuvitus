import { GoalType } from "@/app/types/GoalType";
import { SubType } from "@/app/types/SubType";
import ProgressionComponent from "@/app/components/custom/progression/ProgressionComponent";
import TagsContainer from "@/app/container/TagsContainer";

type Props = {
  goal: GoalType;
};

const GoalComponent = ({ goal }: Props) => {
  const title: string = goal.goalTitle || "Enter goal here";
  const dueDate: string = goal.goalDueDate;
  const subGoals: SubType[] = goal.goalSteps;
  const tags: string[] = goal.goalTags;

  return (
    <div className="flex flex-col gap-2">
      {tags.length > 0 &&  <TagsContainer tags={tags} button={false} />}
      <div className="flex items-center justify-center gap-8">
        <p className="font-semibold select-none">{title}</p>

        {dueDate || subGoals.length > 0 ? (
          <div className="flex flex-col items-center gap-2">
            {subGoals.length > 0 && (
              <ProgressionComponent subGoals={subGoals} />
            )}
            {dueDate && (
              <p className="text-xs">
                Due Date: <span className="font-semibold">{dueDate}</span>
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default GoalComponent;
