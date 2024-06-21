import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setSubGoalFocus,
  setSubGoalTitle,
} from "@/app/redux/slices/goal/goalSlice";
import TextInputComponent from "@/app/components/TextInputComponent";
import React from "react";
import { daysUntilCompletion } from "@/app/util/daysUntilCompletion";
import { getDaysLeftStyle } from "@/app/util/getDaysLeftStyle";
import TagsContainer from "@/app/containers/TagsContainer";
import SessionService from "@/services/sessionStorage/SessionService";

type Props = {
  UID: string;
  title: string;
  tags: string[];
  dueDate: string;
  status: number;
  isPressed: boolean;
};

const SubGoalFrontContainer = ({
  UID,
  title,
  tags,
  dueDate,
  status,
  isPressed,
}: Props) => {
  const dispatch = useDispatch();
  const goalUID: string = useSelector((state: RootState) => state.goal.uID);
  const remainingDays: number = daysUntilCompletion(dueDate);
  const remainingDaysStyle: { text: string, style: string} = getDaysLeftStyle(remainingDays);

  const handleSubGoalFocus = () => {
    dispatch(setSubGoalFocus(UID));
  };

  const handleTitleSave = () => {
    SessionService.updateSubGoalValue(goalUID, UID, "subTitle", title);
  };

  const handleTitleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const updatedValue: string = e.target.value;

    dispatch(
      setSubGoalTitle({
        subUID: UID,
        newTitle: updatedValue,
      })
    );
  };

  return (
    <div
      onClick={handleSubGoalFocus}
      className="min-h-16 cursor-pointer bg-black text-white flex items-center justify-around p-4 px-6"
    >
      <TextInputComponent
        text={title}
        onSave={handleTitleSave}
        onChange={handleTitleChange}
      />

      {!isPressed && (
        <div className="flex flex-col items-center justify-center gap-4 w-full p-2">
          <TagsContainer tags={tags} subUID={UID} button={false} />

          {dueDate && status !== 1 && (
            <div className="w-full justify-end px-4 flex items-center gap-2 text-base">
              <p>{dueDate}</p>
              <p className={`text-xs ${remainingDaysStyle.style}`}>
                {remainingDaysStyle.text}
              </p>
            </div>
          )}

          {status === 1 && (
            <div className="w-full flex items-center justify-end px-4 text-base">
              <p className="text-green-600">Completed</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubGoalFrontContainer;
