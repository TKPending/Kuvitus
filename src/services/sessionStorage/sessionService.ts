import { LocalGoalType } from "@/app/types/LocalGoalType";

class SessionService {
  kuvitusSessionCheck(localGoals: LocalGoalType[]) {
    const kuvitus = sessionStorage.getItem("application");
    const goals = sessionStorage.getItem("goals");

    if (kuvitus === "kuvitus" && goals) {
      const existingGoals: string | null = sessionStorage.getItem("goals");
      const jsonGoals = JSON.parse(existingGoals!) as LocalGoalType[];

      return jsonGoals;
    }
    sessionStorage.setItem("application", "kuvitus");
    sessionStorage.setItem("goals", JSON.stringify(localGoals));

    return null;
  };

  addSessionGoal(goal: LocalGoalType) {
    const sessionGoals: string | null = sessionStorage.getItem("goals");
    const jsonGoals: LocalGoalType[] = JSON.parse(sessionGoals!) as LocalGoalType[] ;

    const updatedGoals: LocalGoalType[] = [...jsonGoals, goal];
    sessionStorage.setItem("goals", JSON.stringify(updatedGoals));
  }
}

export default new SessionService();
