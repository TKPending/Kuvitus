import React from "react";
import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import TextInputComponent from "@/app/components/TextInputComponent";
import { setGoalDescription } from "@/app/redux/slices/goal/goalSlice";
import { GoalType } from "@/app/types/GoalType";
import SessionService from "@/services/sessionStorage/SessionService";

const GoalDescriptionComponent = () => {
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const { uID, description }: GoalType = useSelector(
    (state: RootState) => state.goal
  );

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue: string = e.target.value;
    dispatch(setGoalDescription(newValue));
  };

  const handleOnSave = async () => {
    SessionService.updateValue(uID, "description", description);
  };

  const handleIsFocused = () => setIsFocused(!isFocused);

  const handleOnEnter = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setIsFocused(false);
    }
  };

  return (
    <div
      onFocus={handleIsFocused}
      onBlur={handleIsFocused}
      className={`${
        isFocused && "border-2 border-kuvitus-primary-blue"
      } h-full rounded-lg p-4 hover:border-2 hover:border-kuvitus-primary-blue rounded-lg transition duration-500`}
    >
      <p className="text-xl">Description:</p>
      <TextInputComponent
        text={description}
        size="big"
        customStyle="px-2"
        input={false}
        onSave={handleOnSave}
        onChange={handleDescriptionChange}
        onDescriptionEnter={handleOnEnter}
      />
    </div>
  );
};

export default GoalDescriptionComponent;
