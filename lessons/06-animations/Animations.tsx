import { useEffect, useRef } from 'react';
import { animationsRender } from './animationsRender';

export const Animations = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    animationsRender(canvasRef.current);
  }, []);

  return <canvas ref={canvasRef}></canvas>;
};
