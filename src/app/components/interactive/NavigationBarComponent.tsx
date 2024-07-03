import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const NavigationBarComponent = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  const handleRedirection = () => {
    router.push("/aboutus");
  };

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 3500);
  }, []);

  return (
    <div className={`transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"} absolute top-5 right-20 z-40`}>
      <p onClick={handleRedirection} className="cursor-pointer hover:scale-105 transition duration-200 text-kuvitus-primary-blue text-2xl underline-animation">
        Find out more
      </p>
    </div>
  );
};

export default NavigationBarComponent;
