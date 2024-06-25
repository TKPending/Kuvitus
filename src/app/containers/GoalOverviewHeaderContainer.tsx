import React from "react";
import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import ReturnHomeComponent from "@/app/components/ReturnHomeComponent";
import TextInputComponent from "@/app/components/TextInputComponent";
import { setCompleteDate, setGoalStatus, setGoalTitle, setGoalDueDate } from "@/app/redux/slices/goal/goalSlice";
import StatusComponent from "@/app/components/StatusComponent";
import GoalDateComponent from "@/app/components/goalOverview/GoalDateComponent";
import { getCurrentDate } from "../util/getCurrentDate";
import SessionService from "@/services/sessionStorage/SessionService";
import { GoalType } from "../types/GoalType";

const GoalOverviewHeaderContainer = () => {
  const dispatch = useDispatch();
  const { title, status, uID }: GoalType = useSelector((state: RootState) => state.goal);
  const COMPLETED: number = 1;

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue: string = e.target.value;
    dispatch(setGoalTitle(newValue));
  };

  const handleOnSave = async () => {
    // Error handling
    SessionService.updateValue(uID, "title", title);
  };

  const handleStatusChange = (option: number) => {
    if (option === COMPLETED) {
      const completedDate: string = getCurrentDate();
      SessionService.updateValue(uID, "completeDate", completedDate);
      dispatch(setCompleteDate(completedDate));
    } else {
      SessionService.updateValue(uID, "completeDate", "");
      dispatch(setCompleteDate(""));
    }

    dispatch(setGoalStatus(option));
    SessionService.updateValue(uID, "status", option);
  }

  return (
    <div className="flex h-auto items-center gap-4">
      <ReturnHomeComponent />
      <StatusComponent status={status} handleDispatch={(option) => handleStatusChange(option)} />
      <TextInputComponent
        text={title}
        size="text-2xl"
        customStyle="font-semibold flex-wrap"
        onSave={handleOnSave}
        onChange={handleOnChange}
      />
      <GoalDateComponent />
    </div>
  );
};

export default GoalOverviewHeaderContainer;
