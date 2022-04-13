import * as THREE from 'three';

export const getSizes = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

export const handleResize = (renderer: THREE.WebGLRenderer, camera: THREE.PerspectiveCamera) => {
  const sizes = getSizes();

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(sizes.width, sizes.height);
};

export const handleFullscreen = (canvas: HTMLCanvasElement) => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};
