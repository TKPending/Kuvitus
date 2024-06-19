type Props = {
  scale: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
};

const CanvasZoomComponent = ({ scale, onZoomIn, onZoomOut }: Props) => {
  const style =
    "cursor-pointer hover:scale-105 transition duration-200 h-8 w-8 rounded-lg bg-neutral-300";

  return (
    <div className="flex items justify-center gap-2">
      <div className={`${style}`} onClick={onZoomOut}></div>
      <div className="w-10 flex items-center justify-center">
        <p className="font-semibold w-12">
          {new Intl.NumberFormat("en-GB", { style: "percent" }).format(scale)}
        </p>
      </div>
      <div className={`${style}`} onClick={onZoomIn}></div>
    </div>
  );
};

export default CanvasZoomComponent;
