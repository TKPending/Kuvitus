import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import SubGoalHeaderComponent from "@/app/components/subgoals/SubGoalHeaderComponent";
import { SubType } from "@/app/types/SubType";
import SubGoalLayout from "./SubGoalLayout";
import AddSubGoalButtonComponent from "@/app/components/subgoals/AddSubGoalButtonComponent";
import UpdateSubGoalOptionsComponent from "@/app/components/subgoals/UpdateSubGoalOptionsComponent";

const SubGoalOverviewLayout = () => {
  const dispatch = useDispatch();
  const subGoals: SubType[] = useSelector(
    (state: RootState) => state.goal.subGoals
  );

  return (
    <div className="h-screen w-full p-8 flex flex-col">
      <SubGoalHeaderComponent />
      <div className="flex-1 px-6 overflow-y-auto bg-kuvitus-sub-background rounded-br-xl rounded-bl-xl">
        {subGoals.length > 0 ? (
          <div>
            <UpdateSubGoalOptionsComponent />
            {subGoals.map((goal: SubType, index: number) => (
              <SubGoalLayout key={index} subGoal={goal} />
            ))}
          </div>
        ) : (
          <div className="w-full h-1/2 flex flex-col gap-6 items-center justify-center text-center font-semibold">
            <p>There are currently no subgoals.</p>
            <p>
              Consider adding subgoals, to help break down your main goals
              <br />
              "Every marathon starts with a first step"
            </p>
          </div>
        )}

        {subGoals.length <= 0 && <AddSubGoalButtonComponent />}
      </div>
    </div>
  );
};

export default SubGoalOverviewLayout;
