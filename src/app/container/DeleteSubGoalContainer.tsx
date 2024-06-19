import { useState } from "react";
import DeleteSubGoalButtonComponent from "@/app/components/subgoals/DeleteSubGoalButtonComponent";
import ConfirmDeletionComponent from "@/app/components/subgoals/ConfirmDeletionComponent";

type Props = {
  subGoalUID: string;
};

const DeleteSubGoalContainer = ({ subGoalUID }: Props) => {
  const [isDeleteClicked, setIsDeleteClicked] = useState<boolean>(false);

  const handleGoalDelete = () => {
    setIsDeleteClicked(!isDeleteClicked);
  };

  return (
    <>
      {!isDeleteClicked ? (
        <DeleteSubGoalButtonComponent onDelete={handleGoalDelete} />
      ) : (
        <ConfirmDeletionComponent
          subGoalUID={subGoalUID}
          onClickState={handleGoalDelete}
        />
      )}
    </>
  );
};

export default DeleteSubGoalContainer;
