import React, { useState } from "react";

type Props = {
  text: string;
  customStyle?: string;
  size?: "standard" | "small" | "big" | "large" | string;
  input?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
  subGoal?: boolean;
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
  isDisabled = false,
  subGoal = false,
  onClick = (e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    e.stopPropagation(),
  onSave,
  onChange,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

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

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused(false);
    onSave();
  };

  return input ? (
    <input
      value={text}
      onChange={onChange}
      onClick={onClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      disabled={isDisabled}
      className={`${textSize()} ${customStyle} ${
        isFocused
          ? `border-2 ${subGoal ? "border-white" : "border-kuvitus-primary-blue"}`
          : `hover:border-2 ${subGoal ? "border-white p-2" : "border-kuvitus-primary-blue"}`
      } px-2 rounded-lg bg-transparent h-full w-full appearance-none focus:outline-none focus:ring-0 transition duration-400`}
    />
  ) : (
    <textarea
      value={text}
      onClick={onClick}
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      placeholder={placeholder}
      disabled={isDisabled}
      className={`${textSize()} ${customStyle} rounded-lg bg-transparent h-full w-full appearance-none focus:outline-none focus:ring-0 transition duration-400`}
    />
  );
};

export default TextInputComponent;
