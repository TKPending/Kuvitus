import { GoalType } from "@/app/types/GoalType";
import { LocalGoalType } from "@/app/types/LocalGoalType";
import { ActiveGoalType } from "@/app/types/ActiveGoalType";
import { SubType } from "@/app/types/SubType";

class SessionService {
  private fetchSessionGoals() {
    const sessionGoals: string | null = sessionStorage.getItem("goals");
    const jsonGoal: LocalGoalType[] = JSON.parse(sessionGoals!) as LocalGoalType[];
    // Handle Error
    
    return jsonGoal;
  };

  private fetchGoal(goalUID: string): ActiveGoalType | null {
    const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();
  
    const index: number = sessionGoals.findIndex((goal: LocalGoalType) => goal.goal.uID === goalUID);
    const goal: GoalType = sessionGoals[index].goal;
  
    if (index === -1 || !goal) {
      return null;
    }
  
    return {
      index,
      goal,
    };
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
    const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();
    const filteredGoals: LocalGoalType[] = sessionGoals.filter((goal) => (
      goal.goal.uID !== goalUID
    ));

    sessionStorage.setItem("goals", JSON.stringify(filteredGoals));
  };

  public fetchSpecificGoal(goalUID: string) {
    const specificGoal: ActiveGoalType | null = this.fetchGoal(goalUID);
    if (!specificGoal) {
      return null;
    }

    sessionStorage.setItem("specificGoal", JSON.stringify({
      index: specificGoal.index,
      goal: specificGoal.goal,
    }))

    return specificGoal;
  };

  public updateValue<K extends keyof GoalType>(goalUID: string, key: K, value: GoalType[K]) {
    const specificGoal: ActiveGoalType | null = this.fetchGoal(goalUID);
    if (!specificGoal) {
      return;
    }
    
    const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();
    sessionGoals[specificGoal.index].goal[key] = value;

    sessionStorage.setItem("goals", JSON.stringify(sessionGoals));
  };

  public updateSubGoalValue<K extends keyof SubType>(goalUID: string, subUID: string, key: K, value: SubType[K]) {
    const specificGoal: ActiveGoalType | null = this.fetchGoal(goalUID);
    if (!specificGoal) return;
  
    const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();
    const subGoals: SubType[] = sessionGoals[specificGoal.index].goal.subGoals;
  
    const index: number = subGoals.findIndex((subGoal: SubType) => subGoal.subUID === subUID);
    if (index === -1) return; 
  
    subGoals[index][key] = value;
  
    sessionStorage.setItem("goals", JSON.stringify(sessionGoals));
  };
  

  public addSubGoal(goalUID: string, subGoal: SubType) {
    const specificGoal: ActiveGoalType | null = this.fetchGoal(goalUID);
    if (!specificGoal) {
      return;
    }

    const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();
    sessionGoals[specificGoal.index].goal.subGoals.push(subGoal);

    sessionStorage.setItem("goals", JSON.stringify(sessionGoals));
  };

  public removeSubGoal(goalUID: string, subGoalUID: string) {
    const specificGoal: ActiveGoalType | null = this.fetchGoal(goalUID);
    if (!specificGoal) {
      return;
    }

    const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();
    const mainGoal: GoalType = sessionGoals[specificGoal.index].goal;
    mainGoal.subGoals = mainGoal.subGoals.filter(
      (sg: SubType) => sg.subUID !== subGoalUID
    );

    sessionStorage.setItem("goals", JSON.stringify(sessionGoals));
  };
}

export default new SessionService();
