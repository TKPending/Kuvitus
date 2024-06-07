import { useDispatch } from "react-redux";
import { daysUntilCompletion } from "@/app/util/daysUntilCompletion";

const UNCOMPLETE: number = 0;
const COMPLETED: number = 1;

type Props = {
  dueDate: string;
  status: number;
};

const SubGoalDateContainer = ({ dueDate, status }: Props) => {
  const remainingDays: number = daysUntilCompletion(dueDate);
  const progress: {text: string, color: string} = 
    status === UNCOMPLETE ? {text: "Uncomplete", color: "bg-red-400"} : status === COMPLETED ? {text: "Complete", color: "bg-green-400"} : {text: "Pending", color: "bg-neutral-800"};

  return (
    <div className="w-full flex items-center justify-end px-8">
      <div className="flex flex-col gap-2 items-center justify-center">
        <p className={`${dueDate ? "text-xs" : "text-base"} p-2 ${progress.color} rounded`}>
          {progress.text}
        </p>
        {status !== COMPLETED && dueDate && (
          <p className="flex items-center gap-2">
            {dueDate}{" "}
            {remainingDays > 0 ? (
              <span
                className={`text-xs ${
                  remainingDays > 3 ? "text-neutral-200" : "text-red-800"
                }`}
              >
                {remainingDays} left
              </span>
            ) : (
              <span className="text-xs text-red-200">Overdue</span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default SubGoalDateContainer;
