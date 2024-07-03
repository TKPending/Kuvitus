"use client";

import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/app/hooks/useIsMobile";
import {v4 as uuid} from 'uuid';
import AddGoalButtonComponent from "@/app/components/interactive/AddGoalButtonComponent";
import InteractiveGoalLayout from "@/app/layouts/InteractiveGoalLayout";
import { getRandomPosition } from "@/app/util/getRandomPosition";
import { LocalGoalType } from "@/app/types/LocalGoalType";
import {
  addLocalGoal,
  addSessionGoals,
  updateLocalPositions,
} from "@/app/redux/slices/localGoals/localGoalsSlice";
import KuvitusLayout from "@/app/layouts/KuvitusLayout";
import SessionService from "@/services/sessionStorage/SessionService";
import NavigationBarComponent from "@/app/components/NavigationBarComponent";
import RemoveAllGoalsComponent from "@/app/components/interactive/RemoveAllGoalsComponent";

const InteractiveCanvas = () => {
  const dispatch = useDispatch();
  const isMobile: boolean = useIsMobile();
  const localGoals: LocalGoalType[] = useSelector(
    (state: RootState) => state.localGoals.goals
  );
  const [isLoading, setIsLoading] = useState(true);
  const requestRef = useRef<number>();

  const handleAddGoal = () => {
    const UID = uuid();
    const localNewGoal = {
      goal: {
        uID: UID,
        title: "Enter your goal",
        description: "",
        status: 0,
        depth: "basic",
        tags: [],
        dueDate: "",
        completeDate: "",
        subGoals: [],
        drawingElements: [],
        drawingToolType: {
          type: "selection",
          icon: "",
        },
        drawingCanvas: {
          isError: false,
          errorMessage: "",
          displayDeleteOption: false,
          deleteAll: false,
          specificDelete: null,
        },
      },
      position: getRandomPosition(),
      velocity: {
        vx: Math.random() * 4 - 2,
        vy: Math.random() * 4 - 2,
        vt: Math.random() * 4 - 2,
        vb: Math.random() * 4 - 2,
      },
      isFocused: false,
      isDragged: false,
      titleChange: false,
    };

    SessionService.addSessionGoal(localNewGoal);
    dispatch(addLocalGoal(localNewGoal));
  };

  const animate = () => {
    dispatch(updateLocalPositions());
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  }, []);

  useEffect(() => {
    const fetchGoals = () => {
      const goals = SessionService.kuvitusSessionCheck(localGoals);
      if (goals && goals.length > 0) {
        goals.map((goal) => {
          const newRenderPosition = getRandomPosition();
          goal.position = newRenderPosition;
        })
        dispatch(addSessionGoals(goals));
      }
    };

    fetchGoals();
  }, [isMobile]);

  useEffect(() => {
    if (sessionStorage.getItem("specificGoal")) {
      sessionStorage.removeItem("specificGoal");
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="relative h-screen max-h-screen w-screen max-w-screen overflow-hidden">
      <KuvitusLayout isLoading={isLoading} />
      <NavigationBarComponent />
      {localGoals.length === 0 && (
        <div className='h-full w-full flex items-center justify-center'>
          <p className="text-3xl text-center">Click on the add button to add a goal!</p>
        </div>
      )}
      {localGoals.map((goal: LocalGoalType, index: number) => (
        <InteractiveGoalLayout key={index} goal={goal} />
      ))}
      <AddGoalButtonComponent onClick={handleAddGoal} />
      {localGoals.length > 0 && <RemoveAllGoalsComponent />}
    </div>
  );
};

export default InteractiveCanvas;
