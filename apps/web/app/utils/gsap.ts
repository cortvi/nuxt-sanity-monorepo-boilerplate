export const onceUnlessDev = {
  toggleActions: import.meta.dev ?
    'play none none reset' :
    'play none none none',
  once: !import.meta.dev,
};
