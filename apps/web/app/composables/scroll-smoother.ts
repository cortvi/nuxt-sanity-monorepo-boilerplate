export const useScrollSmoother = (smoother?: ScrollSmoother) =>
{
  const value = useState('scroll-smoother', () => smoother);
  if (smoother) value.value = smoother;
  return value;
};
