import { transformObjects } from './05-transform-object/transformObjects';
import { animations } from './06-animations/animations';
import { cameras } from './07-cameras/cameras';
import { fullscreen } from './08-fullscreen/fullscreen';
import { geometries } from './09-geometries/geometries';
import { debugUI } from './10-debug-ui/debugUI';
import { textures } from './11-textures/textures';
import { materials } from './12-materials/materials';
import { text3d } from './13-text-3d/text3d';
import { lights } from './15-lights/lights';
import { shadows } from './16-shadows/shadows';
import { hauntedHouse } from './17-haunted-house/hauntedHouse';
import { particles } from './18-particles/particles';

export const lessons: Record<string, (canvas: HTMLCanvasElement) => void> = {
  'transform-objects-05': transformObjects,
  'animations-06': animations,
  'cameras-07': cameras,
  'fullscreen-08': fullscreen,
  'geometries-09': geometries,
  'debug-ui-10': debugUI,
  'textures-11': textures,
  'materials-12': materials,
  'text-3d-13': text3d,
  'lights-15': lights,
  'shadows-16': shadows,
  'haunted-house-17': hauntedHouse,
  'particles-18': particles,
} as const;
