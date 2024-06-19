export const nearPoint = (
  x: number,
  y: number,
  x1: number,
  y1: number,
  area: string
) => {
  return Math.abs(x - x1) < 5 && Math.abs(y - y1) < 5 ? area : null;
};
