import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons/faCalendarDays";

const GoalDate = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center justify-center">
      <FontAwesomeIcon
        icon={faCalendarDays}
        className="cursor-pointer hover:scale-110 transition duration-200"
      />
    </div>
  );
};

export default GoalDate;
