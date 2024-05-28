import ActiveGoalContainer from "./container/ActiveGoalContainer";
import GoalContainer from "./container/GoalContainer";

export default function Home() {
  return (
    <main className="h-screen w-screen flex items-center justify-center">
      <ActiveGoalContainer />
    </main>
  );
}
