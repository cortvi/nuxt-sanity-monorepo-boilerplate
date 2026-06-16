export const skipFrame = () =>
  new Promise(r => requestAnimationFrame(r));

export const skipTime = (miliseconds: number) =>
  new Promise(r => setTimeout(r, miliseconds));
