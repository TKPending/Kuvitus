import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type Props = {
  title: string;
  button?: boolean;
  subUID?: string;
  handleDeletion: (tagToRemove: string) => void;
};

const TagsComponent = ({
  title,
  button = true,
  handleDeletion,
}: Props) => {

  const handleDeleteTag = (e: React.MouseEvent<SVGSVGElement, MouseEvent>, title: string) => {
    e.stopPropagation();
    handleDeletion(title)
  }

  return (
    <div
      className={`h-6 w-auto px-2 bg-white rounded-lg flex items-center justify-center gap-2`}
    >
      <p
        className={`text-black w-auto text-[12px] md:text-[14px]`}
      >
        {title}
      </p>
      {button && (
        <FontAwesomeIcon
          icon={faXmark}
          onClick={(e) => handleDeleteTag(e, title)}
          className="cursor-pointer hover:text-kuvitus-uncomplete"
        />
      )}
    </div>
  );
};

export default TagsComponent;
