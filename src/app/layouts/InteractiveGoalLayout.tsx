import GoalComponent from "@/app/components/interactive/GoalComponent";
import GoalOptionsComponent from "@/app/components/interactive/GoalOptionsComponent";
import { LocalGoalType } from "@/app/types/LocalGoalType";
import { PositionType } from "@/app/types/PositionType";
import { GoalType } from "@/app/types/GoalType";

type Props = {
  goal: LocalGoalType;
};

const InteractiveGoalLayout = ({ goal }: Props) => {
  const goalUID: string = goal.goal.uID;
  const isFocused: boolean = goal.isFocused;
  const position: PositionType = goal.position;
  const actualGoal: GoalType = goal.goal;

  return (
    <div
      className="absolute flex items-end justify-center flex-col gap-2 transition-transform duration-100 ease-linear z-0"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <GoalOptionsComponent goalUID={goalUID} isFocused={isFocused} />
      <GoalComponent
      goalUID={goalUID}
      isFocused={isFocused}
      goal={actualGoal}
      />
    </div>
  );
};

export default InteractiveGoalLayout;
