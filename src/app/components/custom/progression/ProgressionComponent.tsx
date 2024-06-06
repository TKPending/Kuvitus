import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { SubType } from "@/app/types/SubType";

type Props = {
  subGoals: SubType[];
};

const ProgressionComponent = ({ subGoals }: Props) => {
  const calculateProgression = (): number => {
    const subGoalAmount: number = subGoals.length;
    let completedSubGoals: number = 0;

    subGoals.forEach((sub) => {
      if (sub.subStatus === 1) {
        completedSubGoals++;
      }
    });

    return (completedSubGoals / subGoalAmount) * 100;
  };

  const percentage: number = calculateProgression();

  return (
    <div className="flex items-center justify-center rounded-full h-16 w-16">
      <p className="font-semibold">
        <CircularProgressbar value={percentage} text={`${percentage}%`} />
      </p>
    </div>
  );
};

export default ProgressionComponent;
