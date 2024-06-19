import CanvasRevisionComponent from "@/app/components/canvas/CanvasRevisionComponent";
import CanvasZoomComponent from "@/app/components/canvas/CanvasZoomComponent";

type Props = {
  scale: number;
  displayTrashCan: boolean;
  onUndo: () => void;
  onRedo: () => void;
  handleZoom: (delta: number) => void;
};

const CanvasControllerContainer = ({
  scale,
  displayTrashCan,
  onUndo,
  onRedo,
  handleZoom,
}: Props) => {
  return (
    <div className="absolute left-5 bottom-5 flex gap-6 items-end justify-end p-2">
      <CanvasZoomComponent scale={scale} onZoomIn={() => handleZoom(0.1)} onZoomOut={() => handleZoom(-0.1)} />
      <CanvasRevisionComponent
        displayTrashCan={displayTrashCan}
        onUndo={onUndo}
        onRedo={onRedo}
      />
    </div>
  );
};

export default CanvasControllerContainer;
