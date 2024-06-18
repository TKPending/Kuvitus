import React from "react";

type Props = {
  textAreaRef: any;
  y: number | undefined;
  x: number | undefined;
  handleOnBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
};

const CanvasTextAreaComponent = ({ textAreaRef, y, x, handleOnBlur }: Props) => {
  return (
    <textarea
      ref={textAreaRef}
      onBlur={handleOnBlur}
      style={{ left: x, top: y! - 5 }}
      className={`text-xs absolute border-none outline-none decoration-none resize-auto overflow-hidden bg-transparent`}
    />
  );
};

export default CanvasTextAreaComponent;
