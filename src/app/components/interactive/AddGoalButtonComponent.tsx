import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onClick: () => void;
};

const AddGoalButtonComponent = ({ onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="absolute bottom-10 right-10 cursor-pointer p-4
                    flex items-center justify-center rounded-full
                    h-24 w-24 bg-opacity-90 bg-kuvitus-primary-blue hover:bg-kuvitus-secondary-blue hover:scale-105
                    transition duration-200 z-10"
    >
      <FontAwesomeIcon icon={faPlus} className="text-white text-6xl" />
    </div>
  );
};

export default AddGoalButtonComponent;
