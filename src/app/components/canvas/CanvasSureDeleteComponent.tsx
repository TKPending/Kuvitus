import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import {
  deleteAllElements,
  setDeleteOptionVisible,
} from "@/app/redux/slices/goal/goalSlice";

const CanvasSureDeleteComponent = () => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const options = ["Resume", "Delete"];
  const deleteStyle = "bg-red-400 hover:bg-red-600";
  const resumeStyle = "bg-neutral-400 hover:bg-neutral-600";

  const handleDeleteOption = (decision: boolean) => {
    if (decision) {
      dispatch(deleteAllElements(true));
    }
    dispatch(setDeleteOptionVisible(false));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        dispatch(setDeleteOptionVisible(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute z-10 flex flex-col gap-8 border-2 border-white p-4 rounded-lg shadow-xl bg-kuvitus-primary-blue"
    >
      <p className="text-2xl text-white" >Are you sure you want to delete all elements?</p>

      <div className="flex items-center justify-center gap-6">
        {options.map((decision: string, index: number) => (
          <div
            key={index}
            onClick={() =>
              handleDeleteOption(decision === "Delete" ? true : false)
            }
            className={`cursor-pointer p-4 rounded-lg flex items-center justify-center ${
              decision === "Delete" ? deleteStyle : resumeStyle
            } transition duration-200`}
          >
            <p className="font-semibold text-white">{decision}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CanvasSureDeleteComponent;
