type Props = {
    title: string;
};

const TagsComponent = ({ title }: Props) => {
  return (
    <div className="h-4 w-auto px-2 bg-black bg-opacity-60 rounded flex items-center justify-center">
      <p className="text-white text-xs">{title}</p>
    </div>
  );
};

export default TagsComponent;
