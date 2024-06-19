import React from "react";

type Props = {
  textAreaRef: any;
  y: number | undefined;
  x: number | undefined;
  panOffset: { x: number; y: number };
  scale: number;
  scaleOffset: {x: number, y: number},
  handleOnBlur: (event: React.FocusEvent<HTMLTextAreaElement>) => void;
};

const CanvasTextAreaComponent = ({
  textAreaRef,
  y,
  x,
  panOffset,
  scale,
  scaleOffset,
  handleOnBlur,
}: Props) => {
  return (
    <textarea
      ref={textAreaRef}
      onBlur={handleOnBlur}
      style={{ 
        left: x! * scale + panOffset.x * scale - scaleOffset.y,
        top: (y! - 5) * scale + panOffset.y * scale - scaleOffset.x,
        font: `${24 * scale}px, arial`,
      }}
      className={`absolute border-none outline-none decoration-none resize-auto overflow-hidden bg-transparent`}
    />
  );
};

export default CanvasTextAreaComponent;
