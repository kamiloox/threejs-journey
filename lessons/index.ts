import { transformObjects } from './05-transform-object/transformObjects';
import { animations } from './06-animations/animations';
import { cameras } from './07-cameras/cameras';
import { fullscreen } from './08-fullscreen/fullscreen';

export const lessons: Record<string, (canvas: HTMLCanvasElement) => void> = {
  'transform-objects-05': transformObjects,
  'animations-06': animations,
  'cameras-07': cameras,
  'fullscreen-08': fullscreen,
} as const;
