import AdvancedGoalPage from "@/app/pages/AdvancedGoalPage";

type Props = {
    params: {goalUID: string};
};

const GoalPage = ({ params }: Props) => {
    const goalUID: string = params.goalUID;

    return <AdvancedGoalPage goalUID={goalUID} />
};

export default GoalPage;
