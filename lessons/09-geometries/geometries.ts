import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getSizes, handleFullscreen, handleResize } from '../../common/common';

export const geometries = (canvas: HTMLCanvasElement) => {
  const sizes = getSizes();

  const scene = new THREE.Scene();

  // const cube = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3);
  // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  // const mesh = new THREE.Mesh(cube, material);
  // scene.add(mesh);

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 2;
  scene.add(camera);

  // // prettier-ignore
  // const positionsArray = new Float32Array([
  //   0, 0, 0,
  //   0, 1, 0,
  //   1, 0, 0
  // ]);

  // const geometry = new THREE.BufferGeometry();
  // geometry.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3));

  // const mesh = new THREE.Mesh(
  //   geometry,
  //   new THREE.MeshBasicMaterial({ color: 0xff000, wireframe: true })
  // );
  // scene.add(mesh);

  const verticesCount = 50;
  const positionsArray = new Float32Array(
    Array.from({ length: verticesCount * 3 * 3 }).map(() => {
      return (Math.random() - 0.5) * 3;
    })
  );

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3));

  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
  );
  scene.add(mesh);

  const renderer = new THREE.WebGLRenderer({ canvas });

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const tick = () => {
    renderer.render(scene, camera);

    controls.update();

    // camera.lookAt(mesh.position);

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
