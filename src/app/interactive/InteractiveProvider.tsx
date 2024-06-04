"use client";

import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import AddGoalButtonComponent from "@/app/components/AddGoalButtonComponent";
import ActiveGoalContainer from "@/app/container/ActiveGoalContainer";
import { GoalType } from "@/app/types/GoalType";
import { getRandomPosition } from "@/app/util/getRandomPosition";
import { BASIC, MEDIUM, ADVANCED } from "@/temp/tempGoalData";
import { LocalGoalType } from "@/app/types/LocalGoalType";
import { addLocalGoal, updateLocalPositions } from "@/app/redux/slices/localGoals/localGoalsSlice";

const InteractiveProvider = () => {
    const dispatch = useDispatch();
    const localGoals = useSelector((state: RootState) => state.localGoals.goals);

    const [iterator, setIterator] = useState(0);
    const requestRef = useRef<number>();
    const tempgoals: GoalType[] = [BASIC, MEDIUM, ADVANCED];

    const handleAddGoal = () => {
        const localNewGoal = {
            goal: tempgoals[iterator],
            position: getRandomPosition(),
            velocity: { 
                vx: Math.random() * 2 - 1, 
                vy: Math.random() * 2 - 1, 
                vt: Math.random() * 2 - 1 , 
                vb: Math.random() * 2 - 1 
            },
            isFocused: false,
            isDragged: false,
        }
        dispatch(addLocalGoal(localNewGoal));
        setIterator((prevIterator) => (prevIterator + 1) % tempgoals.length);
    };

    const animate = () => {
        dispatch(updateLocalPositions());
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, []);

    return (
        <div className="relative h-screen w-screen">
            {localGoals.map((goal: LocalGoalType, index: number) => (
                <ActiveGoalContainer key={index} goal={goal} />
            ))}
            <AddGoalButtonComponent onClick={handleAddGoal} />
        </div>
    );
};

export default InteractiveProvider;
