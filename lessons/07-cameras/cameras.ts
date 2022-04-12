import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export const cameras = (canvas: HTMLCanvasElement) => {
  const scene = new THREE.Scene();

  const sizes = {
    width: 800,
    height: 600,
  };

  const cursor = {
    x: 0,
    y: 0,
  };

  window.addEventListener('pointermove', (e) => {
    cursor.x = (e.clientX / sizes.width - 0.5) * 2;
    cursor.y = -(e.clientY / sizes.height - 0.5) * 2;
  });

  const aspectRatio = sizes.width / sizes.height;

  // (LEFT, RIGHT, TOP, BOTTOM, NEAR, FAR) => THREE.OrthographicCamera
  // const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);

  // (FOV, ASPECT, NEAR, FAR) => THREE.PerspectiveCamera
  const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
  camera.position.z = 2;
  scene.add(camera);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  const box = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial();
  const cube = new THREE.Mesh(box, material);
  scene.add(cube);

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);

  console.log(OrbitControls);

  const tick = () => {
    // camera.position.y = cursor.y * 10;
    // console.log(Math.sin(cursor.x * Math.PI));
    // camera.position.z = Math.sin(cursor.x * Math.PI) * 4;
    // camera.position.x = Math.cos(cursor.x * Math.PI) * 4;
    controls.update();

    camera.lookAt(cube.position);
    renderer.render(scene, camera);

    window.requestAnimationFrame(tick);
  };

  tick();
};
