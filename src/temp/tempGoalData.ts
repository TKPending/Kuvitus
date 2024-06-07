import { GoalType } from "@/app/types/GoalType";

export const BASIC: GoalType = {
    goalUID: "1",
    goalTitle: "Lose 5KG",
    goalDescription: "",
    goalStatus: 0,
    goalDepth: "basic",
    goalTags: [],
    goalDueDate: "",
    goalSteps: []
};

export const MEDIUM: GoalType = {
    goalUID: "2",
    goalTitle: "Lose 5KG",
    goalDescription: "This is a medium goal",
    goalStatus: 1,
    goalDepth: "medium",
    goalTags: ["Fitness", "Discipline"],
    goalDueDate: "01/06/24",
    goalSteps: []
};

export const ADVANCED: GoalType = {
    goalUID: "3",
    goalTitle: "Lose 5KG",
    goalDescription: "I am getting fat and I want to lose weight",
    goalStatus: 1,
    goalDepth: "advanced",
    goalTags: ["Fitness", "Discipline", "Fun"],
    goalDueDate: "01/06/24",
    goalSteps: [
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
            subStatus: 0,
            subTags: ["Health", "Sleep"],
            subDueDate: "08/05/2024",
            isPressed: false,
        }
    ]
};
