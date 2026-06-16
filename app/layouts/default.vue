<script lang="ts" setup>
const route = useRoute();
const vp = useViewport();
const siteState = useSiteState();
const scrollSmoother = useScrollSmoother();

const classHtml = computed(() => ({
  'is-loading': siteState.isLoading.value,
  'is-navigating': siteState.isNavigating.value,
  'is-modal-open': siteState.isModalOpen.value,
  'no-scrollbar': siteState.isLoading.value,
  'is-touch': vp.isTouch.value,
}));


watchEffect(() =>
  scrollSmoother.value?.paused(!siteState.hasScroll.value)
);
watch(() => route.path, () =>
{
  siteState.isMenuOpen.value = false;
  siteState.isModalOpen.value = false;
});
</script>


<template>
<Html :class="classHtml">
  <Body>
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <main>
          <slot />
        </main>
      </div>
    </div>
    <Teleport to="#teleports">
      <LayoutLoader />
    </Teleport>
  </Body>
</Html>
</template>


<style lang="scss">
#smooth-wrapper
{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  >#smooth-content
  {
    transition: filter 0.8s;
    perspective: none;
    transform-style: flat;
    backface-visibility: hidden;
    html.is-modal-open & { filter: blur(5px); }
    >main
    {
      min-height: 100vh;
      html:not(.is-touch) & { overflow: hidden; }
    }
  }
}
</style>
