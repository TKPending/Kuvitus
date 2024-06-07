import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { faXmark, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { removeSubGoalTag } from "../redux/slices/goal/goalSlice";

type Props = {
  title: string;
  button?: boolean;
  UID?: string;
  onClick?: (e: React.MouseEvent<any>) => void;
};

const TagsComponent = ({
  title,
  button = true,
  UID,
  onClick = (e: React.MouseEvent<any>) => e.stopPropagation(),
}: Props) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleTagDeletion = async (e: React.MouseEvent<any> ,tag: string) => {
    dispatch(
      removeSubGoalTag({
        subUID: UID,
        tagToRemove: tag,
      })
    );

    onClick(e)
  };

  return (
    <div
      className={`h-4 w-auto px-2 ${
        button ? "bg-black bg-opacity-60" : ""
      } flex items-center justify-center gap-2`}
    >
      <p
        className={`${
          button ? "text-white" : "text-white"
        } w-auto text-white text-xs`}
      >
        {title}
      </p>
      {button && (
        <FontAwesomeIcon
          icon={isHovered ? faCircleXmark : faXmark}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e: any) => handleTagDeletion(e, title)}
          className="cursor-pointer hover:text-red-400"
        />
      )}
    </div>
  );
};

export default TagsComponent;
