import { useEffect, useRef } from 'react';
import { transformObjectsRender } from './transformObjectsRender';

export const TransformObjects = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    transformObjectsRender(canvasRef.current);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};
