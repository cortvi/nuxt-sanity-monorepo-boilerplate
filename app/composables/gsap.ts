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
  const { isRevealed } = useSiteState();
  const sources: (WatchSource | WatchSource[])[] = [
    options.scope,
    isRevealed,
  ];
  if (options.sources) sources.push(options.sources);
  const ctx = {
    value: undefined as (gsap.Context | undefined),
    revert: () => ctx.value && ctx.value.revert(),
  };

  // Recall onMount callback when extra sources change:
  if (options.onMount && options.sources)
  {
    watch([options.scope, options.sources], () =>
    {
      if (!options.scope.value) return;
      if (ctx.value) ctx.value.add(options.onMount!, options.scope.value);
      else ctx.value = gsap.context(options.onMount!, options.scope.value);
    }, {
      flush: 'post',
      immediate: true,
    });
  }
  // Add onReady callback:
  if (options.onReady)
  {
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

  // Only call when there are no sources to watch, otherwise it will be called twice:
  if (options.onMount && !options.sources)
  {
    onMounted(() =>
    {
      if (!options.scope.value) return;
      ctx.value = gsap.context(
        ctx => options.onMount?.(ctx),
        options.scope.value
      );
    });
  }
  onUnmounted(ctx.revert);


  return ctx;
};
