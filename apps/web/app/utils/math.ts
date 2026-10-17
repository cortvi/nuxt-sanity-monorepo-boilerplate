export const normalizeAround = (value: number, max: number) => ((value % max) + max) % max;

export const angleToHour = (angle: number) => normalizeAround(angle, 360) * 24 / 360;

export const dateToHour = (date: Date) =>
  date.getHours() +
  date.getMinutes() / 60 +
  date.getSeconds() / 3600;

export const isWithinWrappedRange = (value: number, start: number, end: number) =>
{
  if (start <= end) return value >= start && value <= end;
  return value >= start || value <= end;
};


export const lerp = (a: number, b: number, t: number) => {
  return a + t * (b - a);
};
export const invLerp = (a: number, b: number, v: number) => {
  return (v - a) / (b - a);
};
