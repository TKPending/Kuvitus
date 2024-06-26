import React from "react";

type Props = {
  text: string;
  customStyle?: string;
  size?: "standard" | "small" | "big" | "large" | string;
  input?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  onClick?: (
    e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSave: () => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const TextInputComponent = ({
  text = "big",
  customStyle,
  size,
  input = true,
  placeholder,
  isDisabled=false,
  onClick = (e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    e.stopPropagation(),
  onSave,
  onChange,
}: Props) => {
  const textSize = () => {
    switch (size) {
      case "standard":
        return "text-base";
      case "small":
        return "text-xs";
      case "big":
        return "text-xl";
      case "large":
        return "text-2xl";
      default:
        return size;
    }
  };

  return input ? (
    <input
      value={text}
      onChange={onChange}
      onClick={onClick}
      onBlur={onSave}
      placeholder={placeholder}
      disabled={isDisabled}
      className={`${textSize()} ${customStyle} bg-transparent h-full w-full appearance-none focus:outline-none focus:ring-0 focus:border-kuvitus-primary-blue`}
    />
  ) : (
    <textarea
      value={text}
      onClick={onClick}
      onChange={onChange}
      onBlur={onSave}
      placeholder={placeholder}
      disabled={isDisabled}
      className={`${textSize()} ${customStyle} bg-transparent h-full w-full appearance-none focus:outline-none focus:ring-0 focus:border-none`}
    />
  );
};

export default TextInputComponent;
