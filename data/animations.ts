import { AnimationDef } from '../types';

export const ANIMATIONS: AnimationDef[] = [
  // --- Entrances ---
  {
    id: 'fade-in-up',
    name: 'Fade In Up',
    category: 'Entrance',
    defaultDuration: 0.6,
    defaultTiming: 'cubic-bezier(0.16, 1, 0.3, 1)',
    keyframes: `
      0% { opacity: 0; transform: translate3d(0, 40px, 0); }
      100% { opacity: 1; transform: translate3d(0, 0, 0); }
    `
  },
  {
    id: 'blur-in',
    name: 'Blur In',
    category: 'Entrance',
    defaultDuration: 0.8,
    defaultTiming: 'ease-out',
    keyframes: `
      0% { opacity: 0; filter: blur(20px); transform: scale(0.9); }
      100% { opacity: 1; filter: blur(0); transform: scale(1); }
    `
  },
  {
    id: 'pop-in',
    name: 'Pop In',
    category: 'Entrance',
    defaultDuration: 0.5,
    defaultTiming: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    keyframes: `
      0% { opacity: 0; transform: scale(0.5); }
      100% { opacity: 1; transform: scale(1); }
    `
  },
  {
    id: 'slide-in-right',
    name: 'Slide In Right',
    category: 'Entrance',
    defaultDuration: 0.5,
    defaultTiming: 'cubic-bezier(0.25, 1, 0.5, 1)',
    keyframes: `
      0% { transform: translateX(100%); opacity: 0; }
      100% { transform: translateX(0); opacity: 1; }
    `
  },
  {
    id: 'elastic-entrance',
    name: 'Elastic',
    category: 'Entrance',
    defaultDuration: 1,
    defaultTiming: 'linear',
    keyframes: `
      0% { opacity: 0; transform: scale3d(0.3, 0.3, 0.3); }
      20% { transform: scale3d(1.1, 1.1, 1.1); }
      40% { transform: scale3d(0.9, 0.9, 0.9); }
      60% { opacity: 1; transform: scale3d(1.03, 1.03, 1.03); }
      80% { transform: scale3d(0.97, 0.97, 0.97); }
      100% { opacity: 1; transform: scale3d(1, 1, 1); }
    `
  },
  
  // --- Exits ---
  {
    id: 'fade-out-down',
    name: 'Fade Out Down',
    category: 'Exit',
    defaultDuration: 0.5,
    defaultTiming: 'ease-in',
    keyframes: `
      0% { opacity: 1; }
      100% { opacity: 0; transform: translate3d(0, 40px, 0); }
    `
  },
  {
    id: 'blur-out',
    name: 'Blur Out',
    category: 'Exit',
    defaultDuration: 0.6,
    defaultTiming: 'ease-in',
    keyframes: `
      0% { opacity: 1; filter: blur(0); }
      100% { opacity: 0; filter: blur(20px); transform: scale(0.9); }
    `
  },
  {
    id: 'hinge-exit',
    name: 'Hinge Exit',
    category: 'Exit',
    defaultDuration: 2,
    defaultTiming: 'ease-in-out',
    keyframes: `
      0% { transform-origin: top left; animation-timing-function: ease-in-out; }
      20%, 60% { transform: rotate3d(0, 0, 1, 80deg); transform-origin: top left; animation-timing-function: ease-in-out; }
      40%, 80% { transform: rotate3d(0, 0, 1, 60deg); transform-origin: top left; animation-timing-function: ease-in-out; opacity: 1; }
      100% { transform: translate3d(0, 700px, 0); opacity: 0; }
    `
  },

  // --- Attention ---
  {
    id: 'pulse-glow',
    name: 'Pulse Glow',
    category: 'Attention',
    defaultDuration: 1.5,
    defaultTiming: 'infinite',
    keyframes: `
      0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
      70% { box-shadow: 0 0 0 20px rgba(99, 102, 241, 0); }
      100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
    `
  },
  {
    id: 'shake-x',
    name: 'Shake X',
    category: 'Attention',
    defaultDuration: 0.8,
    defaultTiming: 'ease-in-out',
    keyframes: `
      0%, 100% { transform: translate3d(0, 0, 0); }
      10%, 30%, 50%, 70%, 90% { transform: translate3d(-10px, 0, 0); }
      20%, 40%, 60%, 80% { transform: translate3d(10px, 0, 0); }
    `
  },
  {
    id: 'jello',
    name: 'Jello',
    category: 'Attention',
    defaultDuration: 0.9,
    defaultTiming: 'both',
    keyframes: `
      0% { transform: scale3d(1, 1, 1); }
      30% { transform: scale3d(1.25, 0.75, 1); }
      40% { transform: scale3d(0.75, 1.25, 1); }
      50% { transform: scale3d(1.15, 0.85, 1); }
      65% { transform: scale3d(0.95, 1.05, 1); }
      75% { transform: scale3d(1.05, 0.95, 1); }
      100% { transform: scale3d(1, 1, 1); }
    `
  },
  {
    id: 'bounce',
    name: 'Bounce',
    category: 'Attention',
    defaultDuration: 1,
    defaultTiming: 'infinite',
    keyframes: `
      0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
      40% {transform: translateY(-30px);}
      60% {transform: translateY(-15px);}
    `
  },
  
  // --- Text ---
  {
    id: 'tracking-in',
    name: 'Tracking In',
    category: 'Text',
    defaultDuration: 0.7,
    defaultTiming: 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
    keyframes: `
      0% { letter-spacing: -0.5em; opacity: 0; }
      40% { opacity: 0.6; }
      100% { opacity: 1; }
    `
  },
  {
    id: 'gradient-flow',
    name: 'Gradient Flow',
    category: 'Text',
    defaultDuration: 3,
    defaultTiming: 'linear infinite',
    keyframes: `
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    `
  },
  
  // --- Background ---
  {
    id: 'ken-burns',
    name: 'Ken Burns',
    category: 'Background',
    defaultDuration: 10,
    defaultTiming: 'ease-out infinite alternate',
    keyframes: `
      0% { transform: scale(1) translate(0, 0); transform-origin: 16% 50%; }
      100% { transform: scale(1.25) translate(20px, 15px); transform-origin: right bottom; }
    `
  }
];
