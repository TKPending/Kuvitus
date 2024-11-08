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
import SessionService from "@/app/services/sessionStorage/SessionService";
import { GoalType } from "@/app/types/GoalType";
import { useIsMobile } from "@/app/hooks/useIsMobile";

const GoalOverviewHeaderContainer = () => {
  const dispatch = useDispatch();
  const isMobile: boolean = useIsMobile();
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

  const handleOnSave = () => {
    // Error handling
    SessionService.updateValue(uID, "title", title);
  };

  const handleStatusDispatch = (option: number) => {
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

      <div className="flex gap-1 w-full items-center justify-evenly">
        <StatusComponent
          status={status}
          handleDispatch={(option) => handleStatusDispatch(option)}
        />
        <TextInputComponent
          text={title}
          size="text-xl"
          customStyle="font-semibold flex-wrap py-2 transition duration-500"
          onSave={handleOnSave}
          onChange={handleOnChange}
        />
        <GoalDateComponent />
      </div>
    </div>
  );
};

export default GoalOverviewHeaderContainer;
