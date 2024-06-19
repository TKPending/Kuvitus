import React from "react";
import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import TextInputComponent from "@/app/components/TextInputComponent";
import { setGoalDescription } from "@/app/redux/slices/goal/goalSlice";

const GoalDescriptionContainer = () => {
  const dispatch = useDispatch();
  const description: string = useSelector(
    (state: RootState) => state.goal.description
  );

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue: string = e.target.value;
    dispatch(setGoalDescription(newValue));
  };

  const handleOnSave = async () => {};

  return (
    <div className="h-full border-4 border-black rounded-lg p-4">
      <TextInputComponent
        text={description}
        size="big"
        input={false}
        onSave={handleOnSave}
        onChange={handleDescriptionChange}
      />
    </div>
  );
};

export default GoalDescriptionContainer;
