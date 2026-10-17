import { ScrollTrigger } from 'gsap/ScrollTrigger';


/**
 * @param delay - Delay in milliseconds. Default is 200ms.
 */
export const useRefreshTriggers = (delay?: number, callback?: Function) =>
{
  const siteState = useSiteState();
  siteState.isRefreshingGsap.value = true;

  useTimeout('refresh-triggers', delay ?? 200, () =>
  {
    ScrollTrigger.refresh();
    siteState.isRefreshingGsap.value = false;
    callback?.();
  });
};


export const useRefreshTriggersOnImageLoad = (root: HTMLElement) =>
{
  const images = [...root.querySelectorAll<HTMLImageElement>('img')];
  const pending = images.filter(img => !img.complete);

  if (!pending.length)
  {
    useRefreshTriggers();
    return;
  }

  let remaining = pending.length;
  const onDone = () =>
  {
    remaining--;
    if (!remaining) useRefreshTriggers();
  };

  pending.forEach(img =>
  {
    img.addEventListener('load', onDone, { once: true });
    img.addEventListener('error', onDone, { once: true });
  });
};
