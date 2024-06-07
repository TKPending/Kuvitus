import GoalTitleContainer from "@/app/container/GoalTitleContainer";
import GoalDescriptionContainer from "@/app/container/GoalDescriptionContainer";

const GoalDescriptionLayout = () => {
  return (
    <div className="flex flex-col gap-4 h-1/4">
      <GoalTitleContainer />
      <GoalDescriptionContainer />
    </div>
  );
};

export default GoalDescriptionLayout;
