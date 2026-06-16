<script lang="ts" setup>
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const props = defineProps<{
  revealed?: boolean
  state?: { value: boolean }
}>();
const root = useTemplateRef<HTMLElement>('root');
const innerState = ref(props.state?.value ?? false);
let trigger: ScrollTrigger | undefined;

const isControlled = computed(() => props.state !== undefined);


useGsap({
  scope: root,
  onReady: () =>
  {
    if (!props.revealed || isControlled.value) return;
    if (trigger) trigger.kill();
    trigger = ScrollTrigger.create({
      trigger: root.value,
      start: 'top bottom+=100',
      onLeaveBack: () => innerState.value = false,
      onEnter: () => innerState.value = true,
    });
  },
});

watch([() => isControlled.value, () => props.state?.value], () =>
{
  if (!isControlled.value) return;
  innerState.value = props.state!.value;
});
</script>


<template>
<span class="c-reveal-underline" ref="root">
  <slot />
  <span class="line" :class="{ 'is-on': innerState }" />
</span>
</template>


<style lang="scss">
.c-reveal-underline
{
  position: relative;
  display: inline-block;
  >.line
  {
    width: 100%;
    height: 2px;
    background-color: currentColor;
    position: absolute;
    left: 0;
    bottom: -0.1em;
    display: block;
    transform: scale(0, 0.5);
    transition: transform 0.5s;
    transform-origin: right center;
  }
  &:hover>.line, >.line.is-on
  {
    transform: scale(1, 0.5);
    transform-origin: left center;
  }
}
</style>
