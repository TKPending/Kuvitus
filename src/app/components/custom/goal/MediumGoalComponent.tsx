type Props = {
  title?: string;
  dueDate: string;
};

const MediumGoalComponent = ({ title, dueDate }: Props) => {
  return (
    <div className="h-full w-full flex gap-4 py-2 text-center">
      <p className="font-semibold select-none">{!title ? "Medium Goal Has Been Created" : title}</p>
      <p className="text-base">by {dueDate}</p>
    </div>
  );
};

export default MediumGoalComponent;
