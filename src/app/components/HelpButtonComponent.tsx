import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const HelpButtonComponent = () => {
  const router = useRouter();

  const handleRouting = () => {
    router.push("/aboutus");
  };

  return (
    <div className="z-50 flex items-center justify-center">
      <FontAwesomeIcon
        icon={faQuestion}
        onClick={handleRouting}
        className="p-4 cursor-pointer bg-kuvitus-primary-blue rounded-full text-white h-12 w-12 hover:bg-opacity-80 hover:scale-105 transition duration-200"
      />
    </div>
  );
};

export default HelpButtonComponent;
