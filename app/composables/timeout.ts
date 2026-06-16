type Timeout = ReturnType<typeof setTimeout>;
const KEY = 'site-timeouts';

export const useTimeout = (id: string, delay: number, callback: () => void) =>
{
  const siteTimeouts = useState<Record<string, Timeout>>(KEY, () => ({}));

  let timeout = siteTimeouts.value[id];
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(callback, delay);
  siteTimeouts.value[id] = timeout;
};


export const useClearTimeout = (id: string) =>
{
  const siteTimeouts = useState<Record<string, Timeout>>(KEY, () => ({}));
  const timeout = siteTimeouts.value[id];
  if (timeout)
  {
    clearTimeout(timeout);
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete siteTimeouts.value[id];
  }
};
