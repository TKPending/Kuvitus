type Props = {
  page: number;
  handlePageChange: (n: number) => void;
};

const AboutNavigationComponent = ({ page, handlePageChange }: Props) => {
  const options: string[] = ["FAQ", "About us", "Future plans"];

  return (
    <div className="w-1/4 md:h-3/5 bg-kuvitus-sub-background flex flex-col gap-8 p-6">
      {options.map((option: string, index: number) => (
        <div key={index}>
          <p onClick={() => handlePageChange(index)}  className={`text-kuvitus-primary-blue text-base text-center md:text-left md:text-2xl cursor-pointer ${page === index ? "underline" : "underline-animation"}`}>
            {option}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AboutNavigationComponent;
