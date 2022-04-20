import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getSizes, handleFullscreen, handleResize } from '../../common/common';

export const shadows = (canvas: HTMLCanvasElement) => {
  const textureLoader = new THREE.TextureLoader().setPath('../');

  const bakedShadow = textureLoader.load('textures/bakedShadow.jpg');
  const simpleShadow = textureLoader.load('textures/simpleShadow.jpg');

  const sizes = getSizes();

  const gui = new GUI({ width: 400 });

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 3;
  camera.position.x = 1;
  camera.lookAt(new THREE.Vector3());
  scene.add(camera);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
  directionalLight.position.set(2, 2, -1);

  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.far = 6;
  directionalLight.shadow.camera.left = -2;
  directionalLight.shadow.camera.right = 2;
  directionalLight.shadow.camera.top = 2;
  directionalLight.shadow.camera.bottom = -2;

  scene.add(directionalLight);

  const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
  directionalLightHelper.visible = false;
  scene.add(directionalLightHelper);

  const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
  directionalLightCameraHelper.visible = false;
  scene.add(directionalLightCameraHelper);

  const spotLight = new THREE.SpotLight(0xffffff, 0.4, 8, Math.PI * 0.3);

  spotLight.position.set(0, 1, 2);

  spotLight.castShadow = true;
  spotLight.shadow.camera.far = 4;
  spotLight.shadow.camera.fov = 35;
  spotLight.shadow.mapSize.set(1024, 1024);

  scene.add(spotLight);

  const spotLightShadowCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
  spotLightShadowCameraHelper.visible = false;
  scene.add(spotLightShadowCameraHelper);

  const spotLightHelper = new THREE.SpotLightHelper(spotLight);
  spotLightHelper.visible = false;
  scene.add(spotLightHelper);

  const pointLight = new THREE.PointLight(0xffffff, 0.4, 3);
  pointLight.position.set(-1, 1, 0);

  pointLight.castShadow = true;
  pointLight.shadow.camera.near = 0.1;
  pointLight.shadow.camera.far = 5;

  scene.add(pointLight);

  const pointLightHelper = new THREE.PointLightHelper(pointLight);
  pointLightHelper.visible = false;
  scene.add(pointLightHelper);

  const pointLightShadowCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
  pointLightShadowCameraHelper.visible = false;
  scene.add(pointLightShadowCameraHelper);

  const material = new THREE.MeshStandardMaterial();

  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.4), material);
  sphere.castShadow = true;
  scene.add(sphere);

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(3, 3), material);
  plane.rotation.x = -Math.PI * 0.5;
  plane.position.y = -0.4;
  plane.receiveShadow = true;
  scene.add(plane);

  const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      alphaMap: simpleShadow,
      transparent: true,
    })
  );
  sphereShadow.rotateX(-Math.PI * 0.5);
  sphereShadow.position.y = plane.position.y + 0.01;
  scene.add(sphereShadow);

  gui.add(ambientLight, 'intensity').name('ambientLight intensity').min(0).max(1).step(0.01);
  gui.add(directionalLight, 'intensity').name('directionalLight intensity').min(0).max(1).step(0.01);
  gui.add(material, 'metalness').min(0).max(1).step(0.01);
  gui.add(material, 'roughness').min(0).max(1).step(0.01);
  gui.add(sphere.position, 'x').min(-1).max(1).step(0.01);
  gui.add(sphere.position, 'y').min(0).max(1).step(0.01);
  gui.add(sphere.position, 'z').min(-1).max(1).step(0.01);

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.shadowMap.enabled = false;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const clock = new THREE.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    controls.update();

    renderer.render(scene, camera);

    sphere.position.x = Math.sin(elapsedTime);
    sphere.position.z = Math.cos(elapsedTime);
    sphere.position.y = Math.abs(Math.sin(elapsedTime * 3));

    sphereShadow.position.x = sphere.position.x;
    sphereShadow.position.z = sphere.position.z;
    sphereShadow.material.opacity = (1 - sphere.position.y) * 0.7;

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
