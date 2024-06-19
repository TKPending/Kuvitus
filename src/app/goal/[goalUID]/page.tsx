import DetailedGoalPage from "@/app/pages/DetailedGoalPage";

type Props = {
    params: {goalUID: string};
};

const GoalPage = ({ params }: Props) => {
    const goalUID: string = params.goalUID;

    return <DetailedGoalPage goalUID={goalUID} />
};

export default GoalPage;
