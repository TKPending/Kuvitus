import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { SubType } from "@/app/types/SubType";
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';


const ProgressionComponent = () => {
  const subGoals: SubType[] = useSelector((state: RootState) => state.goal.subGoals);

  const completeState = {
    textColor: "#fff",
    trailColor: "#fff",
    pathColor: "#12B419",
    transition: "stroke 2s ease-in-out"  // Add transition property
  };

  const uncompleteState = {
    textColor: "#fff",
    pathColor: "#D9D9D9",
    trailColor: "#fff",
    transition: "stroke 0.5s ease-in-out"  // Add transition property
  }

  const calculateProgression = (): number => {
    const subGoalAmount: number = subGoals.length;
    let completedSubGoals: number = 0;

    subGoals.forEach((sub) => {
      if (sub.subStatus === 1) {
        completedSubGoals++;
      }
    });

    const progression: number = (completedSubGoals / subGoalAmount) * 100;
    return parseFloat(progression.toFixed(2));
  };

  const percentage: number = calculateProgression();

  return (
    <div className="flex items-center justify-center rounded-full h-16 w-16">
      <p className="font-semibold">
        <CircularProgressbar value={percentage} text={`${percentage}%`} styles={buildStyles(percentage === 100 ? completeState : uncompleteState)} />
      </p>
    </div>
  );
};

export default ProgressionComponent;
