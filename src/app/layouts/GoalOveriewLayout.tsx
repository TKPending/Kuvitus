import { RootState } from "@/app/redux/store"
import { useSelector } from "react-redux";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import GoalOverviewHeaderContainer from "@/app/containers/GoalOverviewHeaderContainer";
import GoalDescriptionComponent from "@/app/components/goalOverview/GoalDescriptionComponent";
import { daysUntilCompletion } from "@/app/util/daysUntilCompletion"
import { getDaysLeftStyle } from "@/app/util/getDaysLeftStyle";
import { GoalType } from "@/app/types/GoalType";

const GoalOverviewLayout = () => {
  const isMobile: boolean = useIsMobile();
  const { dueDate }: GoalType = useSelector((state: RootState) => state.goal);
  const daysRemaining: number = daysUntilCompletion(dueDate);
  const remainingDaysSyle = getDaysLeftStyle(daysRemaining, true);

  return (
    <div className="flex flex-col gap-4 h-1/4 p-4">
      <GoalOverviewHeaderContainer />
      {isMobile && <p className={`${remainingDaysSyle.style} text-center underline`}>{remainingDaysSyle.text}</p>}
      <GoalDescriptionComponent />
    </div>
  );
};

export default GoalOverviewLayout;
