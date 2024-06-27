"use client";

import { useEffect, useState, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../../../public/TodoLoadingLottie.json"; 

type Props = {
    home?: boolean;
};

const KuvitusLayout = ({ home=true }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: animationContainer.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      animation.destroy(); // Clean up the animation when the component is unmounted
    };
  }, []);

  return (
    <div
      className={`${
        !isVisible && "hidden"
      } absolute z-50 bg-white top-0 left-0 h-screen w-screen flex flex-col items-center justify-center`}
    >
      <div className="flex items-center justify-center">
        <p className="text-7xl font-semibold text-blue-400">Kuvitus</p>
        <div ref={animationContainer} className="h-24 w-24"></div>
      </div>
      {!home && <p className="text-blue-400">Fetching...</p>}
      {home && <p className="text-red-400">Currently everything is stored in the session storage</p>}
    </div>
  );
};

export default KuvitusLayout;
