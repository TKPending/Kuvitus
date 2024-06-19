import { GoalType } from "@/app/types/GoalType";

export const BASIC: GoalType = {
    uID: "1",
    title: "Drink Water Today",
    description: "",
    status: 0,
    depth: "basic",
    tags: [],
    dueDate: "",
    subGoals: [],
    drawingElements: [],
};

export const MEDIUM: GoalType = {
    uID: "2",
    title: "Researching Bowling",
    description: "This is a medium goal",
    status: 1,
    depth: "medium",
    tags: ["Fitness", "Discipline"],
    dueDate: "01/06/2024",
    subGoals: [],
    drawingElements: [],
};

export const ADVANCED: GoalType = {
    uID: "3",
    title: "Lose 5KG",
    description: "I am getting fat and I want to lose weight",
    status: 1,
    depth: "advanced",
    tags: ["Fitness", "Discipline", "Fun"],
    dueDate: "01/06/2024",
    subGoals: [
        {
            subUID: "1",
            subTitle: "Start a Balanced Diet",
            subDetails: "Consult with a nutritionist and create a balanced meal plan.",
            subStatus: 0,
            subTags: ["Nutrition", "Healthy Eating"],
            subDueDate: "01/06/2024",
            isPressed: false,
        },
        {
            subUID: "2",
            subTitle: "Exercise Regularly",
            subDetails: "Join a gym or start a home workout routine.",
            subStatus: 1,
            subTags: ["Fitness", "Exercise"],
            subDueDate: "02/06/2024",
            isPressed: false,
        },
        {
            subUID: "3",
            subTitle: "Track Progress",
            subDetails: "Use a fitness app to track calorie intake and exercise sessions.",
            subStatus: 0,
            subTags: ["Fitness", "Progress Tracking"],
            subDueDate: "03/06/2024",
            isPressed: false,
        },
        {
            subUID: "4",
            subTitle: "Stay Hydrated",
            subDetails: "Drink at least 8 glasses of water every day.",
            subStatus: 2,
            subTags: ["Health", "Hydration"],
            subDueDate: "",
            isPressed: false,
        },
        {
            subUID: "5",
            subTitle: "Get Adequate Sleep",
            subDetails: "Ensure 7-8 hours of quality sleep per night.",
            subStatus: 1,
            subTags: ["Health", "Sleep"],
            subDueDate: "08/06/2024",
            isPressed: false,
        }
    ],
    drawingElements: [],
};
