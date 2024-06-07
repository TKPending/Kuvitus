import { useDispatch } from "react-redux";
import TagsComponent from "@/app/components/TagsComponent";
import { setSubGoalFocus, setSubGoalTitle } from "@/app/redux/slices/goal/goalSlice";
import TextInputComponent from "@/app/components/TextInputComponent";
import React from "react";


type Props = {
  UID: string;
  title: string;
  tags: string[];
  dueDate: string;
  isPressed: boolean;
};

const SubGoalFrontContainer = ({
  UID,
  title,
  tags,
  dueDate,
  isPressed,
}: Props) => {
  const dispatch = useDispatch();

  const handleSubGoalFocus = () => {
    dispatch(setSubGoalFocus(UID));
  };

  const handleTitleSave = async () => {

  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const updatedValue: string = e.target.value;

    dispatch(setSubGoalTitle({
      subUID: UID,
      newTitle: updatedValue,
    }))
  };

  return (
    <div
      onClick={handleSubGoalFocus}
      className="cursor-pointer bg-black text-white flex items-center justify-around p-4"
    >
      <TextInputComponent text={title} onSave={handleTitleSave} onChange={handleTitleChange} />

      {!isPressed && (
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <div className="flex gap-2">
            {tags.map((subject: string, index: number) => (
              <TagsComponent key={index} button={false} title={subject} />
            ))}
          </div>

          <p>{dueDate}</p>
        </div>
      )}
    </div>
  );
};

export default SubGoalFrontContainer;
