import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { removeAllLocalGoals } from "@/app/redux/slices/localGoals/localGoalsSlice";
import SessionService from "@/services/sessionStorage/SessionService";

const RemoveAllGoalsComponent = () => {
  const dispatch = useDispatch();
  const [displayDelete, setDisplayDelete] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleRemoveAllGoals = () => {
    setIsDeleting(true);
    setTimeout(() => {
      dispatch(removeAllLocalGoals());
      SessionService.deleteAllGoals();
    }, 1000);
    handleDeleteDisplay();
  };

  const handleDeleteDisplay = () => {
    setDisplayDelete(!displayDelete);
  };

  useEffect(() => {
    if (isDeleting) {
        setTimeout(() => {
            setIsDeleting(false);
        }, 1000);
    }
  }, [isDeleting]);

  return (
    <div className="absolute left-10 bottom-10 flex flex-col items-center justify-center gap-2">
      {displayDelete && !isDeleting && (
        <div>
          <p className="flex items-center justify-center gap-2">
            <span
              className="cursor-pointer underline-animation"
              onClick={handleDeleteDisplay}
            >
              Cancel
            </span>
            /
            <span
              className="cursor-pointer underline-animation text-kuvitus-uncomplete"
              onClick={handleRemoveAllGoals}
            >
              Delete All
            </span>
          </p>
        </div>
      )}

      {isDeleting && <p className="text-kuvitus-uncomplete">Deleting...</p>}

      <div
        onClick={handleDeleteDisplay}
        className="cursor-pointer bg-kuvitus-uncomplete rounded-full h-16 w-16 flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faTrash} className="p-2 text-black text-4xl" />
      </div>
    </div>
  );
};

export default RemoveAllGoalsComponent;
