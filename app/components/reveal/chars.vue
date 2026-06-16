<script lang="ts" setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const emit = defineEmits<{
  'on-create': [trigger: ScrollTrigger]
}>();
const props = defineProps<{
  timeScale?: number
  delay?: number
  state?: { value: boolean }
}>();
const root = useTemplateRef<HTMLElement>('root');
let timeline: gsap.core.Timeline;

const isControlled = computed(() => props.state !== undefined);


useGsap({
  scope: root,
  onReady: () =>
  {
    if (isControlled.value) return;
    const trigger = ScrollTrigger.create({
      trigger: root.value,
      start: 'top bottom+=100',
      toggleActions: 'play none none reset',
      animation: timeline,
    });
    emit('on-create', trigger);
  },
  onMount: () =>
  {
    // Default state:
    gsap.set('.char', { opacity: 0 });
    timeline = gsap.timeline({
      paused: true,
      delay: props.delay || 0,
      defaults: { ease: 'power1.inOut' },
    });
    const lines = root.value!.querySelectorAll('.line');
    // When lines are present:
    if (lines.length) lines.forEach((line, i) =>
    {
      timeline.to(line.querySelectorAll('.char'), {
        opacity: 1,
        duration: 0.6,
        stagger: 0.02,
      }, i * 0.05);
    });
    // When only chars are present:
    else
    {
      timeline.to('.char', {
        opacity: 1,
        duration: 0.6,
        stagger: 0.02,
      });
    }
    timeline.timeScale(props.timeScale || 1);

    // Set visible if initial state is true:
    if (props.state?.value) timeline.progress(1);
  },
});

watch([() => isControlled.value, () => props.state?.value], () =>
{
  if (!isControlled.value) return;
  if (props.state!.value) timeline.play(0);
  else timeline.revert();
});
</script>


<template>
<span class="c-reveal-chars" ref="root">
  <slot />
</span>
</template>
