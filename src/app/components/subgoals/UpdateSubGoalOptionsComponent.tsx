import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import {
  addSubGoal,
  removeAllSubGoals,
} from "@/app/redux/slices/goal/goalSlice";
import { SubType } from "@/app/types/SubType";
import SessionService from "@/services/sessionStorage/SessionService";

const UpdateSubGoalOptionsComponent = () => {
  const dispatch = useDispatch();
  const { uID } = useSelector((state: RootState) => state.goal);
  const [deleteClicked, setDeleteClicked] = useState<boolean>(false);

  const handleClicked = () => {
    setDeleteClicked(!deleteClicked);
  }

  const handleDeleteAll = () => {
    dispatch(removeAllSubGoals());
    SessionService.updateValue(uID, "subGoals", []);
    handleClicked();
  };

  const handleAddSubGoal = () => {
    const subUID = uuid();
    dispatch(addSubGoal(subUID));
    const subGoalData: SubType = {
      subUID,
      subTitle: "Enter goal title",
      subDetails: "Enter details about the subgoal you want to achieve",
      subStatus: 2,
      subTags: [],
      subDueDate: "",
      subCompleteDate: "",
      isPressed: false,
    };
    SessionService.addSubGoal(uID, subGoalData);
  };

  return (
    <div className="sticky z-40 top-0 bg-kuvitus-sub-background flex items-center justify-end py-2">
      <div className="h-full flex flex-col items-center justify-center gap-2 ">
        {deleteClicked && (
          <div className="flex gap-2 ">
            <p onClick={handleClicked} className="cursor-pointer">Cancel</p>
            <p>/</p>
            <p onClick={handleDeleteAll} className="cursor-pointer text-kuvitus-uncomplete">
              Confirm
            </p>
          </div>
        )}
        <div className="flex gap-2">
          <div
            onClick={handleAddSubGoal}
            className="cursor-pointer bg-kuvitus-completed  p-2 rounded-xl"
          >
            Add Goal
          </div>
          <div
            onClick={handleClicked}
            className="cursor-pointer bg-kuvitus-uncomplete p-2 rounded-xl"
          >
            Delete All
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubGoalOptionsComponent;
