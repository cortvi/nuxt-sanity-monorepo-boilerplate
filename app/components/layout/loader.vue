<script lang="ts" setup>
import '~/assets/scss/components/layout/loader.scss';


const app = useNuxtApp();
const siteState = useSiteState();
const isLoading = ref(true);
const isVisible = ref(true);
const duration = ref('0.5s');


// When the site is navigating to a new page:
watch(siteState.isNavigating, value => {
  isVisible.value = value;
});

// When the site loads for the first time:
watch(isLoading, () =>
{
  if (isLoading.value) return;
  // Hide loader and unlock scroll after refreshing GSAP:
  useRefreshTriggers(200, async () =>
  {
    siteState.isLoading.value = false;
    await nextTick();
    useScrollSmoother().value?.scrollTop(0);
    isVisible.value = false;
  });
  // Enable reveal when the loader is hidden:
  useTimeout('loader-reveal', 700, () =>
  {
    siteState.isRevealed.value = true;
    duration.value = '0.25s';
  });
});

onMounted(async () =>
{
  while (app.isHydrating) await skipFrame();
  await nextTick();
  isLoading.value = false;
});
</script>


<template>
<div class="c-layout-loader" :class="{ 'is-visible': isVisible }" />
</template>


<style>
.c-layout-loader { --duration: v-bind(duration); }
</style>
