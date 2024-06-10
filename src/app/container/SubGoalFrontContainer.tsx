import { useDispatch } from "react-redux";
import TagsComponent from "@/app/components/TagsComponent";
import {
  setSubGoalFocus,
  setSubGoalTitle,
} from "@/app/redux/slices/goal/goalSlice";
import TextInputComponent from "@/app/components/TextInputComponent";
import React from "react";
import { daysUntilCompletion } from "@/app/util/daysUntilCompletion";
import { getDaysLeftStyle } from "@/app/util/getDaysLeftStyle";

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
  const remainingDays: number = daysUntilCompletion(dueDate);
  const remainingDaysStyle: { text: string, style: string} = getDaysLeftStyle(remainingDays);

  const handleSubGoalFocus = () => {
    dispatch(setSubGoalFocus(UID));
  };

  const handleTitleSave = async () => {};

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
      className="min-h-16 cursor-pointer bg-black text-white flex items-center justify-around p-4"
    >
      <TextInputComponent
        text={title}
        onSave={handleTitleSave}
        onChange={handleTitleChange}
      />

      {!isPressed && (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <div className="flex gap-2">
            {tags.map((subject: string, index: number) => (
              <TagsComponent key={index} button={false} title={subject} />
            ))}
          </div>

          {dueDate && status !== 1 && (
            <div className="flex items-center gap-2 text-base">
              <p>{dueDate}</p>
              <p className={`text-xs ${remainingDaysStyle.style}`}>
                {remainingDaysStyle.text}
              </p>
            </div>
          )}

          {status === 1 && (
            <div className="flex items-center text-base">
              <p className="text-green-600">Completed</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubGoalFrontContainer;
