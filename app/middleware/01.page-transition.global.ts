const isInDom = (element: Element) =>
{
  let el: ParentNode | null = element;
  while ((el = el.parentNode) !== null)
  {
    if (el === document.body)
      return true;
  }
  return false;
};


export default defineNuxtRouteMiddleware(async (to, from) =>
{
  if (!import.meta.client) return;

  const nuxtApp = useNuxtApp();
  const siteState = useSiteState();
  const smoother = useScrollSmoother().value!;

  const finishNavigation = () =>
  {
    if (!siteState.isNavigating.value) return;
    siteState.isNavigating.value = false;

    /* TODO: configure page transition duration
     * (wait until screen is fully visible + some rest space)
     */
    useTimeout('site-page-transition', 450, () =>
    {
      if (!isInDom(smoother.content()))
      {
        smoother.content('#smooth-content');
        smoother.scrollTrigger.refresh();
      }
      siteState.isRevealed.value = true;
    });
  };

  if (nuxtApp.isHydrating)
  {
    /**
       * Initialise the loading indicator singleton early, so that its
       * internal hooks (`page:loading:start` / `page:loading:end`) are
       * subscribed before the first user navigation fires them.
       *
       * Otherwise the first call to `useLoadingIndicator` happens inside
       * the page transition middleware, which runs *after*
       * `page:loading:start` has already been emitted for that navigation.
       * That makes `progress` stay at 0 throughout the first navigation,
       * the middleware's `while (progress > 0)` loop exits immediately and
       * the loader barely has time to fade in before being hidden again.
       */
    useLoadingIndicator({
      throttle: 0,
      duration: 0,
    });

    // Errors (e.g. 404) can leave the loading indicator progress stuck.
    nuxtApp.hook('page:loading:end', finishNavigation);
  }
  // When navigating to a new page:
  else if (to.path !== from.path)
  {
    useLoadingIndicator({
      throttle: 0,
      duration: 0,
    });
    // Start transition out:
    siteState.isRevealed.value = false;
    siteState.isNavigating.value = true;

    // Reset page scroll when loader is hiding site:
    /* TODO: configure page transition duration
     * (wait until screen is fully hidden)
     */
    await skipTime(250);
    useScrollSmoother().value?.scrollTop(0);
  }
});
