export type Category = 'All' | 'Entrance' | 'Exit' | 'Attention' | 'Background' | 'Text';

export interface AnimationDef {
  id: string;
  name: string;
  category: Category;
  keyframes: string;
  defaultDuration: number;
  defaultTiming: string;
}

export interface AnimationConfig {
  duration: number; // in seconds
  delay: number; // in seconds
  timingFunction: string;
  iterationCount: string;
  fillMode: string;
}
