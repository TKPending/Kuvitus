const NavigationBarComponent = () => {
  const navOptions: string[] = ["Roadmap", "Help"];

  return (
    <div className="">
      km
      {navOptions.map((option: string, index: number) => (
        <p key={index} className="text-black text-4xl">
          {option}
        </p>
      ))}
    </div>
  );
};

export default NavigationBarComponent;
