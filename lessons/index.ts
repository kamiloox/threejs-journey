import { transformObjects } from './05-transform-object/transformObjects';
import { animations } from './06-animations/animations';
import { cameras } from './07-cameras/cameras';
import { fullscreen } from './08-fullscreen/fullscreen';
import { geometries } from './09-geometries/geometries';

export const lessons: Record<string, (canvas: HTMLCanvasElement) => void> = {
  'transform-objects-05': transformObjects,
  'animations-06': animations,
  'cameras-07': cameras,
  'fullscreen-08': fullscreen,
  'geometries-09': geometries,
} as const;
