import { useRouter } from "next/navigation";

const NavigationBarComponent = () => {
  const router = useRouter();

  const handleRedirection = () => {
    router.push("aboutus");
  };

  return (
    <div className="absolute top-5 right-20 z-40 ">
      <p onClick={handleRedirection} className="cursor-pointer hover:scale-105 transition duration-200 text-kuvitus-primary-blue text-2xl underline-animation">
        Find out more
      </p>
    </div>
  );
};

export default NavigationBarComponent;
