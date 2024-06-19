import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { removeSubGoalTag } from "@/app/redux/slices/goal/goalSlice";

type Props = {
  title: string;
  button?: boolean;
  subUID?: string;
  handleDeletion?: (e: React.MouseEvent<any>) => void;
};

const TagsComponent = ({
  title,
  button = true,
  subUID,
  handleDeletion = (e: React.MouseEvent<any>) => e.stopPropagation(),
}: Props) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleTagDeletion = async (e: React.MouseEvent<any> ,tag: string) => {
    dispatch(
      removeSubGoalTag({
        subUID,
        tagToRemove: tag,
      })
    );

    // Deal with in backend
    // handleDeletion(e);
  };

  return (
    <div
      className={`h-4 w-auto px-2 ${
        button ? "bg-black bg-opacity-60" : "border-2 border-black rounded-lg"
      } flex items-center justify-center gap-2`}
    >
      <p
        className={`${
          button ? "text-white" : "text-black"
        } w-auto text-xs`}
      >
        {title}
      </p>
      {button && (
        <FontAwesomeIcon
          icon={faXmark}
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
