"use client";

import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../../../public/TodoLoadingLottie.json"; 

type Props = {
    home?: boolean;
    isLoading: boolean;
};

const KuvitusLayout = ({ home=true, isLoading }: Props) => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animation = lottie.loadAnimation({
      container: animationContainer.current!,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
    });

    return () => {
      animation.destroy(); // Clean up the animation when the component is unmounted
    };
  }, []);

  return (
    <div
      className={`${
        !isLoading && "hidden"
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
