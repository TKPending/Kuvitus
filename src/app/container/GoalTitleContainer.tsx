import React from "react";
import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import ReturnHomeComponent from "@/app/components/ReturnHomeComponent";
import TextInputComponent from "@/app/components/TextInputComponent";
import { setGoalStatus, setGoalTitle } from "@/app/redux/slices/goal/goalSlice";
import GoalStatusContainer from "./GoalStatusContainer";
import GoalDateComponent from "@/app/components/goalOverview/GoalDateComponent";

const GoalTitleContainer = () => {
  const dispatch = useDispatch();
  const title: string = useSelector((state: RootState) => state.goal.goalTitle);
  const status: number = useSelector((state: RootState) => state.goal.goalStatus);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue: string = e.target.value;
    dispatch(setGoalTitle(newValue));
  };

  const handleOnSave = async () => {};

  const handleStatusChange = (option: number) => {
    dispatch(setGoalStatus(option));
  }

  return (
    <div className="flex h-auto items-center gap-6">
      <ReturnHomeComponent />
      <GoalStatusContainer status={status} handleDispatch={(option) => handleStatusChange(option)} />
      <TextInputComponent
        text={title}
        size="text-4xl"
        customStyle="font-semibold flex-wrap"
        onSave={handleOnSave}
        onChange={handleOnChange}
      />
      <GoalDateComponent />
    </div>
  );
};

export default GoalTitleContainer;
