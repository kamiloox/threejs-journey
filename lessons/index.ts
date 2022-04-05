import { transformObjects } from './05-transform-object/transformObjects';
import { animations } from './06-animations/animations';

export const lessons: Record<string, (canvas: HTMLCanvasElement) => void> = {
  'transform-objects-05': transformObjects,
  'animations-06': animations,
} as const;
