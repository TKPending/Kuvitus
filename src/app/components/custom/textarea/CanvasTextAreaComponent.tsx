import React from "react";

type Props = {
  textAreaRef: any;
  y: number | undefined;
  x: number | undefined;
  panOffset: {x: number, y: number},
  handleOnBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
};

const CanvasTextAreaComponent = ({ textAreaRef, y, x, panOffset, handleOnBlur }: Props) => {
  return (
    <textarea
      ref={textAreaRef}
      onBlur={handleOnBlur}
      style={{ left: x! + panOffset.x, top: y! - 5 + panOffset.y}}
      className={`text-xs absolute border-none outline-none decoration-none resize-auto overflow-hidden bg-transparent`}
    />
  );
};

export default CanvasTextAreaComponent;
