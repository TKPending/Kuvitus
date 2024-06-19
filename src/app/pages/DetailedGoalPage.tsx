"use client"

import { useDispatch } from "react-redux";
import GoalOverviewLayout from "@/app/layouts/GoalOveriewLayout";
import StepsLayout from "@/app/layouts/SubGoalOverviewLayout";
import { GoalType } from "@/app/types/GoalType";
import DrawingCanvas from "@/app/drawing/DrawingCanvas";

type Props = {
    goalUID: string;
};

const DetailedGoalPage = ({ goalUID }: Props) => {
    const dispatch = useDispatch();

    return (
        <div className="fixed h-screen w-screen max-h-screen max-w-screen flex">
            <div className="flex flex-col gap-4 h-screen w-full p-4">
                <GoalOverviewLayout />
                <DrawingCanvas />
            </div>

            <StepsLayout />
        </div>
    )
};

export default DetailedGoalPage;