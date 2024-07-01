"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import GoalOverviewLayout from "@/app/layouts/GoalOveriewLayout";
import SubGoalOverviewLayout from "@/app/layouts/SubGoalOverviewLayout";
import DrawingCanvas from "@/app/drawing/DrawingCanvas";
import KuvitusLayout from "@/app/layouts/KuvitusLayout";
import SessionService from "@/services/sessionStorage/SessionService";
import { setGoal } from "@/app/redux/slices/goal/goalSlice";
import { ActiveGoalType } from "@/app/types/ActiveGoalType";
import HelpButtonComponent from "@/app/components/HelpButtonComponent";

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
    <div className="relative min-h-screen w-screen max-w-screen flex flex lg:flex-row flex-col overscroll-y-none">
      <KuvitusLayout home={false} />
      <div className="flex flex-col gap-4 h-screen w-full p-4">
        <GoalOverviewLayout />
        <DrawingCanvas />
      </div>

      <SubGoalOverviewLayout />
      <HelpButtonComponent />
    </div>
  );
};

export default DetailedGoalPage;
