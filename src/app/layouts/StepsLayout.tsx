import { RootState } from "@/app/redux/store";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StepsHeaderContainer from "@/app/container/StepsHeaderContainer";
import { SubType } from "@/app/types/SubType";
import SubGoalLayout from "./SubGoalLayout";
import { ADVANCED } from "@/temp/tempGoalData";
import { setGoal } from "@/app/redux/slices/goal/goalSlice";

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

    })

    return (
        <div className="h-screen w-full p-8 flex flex-col ">
            <StepsHeaderContainer />

            <div className="flex-1 p-4 overflow-y-auto">
                {steps.map((goal: SubType, index: number) => (
                    <SubGoalLayout key={index} subGoal={goal} />
                ))}
            </div>
        </div>
    );
};

export default StepsLayout;
