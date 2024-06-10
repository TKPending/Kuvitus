import { SubType } from "@/app/types/SubType";
import SubGoalFrontContainer from "@/app/container/SubGoalFrontContainer";
import SubGoalDropdownContainer from "@/app/container/SubGoalDropdownContainer";
import DeleteSubGoalContainer from "../container/DeleteSubGoalContainer";

type Props = {
  subGoal: SubType;
};

const SubGoalLayout = ({ subGoal }: Props) => {
  const subGoalUID: string = subGoal.subUID;

  return (
    <div className="flex flex-col my-4">
      {subGoal.isPressed && <DeleteSubGoalContainer subGoalUID={subGoalUID} />}
      
      <SubGoalFrontContainer
        UID={subGoalUID}
        title={subGoal.subTitle}
        tags={subGoal.subTags}
        dueDate={subGoal.subDueDate}
        status={subGoal.subStatus}
        isPressed={subGoal.isPressed}
      />

      {subGoal.isPressed && (
        <SubGoalDropdownContainer
          UID={subGoalUID}
          details={subGoal.subDetails}
          dueDate={subGoal.subDueDate}
          status={subGoal.subStatus}
          tags={subGoal.subTags}
        />
      )}
    </div>
  );
};

export default SubGoalLayout;
