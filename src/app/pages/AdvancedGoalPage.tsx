"use client"

import { useDispatch } from "react-redux";
import GoalDescriptionLayout from "@/app/layouts/GoalDescriptionLayout";
import DrawLayout from "@/app/layouts/DrawLayout";
import StepsLayout from "@/app/layouts/StepsLayout";
import { GoalType } from "@/app/types/GoalType";

type Props = {
    goalUID: string;
};

const AdvancedGoalPage = ({ goalUID }: Props) => {
    const dispatch = useDispatch();

    return (
        <div className="h-screen w-screen max-h-screen max-w-screen flex">
            <div className="w-full">
                <GoalDescriptionLayout />
                <DrawLayout />
            </div>

            <StepsLayout />
        </div>
    )
};

export default AdvancedGoalPage;