import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import {
  setSubGoalFocus,
  setSubGoalTitle,
} from "@/app/redux/slices/goal/goalSlice";
import TextInputComponent from "@/app/components/TextInputComponent";
import React from "react";
import TagsContainer from "@/app/containers/TagsContainer";
import SessionService from "@/services/sessionStorage/SessionService";
import StatusComponent from "@/app/components/StatusComponent";

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
  const isMobile: boolean = useIsMobile();
  const goalUID: string = useSelector((state: RootState) => state.goal.uID);

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
      className={`relative min-h-16 cursor-pointer bg-kuvitus-primary-blue border-white border-2 text-white px-4 flex flex-col justify-center
        ${isPressed ? "rounded-tr-xl rounded-tl-xl" : "rounded-xl pt-2"}`}
    >
      <div className="absolute right-14 top-2 flex items-center justify-end h-6">
        {!isPressed && !isMobile && (
          <TagsContainer tags={tags} subUID={UID} button={false} />
        )}
      </div>

      <div className={`flex items-center ${tags.length > 0 && "mt-4"} py-4`}>
        <TextInputComponent
          text={title}
          subGoal={true}
          customStyle={`lg:text-xl ${tags.length > 0 && "mb-4"}`}
          onSave={handleTitleSave}
          onChange={handleTitleChange}
        />

        {!isPressed && (
          <div className="flex flex-col items-center justify-center gap-4 p-2">
            <div className="w-full gap-4 flex items-center justify-end px-4 text-base">
              {dueDate && status !== 1 && <p>{dueDate}</p>}
              <StatusComponent status={status} button={false} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubGoalFrontContainer;
