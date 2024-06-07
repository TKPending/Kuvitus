import { useState } from "react";
import DeleteSubGoalButtonComponent from "../components/DeleteSubGoalButtonComponent";
import ConfirmDeletionComponent from "../components/custom/subgoal/ConfirmDeletionComponent";

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
