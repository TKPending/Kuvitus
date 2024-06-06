import { useDispatch } from "react-redux";
import TagsComponent from "../components/TagsComponent";
import { setSubGoalFocus } from "../redux/slices/goal/goalSlice";
import TextInputComponent from "../components/TextInputComponent";

type Props = {
  UID: string;
  details: string;
  dueDate: string;
  status: number;
  tags: string[];
};

const SubGoalDropdownContainer = ({
  UID,
  details,
  dueDate,
  status,
  tags,
}: Props) => {
  const dispatch = useDispatch();

  const handleSubGoalFocus = () => {
    dispatch(setSubGoalFocus(UID));
  };

  const handleOnChange = () => {};

  const handleOnSave = async () => {};

  return (
    <div
      onClick={handleSubGoalFocus}
      className="flex flex-col gap-2 bg-black text-white p-4"
    >
      <div className="flex-col gap-4 flex">
        <p>Details</p>

        <TextInputComponent
          text={details}
          input={false}
          onSave={handleOnSave}
          onChange={handleOnChange}
        />
      </div>

      <div className="flex gap-4 w-full p-2 items-center justify-end">
        {tags.map((subject: string, index: number) => (
          <TagsComponent key={index} title={subject} />
        ))}
      </div>

      <p className="flex items-center justify-end p-2 px-8">
        {status === 0 ? "Uncomplete" : status === 1 ? "Complete" : "Pending"}
      </p>
    </div>
  );
};

export default SubGoalDropdownContainer;
