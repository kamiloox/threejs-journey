import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper';
import { getSizes, handleFullscreen, handleResize } from '../../common/common';

export const lights = (canvas: HTMLCanvasElement) => {
  const sizes = getSizes();

  const gui = new GUI();

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 3;
  camera.position.y = 2;
  camera.position.x = 1.5;
  camera.lookAt(new THREE.Vector3());
  scene.add(camera);

  // lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0x00ffcc, 0.3);
  directionalLight.position.x = 1;
  scene.add(directionalLight);

  const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x00ff00, 0.5);
  scene.add(hemisphereLight);

  const pointLight = new THREE.PointLight(0xff9900, 0.5, 1, 1);
  const folder = gui.addFolder('pointLight');
  folder.add(pointLight, 'distance').min(0.1).max(10).step(0.1);
  folder.add(pointLight, 'decay').min(0.1).max(10).step(0.1);
  pointLight.position.set(1, -0.5, 1);
  scene.add(pointLight);

  const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 2, 2);
  rectAreaLight.position.set(-1, -0.5, 1);
  rectAreaLight.lookAt(new THREE.Vector3());
  scene.add(rectAreaLight);

  const spotLight = new THREE.SpotLight(0x78ff00, 1, 6, Math.PI * 0.1, 0.25, 1);
  spotLight.position.set(0, 2, 3);
  scene.add(spotLight);

  spotLight.target.position.x = -2;
  scene.add(spotLight.target);

  // Helpers
  const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
  scene.add(directionalLightHelper);

  const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.2);
  scene.add(hemisphereLightHelper);

  const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.2);
  scene.add(pointLightHelper);

  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  scene.add(spotLightHelper);

  const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
  scene.add(rectAreaLightHelper);

  window.requestAnimationFrame(() => {
    spotLightHelper.update();
  });

  // setup
  const material = new THREE.MeshStandardMaterial({ roughness: 0.4 });

  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  const box = new THREE.Mesh(boxGeometry, material);
  scene.add(box);

  const sphereGeometry = new THREE.SphereGeometry(0.5);
  const sphere = new THREE.Mesh(sphereGeometry, material);
  sphere.position.x = -1.5;
  scene.add(sphere);

  const torusGeometry = new THREE.TorusGeometry(0.4, 0.2, 12, 24);
  const torus = new THREE.Mesh(torusGeometry, material);
  torus.position.x = 1.5;
  scene.add(torus);

  const planeGeometry = new THREE.PlaneGeometry(5, 5);
  const plane = new THREE.Mesh(planeGeometry, material);
  plane.rotation.x = -Math.PI * 0.5;
  plane.position.y = -0.9;
  scene.add(plane);

  const renderer = new THREE.WebGLRenderer({ canvas });

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const meshes = [box, sphere, torus];

  const clock = new THREE.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    renderer.render(scene, camera);

    controls.update();

    meshes.forEach((mesh) => {
      mesh.rotation.x = elapsedTime * 0.15;
      mesh.rotation.y = elapsedTime * 0.1;
    });

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
