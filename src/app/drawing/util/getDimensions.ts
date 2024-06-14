export const getCanvasDimension = (
  e: React.MouseEvent
): { canvasX: number; canvasY: number } => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const rect = canvas.getBoundingClientRect();

  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  const canvasX = (e.clientX - rect.left) * scaleX;
  const canvasY = (e.clientY - rect.top) * scaleY;

  return { canvasX, canvasY };
};
