import { RootState } from "@/app/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { SubType } from "@/app/types/SubType";

const StepsLayout = () => {
    const dispatch = useDispatch();
    const steps: SubType[] = useSelector((state: RootState) => state.goal.goalSteps);

    return (
        <div className="w-full bg-red-200"></div>
    )
}

export default StepsLayout;
