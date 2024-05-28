type Props = {
    title?: string;
    dueDate: string;
  };
  
  const AdvancedGoalComponent = ({ title, dueDate }: Props) => {
    return (
      <div className="h-full w-full flex items-center text-center gap-4 py-2">
        <p className="font-semibold">{!title ? "An Adavnaced Goal Has Been Created" : title}</p>

        <div className="flex flex-col items-center gap-4 w-1/2">
            <div className="bg-red-200 rounded-full h-16 w-16"></div>
            <p className="text-base">by {dueDate}</p>
        </div>
      </div>
    );
  };
  
  export default AdvancedGoalComponent;
  