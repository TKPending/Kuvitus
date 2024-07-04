"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import GoalOverviewLayout from "@/app/layouts/GoalOveriewLayout";
import SubGoalOverviewLayout from "@/app/layouts/SubGoalOverviewLayout";
import DrawingCanvas from "@/app/drawing/DrawingCanvas";
import KuvitusLayout from "@/app/layouts/KuvitusLayout";
import SessionService from "@/services/sessionStorage/SessionService";
import { setGoal } from "@/app/redux/slices/goal/goalSlice";
import { ActiveGoalType } from "@/app/types/ActiveGoalType";
import CanvasUnavailableComponent from "@/app/components/canvas/CanvasUnavailableComponent";
import NavigationBarComponent from "@/app/components/NavigationBarComponent";

type Props = {
  goalUID: string;
};

const DetailedGoalPage = ({ goalUID }: Props) => {
  const dispatch = useDispatch();
  const isMobile: boolean = useIsMobile();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const goal: ActiveGoalType | null =
      SessionService.fetchSpecificGoal(goalUID);
    if (goal) {
      dispatch(setGoal(goal.goal));
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="relative w-screen min-h-screen flex lg:flex-row flex-col overscroll-none">
      {isLoading ? (
        <KuvitusLayout home={false} isLoading={isLoading} />
      ) : (
        <>
          <div
            className={`flex flex-col gap-4 ${
              isMobile ? "h-auto" : "h-screen"
            } w-full pt-4`}
          >
            <GoalOverviewLayout />
            {isMobile ? <CanvasUnavailableComponent /> : <DrawingCanvas />}
          </div>

          <div className="flex flex-col w-full gap-8 py-8 max-h-screen">
            {/* {!isMobile && <NavigationBarComponent />} */}
          <SubGoalOverviewLayout />
          </div>
        </>
      )}
    </div>
  );
};

export default DetailedGoalPage;
