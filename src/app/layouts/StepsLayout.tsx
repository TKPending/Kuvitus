import { RootState } from "@/app/redux/store";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StepsHeaderContainer from "@/app/container/StepsHeaderContainer";
import { SubType } from "@/app/types/SubType";
import SubGoalLayout from "./SubGoalLayout";
import { ADVANCED } from "@/temp/tempGoalData";
import { setGoal } from "@/app/redux/slices/goal/goalSlice";
import AddSubGoalButtonComponent from "../components/AddSubGoalButtonComponent";

const StepsLayout = () => {
  const dispatch = useDispatch();
  const steps: SubType[] = useSelector((state: RootState) => state.goal.goalSteps);

  useEffect(() => {
    const handle = () => {
      dispatch(setGoal(ADVANCED));
    };

    if (steps.length === 0) {
      handle();
    }
  });

  return (
    <div className="h-screen w-full p-8 flex flex-col ">
      <StepsHeaderContainer />

      <div className="flex-1 p-4 overflow-y-auto">
        {steps.length > 0 ? (
          steps.map((goal: SubType, index: number) => (
            <SubGoalLayout key={index} subGoal={goal} />
          ))
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

        <AddSubGoalButtonComponent />
      </div>
    </div>
  );
};

export default StepsLayout;
