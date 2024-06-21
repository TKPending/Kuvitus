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
          onClick={() => handleDeletion(title)}
          className="cursor-pointer hover:text-red-400"
        />
      )}
    </div>
  );
};

export default TagsComponent;
