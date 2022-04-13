import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getSizes, handleFullscreen, handleResize } from '../../common/common';

export const fullscreen = (canvas: HTMLCanvasElement) => {
  const sizes = getSizes();

  const scene = new THREE.Scene();

  const cube = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 2;
  scene.add(camera);

  const mesh = new THREE.Mesh(cube, material);
  scene.add(mesh);

  const renderer = new THREE.WebGLRenderer({ canvas });

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const tick = () => {
    renderer.render(scene, camera);

    controls.update();

    camera.lookAt(mesh.position);

    window.requestAnimationFrame(tick);
  };

  tick();

  window.addEventListener('dblclick', () => handleFullscreen(canvas));

  window.addEventListener('resize', () => {
    handleResize(renderer, camera);

    const { width, height } = getSizes();

    sizes.width = width;
    sizes.height = height;
  });

  handleResize(renderer, camera);
};
