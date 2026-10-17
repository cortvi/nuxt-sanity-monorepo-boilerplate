<script lang="ts" setup>
import '~/assets/scss/components/media-asset.scss';
/* TODO:
 * Video is straightforward in DatoCMS using this library (Mux under the hood).
 * Sanity supports Mux through `sanity-plugin-mux-input` but has no Vue player:
 * use the `<mux-player>` web component from `@mux/mux-player` instead.
 */
// import { VideoPlayer } from 'vue-datocms';
import type { ImageSize, MediaAssetProps } from '~/types/components/media-asset';


const trackPictureLoad = () =>
{
  const img = pictureRoot.value?.querySelector('img');
  if (props.blurUpThumb && img)
  {
    if (img.complete) hasImageLoaded.value = true;
    else img.onload = () => hasImageLoaded.value = true;
  }
  else hasImageLoaded.value = true;
};

const getVideoElement = async () =>
{
  if (props.type !== 'video') return;
  await waitFor(videoRoot);

  if ('muxPlayerRef' in videoRoot.value!)
  {
    // let video: HTMLVideoElement | null | undefined;
    // do
    // {
    //   const muxVideo = videoRoot.value.muxPlayerRef?.media;
    //   video = muxVideo?.shadowRoot?.querySelector('video');
    //   await skipFrame();
    // }
    // while (!video);
    // videoElement.value = video;
  }
  else videoElement.value = videoRoot.value!;
};
const tryPlayVideo = async () =>
{
  if (!videoElement.value) return;
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
};


const props = defineProps<MediaAssetProps>();
const pictureRoot = useTemplateRef('picture-root');
const videoRoot = useTemplateRef('video-root');
const videoElement = ref<HTMLVideoElement>();
const hasImageLoaded = ref(false);
const isMuted = ref(true);

const imageUrlGetter = computed<((size: ImageSize) => string) | undefined>(() =>
{
  if (props.type !== 'image') return;
  const { url, source } = props;
  if (!url && !source)
  {
    console.warn('MediaAsset: missing URL and source');
    return;
  }

  // Skip transforming SVGs:
  if (url && url.split('?')[0]!.toLowerCase().endsWith('.svg')) return;

  if (source || (url && isSanityImageUrl(url)))
    return (size: ImageSize) => toSanityImageUrl(source ?? url!, size);

  if (url && isDatoImageUrl(url))
    return (size: ImageSize) => toDatoImageUrl(url, size);

  return undefined;
});
const responsive = computed(() =>
{
  if (props.type !== 'image') return;
  const urlGetter = imageUrlGetter.value;
  if (!urlGetter || !props.responsive) return {
    fallback: props.url,
  };

  const sources: {
    breakpoint: number
    url: string
  }[] = [];
  const sizes = props.responsive.sizes ?
    Object.entries(props.responsive.sizes) :
    [];
  for (const [breakpoint, { width, height }] of sizes)
  {
    sources.push({
      breakpoint: Number(breakpoint),
      url: urlGetter({ width, height }),
    });
  }

  if (!props.responsive.strict)
  {
    const biggestBreakpoint = sizes.length ?
      Math.max(...sizes.map(([bp]) => Number(bp))) :
      0;
    const biggestSize = sizes.length ?
      sizes.find(([bp]) => Number(bp) === biggestBreakpoint)![1] :
      props.responsive.default;

    const addSize = (breakpoint: number, scale: number) =>
    {
      if (biggestBreakpoint >= breakpoint) return;
      if (sizes.some(([bp]) => bp === String(breakpoint))) return;
      sources.push({
        breakpoint,
        url: urlGetter({
          width: biggestSize.width ? biggestSize.width * scale : undefined,
          height: biggestSize.height ? biggestSize.height * scale : undefined,
        }),
      });
    };
    addSize(1599, 1.35);
    addSize(1999, 2.65);
  }

  sources.sort((a, b) =>
    (a.breakpoint ?? 0) - (b.breakpoint ?? 0)
  ).reverse();

  const fallback = urlGetter({
    width: props.responsive.default.width,
    height: props.responsive.default.height,
  });

  return { sources, fallback };
});
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
  if (videoProps.value?.autoplay) tryPlayVideo();
});
onMounted(() =>
{
  trackPictureLoad();
  getVideoElement();
});


defineExpose({
  video: videoElement,
  tryPlayVideo,
});
</script>


<template>
<div class="c-media-asset" :class="style">

  <template v-if="type === 'image'">
    <picture
      :class="{ 'is-loaded': hasImageLoaded }"
      ref="picture-root"
    >
      <template v-for="src in responsive?.sources ?? []" :key="src.breakpoint">
        <source :srcset="src.url" :media="`(width > ${src.breakpoint}px)`" />
      </template>
      <img :src="responsive?.fallback" :alt="alt ?? undefined" />
    </picture>
    <img class="thumbnail"
      :class="{ 'is-loaded': hasImageLoaded }"
      :src="blurUpThumb" alt=""
      v-if="blurUpThumb"
    />
  </template>

  <template v-else-if="type === 'video'">
    <!-- <VideoPlayer v-if="muxPlaybackId"
      :data="{
        muxPlaybackId,
        blurUpThumb,
        title,
      }"
      :auto-play="videoProps!.autoplay ? 'muted' : false"
      :preload="videoProps!.preload"
      :muted="isMuted"
      loop
      plays-inline
      ref="video-root"
    />
    <video v-else -->
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
