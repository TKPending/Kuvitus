import React from "react";
import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  setSubGoalDetails,
  setSubGoalFocus,
  removeSubGoalTag,
} from "@/app/redux/slices/goal/goalSlice";
import TextInputComponent from "@/app/components/TextInputComponent"
import AddTagsComponent from "@/app/components/subgoals/AddTagsComponent";
import SubGoalDueDateContainer from "@/app/containers/subgoals/SubGoalDueDateContainer";
import TagsContainer from "@/app/containers/TagsContainer";
import SessionService from "@/services/sessionStorage/SessionService";

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
  const goalUID: string = useSelector((state: RootState) => state.goal.uID);
  const [isFocused, setIsFocused] = useState(false);

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
  
  const handleOnSave = () => {
    SessionService.updateSubGoalValue(goalUID, UID, "subDetails", details);
  };
  
  const handleTagDeletion = (tag: string) => {
    dispatch(removeSubGoalTag({
        subUID: UID,
        tagToRemove: tag,
      })
    );
    SessionService.removeSubGoalTag(goalUID, UID, tag);
  };

  const handleIsFocused = () => setIsFocused(!isFocused);

  return (
    <div
      onClick={handleSubGoalFocus}
      className="flex cursor-pointer flex-col gap-2 bg-kuvitus-secondary-blue border-white border-2 border-t-0 text-black p-4 rounded-bl-lg rounded-br-lg"
    >
      <div 
        onFocus={handleIsFocused}
        onBlur={handleIsFocused}
        className={`flex-col gap-2 flex border-2 ${isFocused ? "border-opacity-100" : "border-opacity-20"} hover:border-opacity-100 border-kuvitus-primary-blue p-2 rounded-lg transition duration-500`}>
        <p>Details</p>

        <TextInputComponent
          text={details}
          input={false}
          onSave={handleOnSave}
          onChange={handleOnChange}
        />
      </div>

      <div className="flex gap-4 w-full p-2 items-center justify-end">
        <TagsContainer tags={tags} subUID={UID} onRemoval={handleTagDeletion} />
        <AddTagsComponent subUID={UID} />
      </div>

      <SubGoalDueDateContainer subUID={UID} dueDate={dueDate} status={status} />
    </div>
  );
};

export default SubGoalDropdownContainer;
