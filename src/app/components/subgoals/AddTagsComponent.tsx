import React, { useState } from "react";
import { RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPlusCircle,
  faXmark,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import TextInputComponent from "@/app/components/TextInputComponent";
import { addSubGoalTag, removeSubGoalTag } from "@/app/redux/slices/goal/goalSlice";
import SessionService from "@/services/sessionStorage/SessionService";

type Props = {
    subUID: string;
};

const AddTagsComponent = ({ subUID }: Props) => {
  const dispatch = useDispatch();
  const goalUID: string = useSelector((state: RootState) => state.goal.uID);
  const [isTagActive, setIsTagActive] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [newTag, setNewTag] = useState<string>("");

  const handleTagActive = (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    setIsTagActive(true);
  };

  const handleNewTagName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue: string = e.target.value;
    setNewTag(newValue);
  };

  const handleTagDeletion = (e: React.MouseEvent<any>) => {
    e.stopPropagation();
    dispatch(removeSubGoalTag({
        subUID: subUID,
        tagToRemove: newTag,
      })
    );

    setNewTag("");
    setIsTagActive(false);
  };

  const handleNewTagSave = async () => {
    // Handle in backend
    dispatch(addSubGoalTag({
        subUID: subUID,
        tagToAdd: newTag,
    }));
    SessionService.addSubGoalTag(goalUID, subUID, newTag);

    setNewTag("");
    setIsTagActive(false);
  };

  return (
    <div className="h-4 flex items-center justify-center">
      {!isTagActive ? (
        <FontAwesomeIcon
          icon={!isHovered ? faPlus : faPlusCircle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleTagActive}
          className="cursor-pointer text-white"
        />
      ) : (
        <div className="flex gap-2 items-center justify-center">
          <TextInputComponent
            text={newTag}
            onSave={handleNewTagSave}
            onChange={handleNewTagName}
          />

          <FontAwesomeIcon
            icon={isHovered ? faCircleXmark : faXmark}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={(e: any) => handleTagDeletion(e)}
            className="cursor-pointer hover:text-red-400"
          />
        </div>
      )}
    </div>
  );
};

export default AddTagsComponent;
