import React from "react";
import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import ReturnHomeComponent from "@/app/components/ReturnHomeComponent";
import TextInputComponent from "@/app/components/TextInputComponent";
import {
  setCompleteDate,
  setGoalStatus,
  setGoalTitle,
} from "@/app/redux/slices/goal/goalSlice";
import StatusComponent from "@/app/components/StatusComponent";
import GoalDateComponent from "@/app/components/goalOverview/GoalDateComponent";
import { getCurrentDate } from "@/app/util/getCurrentDate";
import SessionService from "@/services/sessionStorage/SessionService";
import { GoalType } from "@/app/types/GoalType";
import { useIsMobile } from "../hooks/useIsMobile";

const GoalOverviewHeaderContainer = () => {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const { title, status, uID }: GoalType = useSelector(
    (state: RootState) => state.goal
  );
  const COMPLETED: number = 1;

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
  };

  return (
    <div
      className={`flex ${
        isMobile ? "flex-col" : "flex"
      } h-auto items-center gap-4`}
    >
      {!isMobile && <ReturnHomeComponent />}

      <div className="flex w-full items-center justify-evenly">
        <StatusComponent
          status={status}
          handleDispatch={(option) => handleStatusChange(option)}
        />
        <TextInputComponent
          text={title}
          size="text-xl"
          customStyle="font-semibold flex-wrap py-2"
          onSave={handleOnSave}
          onChange={handleOnChange}
        />
        <GoalDateComponent />
      </div>
    </div>
  );
};

export default GoalOverviewHeaderContainer;
