"use client"

import { useState, useEffect } from "react";
import AddGoalButtonComponent from "@/app/components/AddGoalButtonComponent";
import ActiveGoalContainer from "@/app/container/ActiveGoalContainer";
import { GoalType } from "@/app/types/GoalType";
import { getRandomPosition } from "@/app/util/getRandomPosition";
import { BASIC, MEDIUM, ADVANCED } from "@/temp/tempGoalData";

interface LocalGoals {
    goal: GoalType,
    position: { x: number, y: number, t: number, b: number },
};

const InteractiveProvider = () => {
    const [ goals, setGoals ] = useState<LocalGoals[]>([]);
    const [ iterator, setIterator ] = useState<number>(0);
    const tempgoals: GoalType[] = [BASIC, MEDIUM, ADVANCED];

    const handleAddGoal = () => {
        const localNewGoal = {
            goal: tempgoals[iterator],
            position: getRandomPosition(),
        }
        setGoals([...goals, localNewGoal]);
        setIterator((prevIterator) => (prevIterator + 1) % tempgoals.length);
    };

    useEffect(() => {
        console.log(goals);
    }, [iterator]);

    return (
        <div className="relative h-screen w-screen">
            {goals.map((goal: LocalGoals, index: number) => (
                <ActiveGoalContainer key={index} goal={goal.goal} position={goal.position} />
            ))}

            <AddGoalButtonComponent onClick={handleAddGoal} />
        </div>
    )
};

export default InteractiveProvider;
