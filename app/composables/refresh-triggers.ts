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
