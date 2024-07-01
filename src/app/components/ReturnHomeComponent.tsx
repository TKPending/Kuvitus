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
    setTimeout(() => {
      router.push("/");
    }, 0);
  };

  return (
    <div onClick={handleReturnHome}>
      <FontAwesomeIcon
        icon={isHovered ? solidLeft : regularLeft}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className={`cursor-pointer text-6xl text-kuvitus-primary-blue`}
      />
    </div>
  );
};

export default ReturnHomeComponent;
