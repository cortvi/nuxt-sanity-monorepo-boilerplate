export const useSiteState = () =>
{
  const isLoading = useState('is-loading', () => true);
  const isNavigating = useState('is-navigating', () => false);
  const isRevealed = useState('is-revealed', () => false);
  const isMenuOpen = useState('is-menu-open', () => false);
  const isModalOpen = useState('is-modal-open', () => false);
  const isRefreshingGsap = useState('is-refreshing-gsap', () => false);

  const hasScroll = computed(() =>
    !isLoading.value &&
    !isNavigating.value &&
    !isMenuOpen.value &&
    !isModalOpen.value &&
    !isRefreshingGsap.value
  );


  return {
    isLoading,
    isNavigating,
    isRevealed,
    isMenuOpen,
    isModalOpen,
    isRefreshingGsap,
    hasScroll,
  };
};
