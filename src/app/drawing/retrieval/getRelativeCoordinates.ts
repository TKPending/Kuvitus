export const getRelativeCoordinates = (
  event: React.MouseEvent,
  offset: { x: number; y: number },
  scaleOffset: {x: number, y: number},
  scale: number
) => {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width; // Scaling factor for X
  const scaleY = canvas.height / rect.height; // Scaling factor for Y

  return {
    clientX: ((event.clientX - rect.left) * scaleX - offset.x * scale + scaleOffset.x) / scale,
    clientY: ((event.clientY - rect.top) * scaleY - offset.y * scale + scaleOffset.y) / scale,
  };
};
