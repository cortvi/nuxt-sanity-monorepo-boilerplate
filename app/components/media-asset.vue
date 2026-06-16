<script lang="ts" setup>
import '~/assets/scss/components/media-asset.scss';
import type { MediaAssetProps } from '~/types/components/media-asset';


const getVideoElement = async () =>
{
  if (props.type !== 'video') return;
  while (!videoRoot.value) await skipFrame();
  videoElement.value = videoRoot.value;
};


const props = defineProps<MediaAssetProps>();
const videoRoot = useTemplateRef('video-root');
const videoElement = ref<HTMLVideoElement>();
const isMuted = ref(true);

const videoProps = computed(() =>
{
  if (props.type !== 'video') return;
  return {
    autoplay: props.autoplay ?? true,
    preload: props.preload ?? 'auto',
  };
});
const style = computed(() => ({
  'fixed-dimensions': !props.autoWidth && !props.autoHeight,
  'is-auto-width': props.autoWidth,
  'is-auto-height': props.autoHeight,
}));


watch(videoElement, async () =>
{
  if (!videoElement.value) return;
  if (videoProps.value?.autoplay)
  {
    const maxTries = 5;
    let tries = 0;
    while (tries < maxTries && videoElement.value.paused)
    {
      tries++;
      await videoElement.value.play();
      await skipTime(100 * tries + 100);
    }
    if (tries === maxTries && videoElement.value.paused)
    {
      console.warn(
        'Video failed to autoplay',
        props.url
      );
      return;
    }
  }
});

onMounted(() => getVideoElement());

defineExpose({
  video: videoElement,
});
</script>


<template>
<div class="c-media-asset" :class="style">

  <picture v-if="type === 'image'">
    <img :src="url" :alt="alt" />
  </picture>

  <template v-else-if="type === 'video'">
    <video
      :src="url"
      :poster="thumbnail || blurUpThumb"
      :title
      :autoplay="videoProps!.autoplay"
      :preload="videoProps!.preload"
      :muted="isMuted"
      loop
      playsinline
      ref="video-root"
    />
  </template>

</div>
</template>
