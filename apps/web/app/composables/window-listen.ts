export const useWindowListen = (
  event: 'resize' | 'scroll',
  callback: () => void,
  options?: {
    skipMountedCall?: boolean
  }
) =>
{
  onMounted(() =>
  {
    window.addEventListener(event, callback);
    if (!options?.skipMountedCall) callback();
  });
  onUnmounted(() => window.removeEventListener(event, callback));
};
