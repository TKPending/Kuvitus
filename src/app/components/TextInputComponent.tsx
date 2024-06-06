import React from "react";

type Props = {
  text: string;
  customStyle?: string;
  size?: "standard" | "small" | "big" | "large" | string;
  input?: boolean;
  placeholder?: string;
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
      onBlur={onSave}
      placeholder={placeholder}
      className={`${textSize()} ${customStyle} h-full w-full appearance-none focus:outline-none focus:ring-0 focus:border-none`}
    />
  ) : (
    <textarea
      value={text}
      onChange={onChange}
      onBlur={onSave}
      placeholder={placeholder}
      className={`${textSize()} ${customStyle} h-full w-full appearance-none focus:outline-none focus:ring-0 focus:border-none`}
    />
  );
};

export default TextInputComponent;
