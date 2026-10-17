<script lang="ts" setup>
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


const createTrigger = () =>
{
  if (trigger) trigger.kill();
  trigger = ScrollTrigger.create({
    trigger: root.value,
    start: 'top bottom+=100',
    animation: timeline,
    ...onceUnlessDev,
  });
  emit('on-create', trigger);
};


const emit = defineEmits<{
  'on-create': [trigger: ScrollTrigger]
}>();
const props = defineProps<{
  text?: string
  isHtml?: boolean
  timeScale?: number
  delay?: number
  state?: { value: boolean }
}>();
const root = useTemplateRef<HTMLElement>('root');
let trigger: ScrollTrigger | undefined;
let timeline: gsap.core.Timeline;

const isControlled = computed(() => props.state !== undefined);


useGsap({
  scope: root,
  onReady: () =>
  {
    if (isControlled.value) return;
    createTrigger();
  },
  onMount: () =>
  {
    if (props.text)
    {
      const target = props.isHtml ? root.value!.children[0]! : root.value!;
      SplitText.create(target, {
        tag: 'span',
        type: 'chars,lines',
        charsClass: 'char',
        linesClass: 'line',
        autoSplit: true,
        onSplit: self =>
        {
          // Default state:
          gsap.set(self.chars, { opacity: 0 });
          timeline = gsap.timeline({
            paused: true,
            delay: props.delay || 0,
            defaults: { ease: 'power1.in' },
          });
          // When lines are present:
          self.lines.forEach((line, i) =>
          {
            timeline.to(line.querySelectorAll('.char'), {
              opacity: 1,
              duration: 0.6,
              stagger: 0.02,
            }, i * 0.04);
          });
          timeline.timeScale(props.timeScale || 1);
          // Set visible if initial state is true:
          if (props.state?.value) timeline.progress(1);
          if (trigger)
          {
            trigger.kill();
            createTrigger();
          }
          return timeline;
        },
      });
    }
    else
    {
      const paragraphs = root.value!.querySelectorAll('p');
      paragraphs.forEach(p =>
      {
        SplitText.create(p, {
          tag: 'span',
          type: 'chars,lines',
          charsClass: 'char',
          linesClass: 'line',
          autoSplit: true,
          onSplit: self =>
          {
            // Default state:
            gsap.set(self.chars, { opacity: 0 });
            if (!timeline) timeline = gsap.timeline({
              paused: true,
              delay: props.delay || 0,
              defaults: { ease: 'power1.in' },
            });
            // When lines are present:
            self.lines.forEach((line, i) =>
            {
              timeline.to(line.querySelectorAll('.char'), {
                opacity: 1,
                duration: 0.6,
                stagger: 0.02,
              }, i * 0.04);
            });
            timeline.timeScale(props.timeScale || 1);
            if (trigger)
            {
              trigger.kill();
              createTrigger();
            }
            return timeline;
          },
        });
      });
      // Set visible if initial state is true:
      if (props.state?.value) timeline.progress(1);
    }
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
<span class="c-reveal-text-lines" :class="{ 'is-html': isHtml }" ref="root">
  <slot v-if="$slots.default" />
  <template v-else-if="text">
    <span class="html" v-html="toHTML(text)" v-if="isHtml" />
    <template v-else>{{ text }}</template>
  </template>
</span>
</template>


<style lang="scss">
.c-reveal-text-lines
{
  &.is-html { display: block; }
  >.html, .line { display: block; }
}
</style>
