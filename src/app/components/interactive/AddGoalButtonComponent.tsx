import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onClick: () => void;
};

const AddGoalButtonComponent = ({ onClick }: Props) => {
  const handleAddGoal = () => {
    // Handle in backend
    console.log("Add Goal");
  };

  return (
    <div
      onClick={onClick}
      className="absolute bottom-10 right-10 cursor-pointer p-4
                    flex items-center justify-center rounded-full
                    h-24 w-24 bg-opacity-70 bg-red-600 hover:bg-red-300 hover:scale-105
                    transition duration-200"
    >
      <FontAwesomeIcon icon={faPlus} className="text-white text-6xl" />
    </div>
  );
};

export default AddGoalButtonComponent;
