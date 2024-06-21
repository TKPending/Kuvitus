import TagsComponent from "../components/TagsComponent";

type Props = {
  tags: string[];
  subUID?: string;
  button?: boolean;
  onRemoval?: (tagToRemove: string) => void;
};

const TagsContainer = ({
  tags,
  subUID,
  button = true,
  onRemoval = () => console.log("Call function to remove tag"),
}: Props) => {
  return (
    <div className="w-full flex gap-2 items-center justify-end flex-wrap">
      {tags.map((tag: string, index: number) => (
        <TagsComponent
          key={index}
          title={tag}
          subUID={subUID}
          button={button}
          handleDeletion={onRemoval}
        />
      ))}
    </div>
  );
};

export default TagsContainer;
