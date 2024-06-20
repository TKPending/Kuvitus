import React from "react";
import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import ReturnHomeComponent from "@/app/components/ReturnHomeComponent";
import TextInputComponent from "@/app/components/TextInputComponent";
import { setCompleteDate, setGoalStatus, setGoalTitle } from "@/app/redux/slices/goal/goalSlice";
import StatusComponent from "@/app/components/StatusComponent";
import GoalDateComponent from "@/app/components/goalOverview/GoalDateComponent";
import { getCurrentDate } from "../util/getCurrentDate";
import SessionService from "@/services/sessionStorage/sessionService";

const GoalOverviewHeaderContainer = () => {
  const dispatch = useDispatch();
  const goal = useSelector((state: RootState) => state.goal);
  const { title, status } = goal;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue: string = e.target.value;
    dispatch(setGoalTitle(newValue));
  };

  const handleOnSave = async () => {
    SessionService.updateValue(goal.uID, "title", title);
  };

  const handleStatusChange = (option: number) => {
    dispatch(setGoalStatus(option));
    const currentDate: string = getCurrentDate();
    dispatch(setCompleteDate(currentDate));
  }

  return (
    <div className="flex h-auto items-center gap-6">
      <ReturnHomeComponent />
      <StatusComponent status={status} handleDispatch={(option) => handleStatusChange(option)} />
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

export default GoalOverviewHeaderContainer;
