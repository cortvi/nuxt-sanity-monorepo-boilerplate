import { ScrollTrigger } from 'gsap/ScrollTrigger';


/** WARNING: These values must be used only on client-side */
export const useViewport = () =>
{
  const _width = useState<number | undefined>('viewport-w');
  const _height = useState<number | undefined>('viewport-h');
  const _rem = useState<number | undefined>('viewport-rem');
  const _vh = useState<number | undefined>('viewport-vh');
  const isMobile = useState<boolean | undefined>('is-mobile');

  const width = computed({
    get: () =>
    {
      if (!_width.value)
      {
        if (import.meta.client) _width.value = window.innerWidth;
        else _width.value = Number.POSITIVE_INFINITY;
      }
      return _width.value;
    },
    set: value => _width.value = value,
  });
  const height = computed({
    get: () =>
    {
      if (!_height.value)
      {
        if (import.meta.client) _height.value = window.innerHeight;
        else _height.value = Number.POSITIVE_INFINITY;
      }
      return _height.value;
    },
    set: value => _height.value = value,
  });
  const vh = computed({
    get: () =>
    {
      if (!_vh.value)
      {
        if (import.meta.client)
        {
          _vh.value = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh.value}px`);
        }
        else _vh.value = 872 * 0.01;
      }
      return _vh.value;
    },
    set: value => _vh.value = value,
  });
  const rem = computed({
    get: () =>
    {
      if (!_rem.value)
      {
        if (import.meta.client)
        {
          const style = getComputedStyle(document.documentElement);
          _rem.value = parseFloat(style.fontSize);
        }
        else _rem.value = 1;
      }
      return _rem.value;
    },
    set: value => _rem.value = value,
  });
  const isTouch = computed(() =>
  {
    if (import.meta.client) return !!ScrollTrigger.isTouch;
    else return false;
  });
  const isMobileOrTouch = computed(() => isMobile.value || isTouch.value);


  const isThin = (w?: number) => width.value <= (w ?? 900);
  const isShort = (h: number) => height.value <= h;
  const toRem = (px: number) => px * rem.value;

  /** Desktop first (window.width <= options.key) */
  const selectFrom = <T>(fallback: T, options: Record<number, T>) =>
  {
    for (const key of Object.keys(options))
    {
      const n = Number(key);
      if (isThin(n)) return options[n];
    }
    return fallback;
  };
  const select = <T>(desktop: T, mobile: T) => selectFrom(desktop, { 900: mobile });

  const onChange = () =>
  {
    _width.value = undefined;
    _height.value = undefined;
    _rem.value = undefined;
    _vh.value = undefined;
    // Read vh so that it writes to CSS:
    const _ = vh.value;
  };


  onMounted(() =>
  {
    if (isMobile.value !== undefined) return;

    isMobile.value = isThin();
    window.addEventListener('DOMContentLoaded', onChange);
    window.addEventListener('resize', onChange);
    onChange();
  });


  return {
    width, height, rem, vh,
    isTouch, isMobile, isMobileOrTouch,
    isThin, isShort, toRem,
    selectFrom, select,
  };
};
