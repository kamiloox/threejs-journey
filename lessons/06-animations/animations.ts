import * as THREE from 'three';

export const animations = (canvas: HTMLCanvasElement) => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, 800 / 600);
  camera.position.z = 6;
  scene.add(camera);

  const box = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial();
  const cube = new THREE.Mesh(box, material);
  scene.add(cube);

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(800, 600);

  const clock = new THREE.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    cube.position.y = Math.cos(elapsedTime * Math.PI);
    cube.position.x = Math.sin(elapsedTime * Math.PI);

    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };

  tick();
};
