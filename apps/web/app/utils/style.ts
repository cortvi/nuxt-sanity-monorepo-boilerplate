import { CustomEase } from 'gsap/CustomEase';


export const styleUtils = {
  clipPath:
  {
    on: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
    offTop: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
    offLeft: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    offRight: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
    offBottom: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
  },
  ease: {
    theCurve: () => CustomEase.create('custom', '.785,.135,.15,.86'),
  },
};
