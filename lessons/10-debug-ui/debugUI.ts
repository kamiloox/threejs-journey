import * as THREE from 'three';
import GUI from 'lil-gui';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getSizes, handleFullscreen, handleResize } from '../../common/common';

export const debugUI = (canvas: HTMLCanvasElement) => {
  const sizes = getSizes();

  const scene = new THREE.Scene();

  const gui = new GUI();

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 2;
  scene.add(camera);

  const cube = new THREE.BoxGeometry(1, 1, 1);

  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  const mesh = new THREE.Mesh(cube, material);
  scene.add(mesh);

  const renderer = new THREE.WebGLRenderer({ canvas });

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const parameters = {
    spin: () => {
      gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
    },
  };

  gui.addColor(material, 'color');
  gui.add(mesh.position, 'y').min(-2).max(2).step(0.01);
  gui.add(material, 'wireframe');
  gui.add(material, 'visible');
  gui.add(parameters, 'spin');

  const tick = () => {
    renderer.render(scene, camera);

    controls.update();

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
