import { useState } from "react";
import { SubType } from "@/app/types/SubType";
import SubGoalFrontContainer from "@/app/container/SubGoalFrontContainer";
import SubGoalDropdownContainer from "@/app/container/SubGoalDropdownContainer";
import DeleteSubGoalButtonComponent from "@/app/components/DeleteSubGoalButtonComponent";
import ConfirmDeletionComponent from "../components/custom/subgoal/ConfirmDeletionComponent";

type Props = {
  subGoal: SubType;
};

const SubGoalLayout = ({ subGoal }: Props) => {
  const subGoalUID: string = subGoal.subUID;
  const [isDeleteClicked, setIsDeleteClicked] = useState<boolean>(false);

  const handleGoalDelete = () => {
    setIsDeleteClicked(!isDeleteClicked);
  };

  return (
    <div className="flex flex-col my-4">
      {!isDeleteClicked ? (
        <DeleteSubGoalButtonComponent onDelete={handleGoalDelete} />
      ) : (
        <ConfirmDeletionComponent subGoalUID={subGoalUID} onClickState={handleGoalDelete} />
      )}
      <SubGoalFrontContainer
        UID={subGoalUID}
        title={subGoal.subTitle}
        tags={subGoal.subTags}
        dueDate={subGoal.subDueDate}
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
