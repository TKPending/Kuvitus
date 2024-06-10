import DrawingCanvas from "@/app/drawing/DrawingCanvas";

const DrawLayout = () => {
  return (
    <div className="h-3/4 p-4 flex items-center justify-center">
      <DrawingCanvas />
    </div>
  );
};

export default DrawLayout;
