import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getSizes, handleFullscreen, handleResize } from '../../common/common';

export const textures = (canvas: HTMLCanvasElement) => {
  const sizes = getSizes();

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 2;
  scene.add(camera);

  const loadingManager = new THREE.LoadingManager();

  loadingManager.onStart = () => {
    console.log('onStart');
  };

  loadingManager.onLoad = () => {
    console.log('onLoad');
  };

  loadingManager.onProgress = () => {
    console.log('onProgress');
  };

  loadingManager.onError = () => {
    console.log('onError');
  };

  const textureLoader = new THREE.TextureLoader(loadingManager);
  // const colorTexture = textureLoader.load('../textures/door/color.jpg');
  // const ambientOcclusionTexture = textureLoader.load('../textures/door/ambient_occlusion.jpg');
  // const heightTexture = textureLoader.load('../textures/door/height.jpg');
  // const metallicTexture = textureLoader.load('../textures/door/height.jpg');
  // const normalTexture = textureLoader.load('../textures/door/normal.jpg');
  // const opacityTexture = textureLoader.load('../textures/door/opacity.jpg');
  // const roughnessTexture = textureLoader.load('../textures/door/roughness.jpg');

  // colorTexture.repeat.x = 2;
  // colorTexture.repeat.y = 3;
  // colorTexture.wrapS = THREE.RepeatWrapping;
  // colorTexture.wrapT = THREE.RepeatWrapping;

  // colorTexture.rotation = 0.1;
  // colorTexture.center.x = 0.5;
  // colorTexture.center.y = 0.5;

  const colorTexture = textureLoader.load('../textures/checkerboard-1024x1024.png');

  colorTexture.generateMipmaps = false;
  colorTexture.minFilter = THREE.NearestFilter;

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ map: colorTexture });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const renderer = new THREE.WebGLRenderer({ canvas });

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
