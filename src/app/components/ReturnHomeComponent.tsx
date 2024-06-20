import { useRouter } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft as solidLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft as regularLeft } from "@fortawesome/free-regular-svg-icons";

const ReturnHomeComponent = () => {
  const router = useRouter();
  const [isHovered, setIsHover] = useState<boolean>(false);

  const handleReturnHome = () => {
    sessionStorage.setItem("specificGoal", "");
    router.push("/");
  };

  return (
    <div onClick={handleReturnHome}>
      <FontAwesomeIcon
        icon={isHovered ? solidLeft : regularLeft}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="text-6xl transition-all duration-400 cursor-pointer"
      />
    </div>
  );
};

export default ReturnHomeComponent;
