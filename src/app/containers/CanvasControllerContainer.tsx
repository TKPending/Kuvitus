import CanvasRevisionComponent from "@/app/components/canvas/CanvasRevisionComponent";
import CanvasZoomComponent from "@/app/components/canvas/CanvasZoomComponent";
import { ElementType } from "../types/DrawingTypes";

type Props = {
  scale: number;
  displayTrashCan: boolean;
  selectedElement: ElementType | null;
  onUndo: () => void;
  onRedo: () => void;
  handleZoom: (delta: number) => void;
};

const CanvasControllerContainer = ({
  scale,
  displayTrashCan,
  selectedElement,
  onUndo,
  onRedo,
  handleZoom,
}: Props) => {
  return (
    <div className="absolute left-5 bottom-5 flex gap-6 items-end justify-end p-2">
      <CanvasZoomComponent scale={scale} onZoomIn={() => handleZoom(0.1)} onZoomOut={() => handleZoom(-0.1)} />
      <CanvasRevisionComponent
        selectedElement={selectedElement}
        displayTrashCan={displayTrashCan}
        onUndo={onUndo}
        onRedo={onRedo}
      />
    </div>
  );
};

export default CanvasControllerContainer;
