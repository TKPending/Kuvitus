import { SubType } from "@/app/types/SubType";
import SubGoalFrontContainer from "@/app/containers/subgoals/SubGoalFrontContainer";
import SubGoalDropdownContainer from "@/app/containers/subgoals/SubGoalDropdownContainer";
import DeleteSubGoalContainer from "@/app/containers/subgoals/DeleteSubGoalContainer";
import { CSSTransition } from 'react-transition-group';

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

      <CSSTransition
        in={subGoal.isPressed}
        timeout={300}
        classNames="dropdown"
        unmountOnExit
      >
        <SubGoalDropdownContainer
          UID={subGoalUID}
          details={subGoal.subDetails}
          dueDate={subGoal.subDueDate}
          status={subGoal.subStatus}
          tags={subGoal.subTags}
        />
      </CSSTransition>
    </div>
  );
};

export default SubGoalLayout;
