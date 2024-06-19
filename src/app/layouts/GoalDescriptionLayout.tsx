import GoalOverviewHeaderContainer from "@/app/containers/GoalOverviewHeaderContainer";
import GoalDescriptionComponent from "@/app/components/goalOverview/GoalDescriptionComponent";

const GoalOverviewLayout = () => {
  return (
    <div className="flex flex-col gap-4 h-1/4 p-4">
      <GoalOverviewHeaderContainer />
      <GoalDescriptionComponent />
    </div>
  );
};

export default GoalOverviewLayout;
