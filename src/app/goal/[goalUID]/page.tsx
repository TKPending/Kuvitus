type Props = {
    params: {goalUID: string};
};

const GoalPage = ({ params }: Props) => {
    const goalUID: string = params.goalUID;

    return (
        <div>{goalUID}</div>
    )
};

export default GoalPage;
