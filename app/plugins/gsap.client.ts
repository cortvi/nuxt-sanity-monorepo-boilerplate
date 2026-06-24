import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
// import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
// import { CustomEase } from 'gsap/CustomEase';
// import { Draggable } from 'gsap/Draggable';
// import { Flip } from 'gsap/Flip';
// import type { Observer } from 'gsap/Observer';


export default defineNuxtPlugin(() =>
{
  /* TODO: Choose GSAP addons */
  // Register GSAP addons:
  gsap.registerPlugin(
    ScrollTrigger,
    // ScrollToPlugin,
    ScrollSmoother,
    // DrawSVGPlugin,
    // CustomEase
    // Draggable,
    // Flip
  );
  // Create scroll smoother:
  const smoother = ScrollSmoother.create({
    smooth: 1,
    smoothTouch: false,
    effects: true,
  });
  smoother.paused(true);
  useScrollSmoother(smoother);
  // ScrollTrigger.config({ ignoreMobileResize: true });
});
