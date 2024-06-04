type Props = {
  title?: string;
};

const BasicGoalComponent = ({ title }: Props) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <p className="font-semibold select-none">{!title ? "New Goal Created" : title}</p>
    </div>
  );
};

export default BasicGoalComponent;
