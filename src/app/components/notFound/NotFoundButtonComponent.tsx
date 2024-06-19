type Props = {
  text: string;
  onClick: () => void;
};

const NotFoundButtonComponent = ({ text, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer p-6 border border-black border-2 hover:bg-black hover:text-white transition duration-200 rounded-lg"
    >
      <p className="text-4xl">{text}</p>
    </div>
  );
};

export default NotFoundButtonComponent;
