import { GoalType } from "@/app/types/GoalType";
import { LocalGoalType } from "@/app/types/LocalGoalType";
import { ActiveGoalType } from "@/app/types/ActiveGoalType";
import { SubType } from "@/app/types/SubType";
import { getSessionStorage, setSessionStorage } from "./SessionHelper";

class SessionService {
  private fetchSessionGoals() {
    const sessionGoals: string | null = getSessionStorage("goals");
    const jsonGoal: LocalGoalType[] = JSON.parse(
      sessionGoals!
    ) as LocalGoalType[];
    
    return jsonGoal;
  }

  private fetchGoal(goalUID: string): ActiveGoalType | null {
    const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();

    const index: number = sessionGoals.findIndex(
      (goal: LocalGoalType) => goal.goal.uID === goalUID
    );
    
    if (index === -1) {
      return null;
    }

    const goal: GoalType = sessionGoals[index].goal;
    
    return {
      index,
      goal,
    };
  }

  public kuvitusSessionCheck(localGoals: LocalGoalType[]) {
    const kuvitus = getSessionStorage("application");
    const goals = getSessionStorage("goals");

    if (kuvitus === "kuvitus" && goals) {
      const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();

      return sessionGoals;
    }
    setSessionStorage("application", "kuvitus");
    setSessionStorage("goals", JSON.stringify(localGoals));

    return null;
  }

  public addSessionGoal(goal: LocalGoalType) {
    const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();

    const updatedGoals: LocalGoalType[] = [...sessionGoals, goal];
    setSessionStorage("goals", JSON.stringify(updatedGoals));
  }

  public deleteSessionGoal(goalUID: string) {
    const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();
    const filteredGoals: LocalGoalType[] = sessionGoals.filter(
      (goal) => goal.goal.uID !== goalUID
    );

    setSessionStorage("goals", JSON.stringify(filteredGoals));
  }

  public fetchSpecificGoal(goalUID: string) {
    const specificGoal: ActiveGoalType | null = this.fetchGoal(goalUID);
    if (!specificGoal) {
      return null;
    }

    setSessionStorage(
      "specificGoal",
      JSON.stringify({
        index: specificGoal.index,
        goal: specificGoal.goal,
      })
    );

    return specificGoal;
  }

  public updateValue<K extends keyof GoalType>(
    goalUID: string,
    key: K,
    value: GoalType[K]
  ) {
    const specificGoal: ActiveGoalType | null = this.fetchGoal(goalUID);
    if (!specificGoal) {
      return;
    }

    const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();
    sessionGoals[specificGoal.index].goal[key] = value;

    setSessionStorage("goals", JSON.stringify(sessionGoals));
  }

  public updateSubGoalValue<K extends keyof SubType>(
    goalUID: string,
    subUID: string,
    key: K,
    value: SubType[K]
  ) {
    const specificGoal: ActiveGoalType | null = this.fetchGoal(goalUID);
    if (!specificGoal) return;

    const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();
    const subGoals: SubType[] = sessionGoals[specificGoal.index].goal.subGoals;

    const index: number = subGoals.findIndex(
      (subGoal: SubType) => subGoal.subUID === subUID
    );
    if (index === -1) return;

    subGoals[index][key] = value;

    setSessionStorage("goals", JSON.stringify(sessionGoals));
  }

  public addSubGoal(goalUID: string, subGoal: SubType) {
    const specificGoal: ActiveGoalType | null = this.fetchGoal(goalUID);
    if (!specificGoal) {
      return;
    }

    const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();
    sessionGoals[specificGoal.index].goal.subGoals.push(subGoal);

    setSessionStorage("goals", JSON.stringify(sessionGoals));
  }

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

    setSessionStorage("goals", JSON.stringify(sessionGoals));
  }

  public addSubGoalTag(goalUID: string, subUID: string, value: string) {
    const specificGoal: ActiveGoalType | null = this.fetchGoal(goalUID);
    if (!specificGoal) return;

    const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();
    const subGoals: SubType[] = sessionGoals[specificGoal.index].goal.subGoals;

    const index: number = subGoals.findIndex(
      (subGoal: SubType) => subGoal.subUID === subUID
    );
    if (index === -1) return;

    subGoals[index].subTags.push(value);

    setSessionStorage("goals", JSON.stringify(sessionGoals));
  }

  public removeSubGoalTag(goalUID: string, subUID: string, value: string) {
    const specificGoal: ActiveGoalType | null = this.fetchGoal(goalUID);
    if (!specificGoal) return;

    const sessionGoals: LocalGoalType[] = this.fetchSessionGoals();
    const subGoals: SubType[] = sessionGoals[specificGoal.index].goal.subGoals;

    const index: number = subGoals.findIndex(
      (subGoal: SubType) => subGoal.subUID === subUID
    );
    if (index === -1) return;

    subGoals[index].subTags = subGoals[index].subTags.filter(
      (tag: string) => tag !== value
    );

    setSessionStorage("goals", JSON.stringify(sessionGoals));
  }

  public deleteAllGoals() {
    setSessionStorage("goals", JSON.stringify([]));
  }

  public fetchExisitingGoalValue(selection: string) {
    const fetchedResult = getSessionStorage("specificGoal");
    if (!fetchedResult) {
      return null;
    }
    const parsedResult = JSON.parse(fetchedResult);

    return parsedResult.goal[selection];
  }
}

export default new SessionService();
