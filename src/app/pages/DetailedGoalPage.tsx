"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import GoalOverviewLayout from "@/app/layouts/GoalOveriewLayout";
import StepsLayout from "@/app/layouts/SubGoalOverviewLayout";
import DrawingCanvas from "@/app/drawing/DrawingCanvas";
import KuvitusLayout from "@/app/layouts/KuvitusLayout";
import SessionService from "@/services/sessionStorage/SessionService";
import { setGoal } from "@/app/redux/slices/goal/goalSlice";
import { ActiveGoalType } from "@/app/types/ActiveGoalType";

type Props = {
  goalUID: string;
};

const DetailedGoalPage = ({ goalUID }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const goal: ActiveGoalType | null =
      SessionService.fetchSpecificGoal(goalUID);
    if (goal) {
      dispatch(setGoal(goal.goal));
    }
  }, []);

  return (
    <div className="h-screen w-screen max-h-screen max-w-screen flex overscroll-y-none">
      <KuvitusLayout home={false} />
      <div className="flex flex-col gap-4 h-screen w-full p-4">
        <GoalOverviewLayout />
        <DrawingCanvas />
      </div>

      <StepsLayout />
    </div>
  );
};

export default DetailedGoalPage;
