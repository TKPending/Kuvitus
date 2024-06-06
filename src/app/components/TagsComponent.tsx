type Props = {
    title: string;
    button?: boolean;
};

const TagsComponent = ({ title, button=true }: Props) => {
  return (
    <div className={`h-4 w-auto px-2 ${button ? "bg-black bg-opacity-60" : ""}flex items-center justify-center`}>
      <p className={`${button ? "text-white" : "text-white"} text-white text-xs`}>{title}</p>
    </div>
  );
};

export default TagsComponent;
