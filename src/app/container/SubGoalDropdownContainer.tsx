import { useDispatch } from "react-redux";
import TagsComponent from "@/app/components/TagsComponent";
import {
  setSubGoalDetails,
  setSubGoalFocus,
} from "@/app/redux/slices/goal/goalSlice";
import TextInputComponent from "../components/TextInputComponent";
import React from "react";
import AddTagsComponent from "@/app/components/custom/subgoal/AddTagsComponent";
import SubGoalDateLayout from "../layouts/SubGoalDateLayout";

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
        {tags.map((subject: string, index: number) => (
          <TagsComponent key={index} title={subject} UID={UID} />
        ))}
        <AddTagsComponent subUID={UID} />
      </div>

      <SubGoalDateLayout subUID={UID} dueDate={dueDate} status={status} />

    </div>
  );
};

export default SubGoalDropdownContainer;
