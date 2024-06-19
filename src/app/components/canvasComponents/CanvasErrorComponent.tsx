import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { setCanvasError } from "@/app/redux/slices/goal/goalSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faX } from "@fortawesome/free-solid-svg-icons";

const CanvasErrorComponent = () => {
  const dispatch = useDispatch();
  const isError: boolean = useSelector(
    (state: RootState) => state.goal.drawingCanvas.isError
  );
  const error: string = useSelector(
    (state: RootState) => state.goal.drawingCanvas.errorMessage
  );

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        dispatch(setCanvasError(false));
      }, 3000);
    }
  }, []);

  const handleCloseNotification = () => {
    dispatch(setCanvasError(false));
  };

  return (
    <div
      onClick={handleCloseNotification}
      className="absolute rounded-lg right-5 top-2 flex items-center py-2 px-4 bg-orange-200 hover:bg-orange-400 transition duration-200 cursor-pointer"
    >
      <div className="flex gap-4 items-center justify-center">
        <FontAwesomeIcon icon={faCircleExclamation} className="h-6 w-6" />
        <p className="font-semibold text-xs">
          Item chosen isn't apart of the tools{error}
        </p>
        <FontAwesomeIcon icon={faX} className="h-2 w-2" />
      </div>
    </div>
  );
};

export default CanvasErrorComponent;
