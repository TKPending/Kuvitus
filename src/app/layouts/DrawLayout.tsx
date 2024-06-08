import DrawingProvider from "@/app/drawing/DrawingProvider";

const DrawLayout = () => {
  return (
    <div className="h-3/4 p-4 flex items-center justify-center">
      <DrawingProvider />
    </div>
  );
};

export default DrawLayout;
