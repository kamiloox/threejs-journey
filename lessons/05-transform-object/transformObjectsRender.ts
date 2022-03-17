import * as THREE from 'three';

export const transformObjectsRender = (canvas: HTMLCanvasElement) => {
  const sizes = {
    width: 800,
    height: 600,
  };

  const scene = new THREE.Scene();

  const cube = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 3;
  camera.position.x = -3;
  camera.position.y = 3;
  camera.rotateY(-Math.PI / 8);
  camera.rotateX(-Math.PI / 8);
  scene.add(camera);

  const mesh = new THREE.Mesh(cube, material);
  mesh.scale.set(1.5, 0.25, 1);
  mesh.position.set(-2, 0, -2);
  scene.add(mesh);

  const vector = new THREE.Vector3(3, 4, 8);
  console.log(vector.length());
  vector.normalize();
  console.log(vector.length());

  camera.lookAt(mesh.position);

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);

  renderer.render(scene, camera);
};
