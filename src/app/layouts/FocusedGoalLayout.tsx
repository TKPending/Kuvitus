import GoalContainer from "@/app/container/GoalContainer";
import GoalOptionsContainer from "@/app/container/GoalOptionsContainer";
import { LocalGoalType } from "@/app/types/LocalGoalType";
import { PositionType } from "@/app/types/PositionType";
import { GoalType } from "@/app/types/GoalType";

type Props = {
  goal: LocalGoalType;
};

const FocusedGoalLayout = ({ goal }: Props) => {
  const goalUID: string = goal.goal.goalUID;
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
      <GoalOptionsContainer goalUID={goalUID} isFocused={isFocused} />
      <GoalContainer
        goalUID={goalUID}
        isFocused={isFocused}
        position={position}
        goal={actualGoal}
      />
    </div>
  );
};

export default FocusedGoalLayout;
