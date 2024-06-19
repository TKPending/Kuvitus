import React from "react";
import { useDispatch } from "react-redux";
import {
  setSubGoalDetails,
  setSubGoalFocus,
} from "@/app/redux/slices/goal/goalSlice";
import TextInputComponent from "@/app/components/TextInputComponent"
import AddTagsComponent from "@/app/components/subgoals/AddTagsComponent";
import SubGoalDateLayout from "@/app/layouts/SubGoalDateLayout"
import TagsContainer from "./TagsContainer";

type Props = {
  UID: string;
  details: string;
  dueDate: string;
  status: number;
  tags: string[];
};

const SubGoalDropdownContainer = ({
  UID,
  details,
  dueDate,
  status,
  tags,
}: Props) => {
  const dispatch = useDispatch();

  const handleSubGoalFocus = () => {
    dispatch(setSubGoalFocus(UID));
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const updatedValue: string = e.target.value;

    dispatch(
      setSubGoalDetails({
        subUID: UID,
        newDesc: updatedValue,
      })
    );
  };

  const handleOnSave = async () => {};

  return (
    <div
      onClick={handleSubGoalFocus}
      className="flex cursor-pointer flex-col gap-2 bg-black text-white p-4"
    >
      <div className="flex-col gap-4 flex">
        <p>Details</p>

        <TextInputComponent
          text={details}
          input={false}
          onSave={handleOnSave}
          onChange={handleOnChange}
        />
      </div>

      <div className="flex gap-4 w-full p-2 items-center justify-end">
        <TagsContainer tags={tags} subUID={UID} />
        <AddTagsComponent subUID={UID} />
      </div>

      <SubGoalDateLayout subUID={UID} dueDate={dueDate} status={status} />

    </div>
  );
};

export default SubGoalDropdownContainer;
