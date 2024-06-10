import { daysUntilCompletion } from "@/app/util/daysUntilCompletion";
import StatusDateContainer from "@/app/container/StatusDateContainer";
import { getDaysLeftStyle } from "../util/getDaysLeftStyle";

const COMPLETED: number = 1;
const PENDING: number = 2;

type Props = {
  subUID: string;
  dueDate: string;
  status: number;
};

const SubGoalDateLayout = ({ subUID, dueDate, status }: Props) => {
  const remainingDays: number = daysUntilCompletion(dueDate);
  const remainingDaysStyle: { text: string, style: string } = getDaysLeftStyle(remainingDays);

  return (
    <div className="flex items-center justify-end px-8 w-full">
      <div className="flex flex-col gap-2 justify-center items-center">
        <StatusDateContainer subUID={subUID} status={status} dueDate={dueDate} />

        {status !== COMPLETED && status !== PENDING && dueDate && (
          <p className={`flex items-center justify-center gap-2 text-center`}>
            {dueDate}{" "}
            <span className={`${remainingDaysStyle.style}`}>{remainingDaysStyle.text}</span>
          </p>
        )}

      </div>
    </div>
  );
};

export default SubGoalDateLayout;
