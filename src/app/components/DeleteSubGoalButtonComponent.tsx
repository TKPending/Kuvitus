type Props = {
    onDelete: () => void;
};

const DeleteSubGoalButtonComponent = ({ onDelete }: Props) => {
  return (
    <div className="h-12 w-full flex items-center justify-end gap-2 px-4">
      <p onClick={onDelete} className="py-2 px-4 bg-red-600 rounded text-white cursor-pointer hover:bg-red-800 transition duration-200">
        Delete
      </p>
    </div>
  );
};

export default DeleteSubGoalButtonComponent;
