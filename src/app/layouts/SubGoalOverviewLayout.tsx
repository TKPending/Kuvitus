import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";
import SubGoalHeaderComponent from "@/app/components/subgoals/SubGoalHeaderComponent";
import { SubType } from "@/app/types/SubType";
import SubGoalLayout from "./SubGoalLayout";
import AddSubGoalButtonComponent from "@/app/components/subgoals/AddSubGoalButtonComponent";
import UpdateSubGoalOptionsComponent from "@/app/components/subgoals/UpdateSubGoalOptionsComponent";
import { useTransition, animated } from "@react-spring/web";

const SubGoalOverviewLayout = () => {
  const subGoals: SubType[] = useSelector(
    (state: RootState) => state.goal.subGoals
  );

  const transitions = useTransition(subGoals, {
    keys: subGoal => subGoal.subUID,
    from: { opacity: 0, transform: 'translateY(-20px)' },
    enter: { opacity: 1, transform: 'translateY(0)' },
    leave: { opacity: 0, transform: 'translateY(-20px)' },
  });

  return (
    <div className="sticky top-5 h-screen lg:h-full w-full p-8 flex flex-col">
      <SubGoalHeaderComponent />
      <div className="flex-col px-6 overflow-y-auto bg-kuvitus-sub-background rounded-br-xl rounded-bl-xl h-full hover:shadow-lg relative"> 
        {subGoals.length > 1 && <UpdateSubGoalOptionsComponent />}

        {transitions((style, goal) => (
          <animated.div style={style} className="relative z-10">
            <SubGoalLayout key={goal.subUID} subGoal={goal} />
          </animated.div>
        ))}

        {subGoals.length === 0 && (
          <div className="h-1/2 w-full flex flex-col gap-6 items-center justify-center text-center font-semibold">
            <p>There are currently no subgoals.</p>
            <p>
              Consider adding subgoals, to help break down your main goals
              <br />
              "Every marathon starts with a first step"
            </p>
          </div>
        )}

        {subGoals.length <= 5 && <AddSubGoalButtonComponent />}
      </div>
    </div>
  );
};

export default SubGoalOverviewLayout;
