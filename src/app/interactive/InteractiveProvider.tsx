"use client"

import { useState, useEffect, useRef } from "react";
import AddGoalButtonComponent from "@/app/components/AddGoalButtonComponent";
import ActiveGoalContainer from "@/app/container/ActiveGoalContainer";
import { GoalType } from "@/app/types/GoalType";
import { getRandomPosition } from "@/app/util/getRandomPosition";
import { BASIC, MEDIUM, ADVANCED } from "@/temp/tempGoalData";

interface LocalGoals {
    goal: GoalType,
    position: { x: number, y: number, t: number, b: number },
    velocity: { vx: number, vy: number, vt: number, vb: number },
};

const InteractiveProvider = () => {
    const [ goals, setGoals ] = useState<LocalGoals[]>([]);
    const [ iterator, setIterator ] = useState<number>(0);
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
                vb: Math.random() * 2 - 1 },
        }
        setGoals([...goals, localNewGoal]);
        setIterator((prevIterator) => (prevIterator + 1) % tempgoals.length);
    };

    const updatePositions = () => {
        setGoals((prevGoals) => 
            prevGoals.map((goal: any) => {
                let { x, y, t, b } = goal.position;
                let { vx, vy, vt, vb } = goal.velocity;
    
                x += vx;
                y += vy;
                t += vt;
                b += vb;
    
                if (x < 0 || x > window.innerWidth - 10) vx *= -1;
                if (y < 0 || y > window.innerHeight - 10) vy *= -1;
                if (t < 0 || t > window.innerHeight - 10) vt *= -1;
                if (b < 0 || b > window.innerHeight - 10) vb *= -1;
    
                return {
                    ...goal,
                    position: { x, y, t, b },
                    velocity: { vx, vy, vt, vb },
                };
            })
        );
    };
    

    const animate = () => {
        updatePositions();
        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current!);
    }, []);

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
