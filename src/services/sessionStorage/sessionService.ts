import { LocalGoalType } from "@/app/types/LocalGoalType";

class SessionService {
  private fetchSessionGoals() {
    const sessionGoals: string | null = sessionStorage.getItem("goals");
    const jsonGoal: LocalGoalType[] = JSON.parse(sessionGoals!) as LocalGoalType[];
    // Handle Error
    
    return jsonGoal;
  };

  public kuvitusSessionCheck(localGoals: LocalGoalType[]) {
    const kuvitus = sessionStorage.getItem("application");
    const goals = sessionStorage.getItem("goals");

    if (kuvitus === "kuvitus" && goals) {
      const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();

      return sessionGoals;
    }
    sessionStorage.setItem("application", "kuvitus");
    sessionStorage.setItem("goals", JSON.stringify(localGoals));

    return null;
  };

  public addSessionGoal(goal: LocalGoalType) {
    const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();

    const updatedGoals: LocalGoalType[] = [...sessionGoals, goal];
    sessionStorage.setItem("goals", JSON.stringify(updatedGoals));
  };

  public deleteSessionGoal(goalUID: string) {
    console.log(goalUID);
    const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();
    const filteredGoals: LocalGoalType[] = sessionGoals.filter((goal) => (
      goal.goal.uID !== goalUID
    ));

    sessionStorage.setItem("goals", JSON.stringify(filteredGoals));
  };
}

export default new SessionService();
