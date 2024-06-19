import TagsComponent from "../components/TagsComponent";

type Props = {
  tags: string[];
  subUID?: string;
  button?: boolean;
};

const TagsContainer = ({ tags, subUID, button = true }: Props) => {
  return (
    <div className="w-full flex gap-2 items-center justify-end flex-wrap">
      {tags.map((tag: string, index: number) => (
        <TagsComponent key={index} title={tag} subUID={subUID} button={button} />
      ))}
    </div>
  );
};

export default TagsContainer;
