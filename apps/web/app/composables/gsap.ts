import type { WatchSource } from 'vue';
import { gsap } from 'gsap';


export const useGsap = (options: {
  scope: Ref<HTMLElement | undefined | null>
  /**
   * Called when reveal is allowed site-wise.
   * Then, re-called whenever sources change.
   */
  onReady?: gsap.ContextFunc
  /**
   * Called when component is mounted.
   * Then, re-called whenever sources change.
   */
  onMount?: gsap.ContextFunc
  sources?: WatchSource | WatchSource[]
}) =>
{
  const ctx = {
    value: undefined as (gsap.Context | undefined),
    revert: () => ctx.value && ctx.value.revert(),
  };


  if (options.onMount)
  {
    // Recall onMount callback when extra sources change:
    if (options.sources)
    {
      const sources: WatchSource[] = [
        options.scope,
        ...Array.isArray(options.sources) ?
          options.sources :
          [options.sources],
      ];
      watch(sources, () =>
      {
        if (!options.scope.value) return;
        if (ctx.value) ctx.value.add(options.onMount!, options.scope.value);
        else ctx.value = gsap.context(options.onMount!, options.scope.value);
      }, {
        flush: 'post',
        immediate: true,
      });
    }
    // Only call when there are no sources to watch, otherwise it will be called twice:
    else onMounted(() =>
    {
      if (!options.scope.value) return;
      ctx.value = gsap.context(
        ctx => options.onMount?.(ctx),
        options.scope.value
      );
    });
  }


  if (options.onReady)
  {
    const { isRevealed } = useSiteState();
    const sources: WatchSource[] = [
      options.scope,
      isRevealed,
    ];
    if (options.sources) sources.push(...(
      Array.isArray(options.sources) ?
        options.sources :
        [options.sources]
    ));
    watch(sources, () =>
    {
      if (!options.scope.value || !isRevealed.value) return;
      if (ctx.value) ctx.value.add(options.onReady!, options.scope.value);
      else ctx.value = gsap.context(options.onReady, options.scope.value);
    }, {
      flush: 'post',
      immediate: true,
    });
  }


  // Cleanup on scope change:
  watch(options.scope, () => {
    if (!options.scope.value) ctx.revert();
  });
  onUnmounted(ctx.revert);


  return ctx;
};
