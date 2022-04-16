import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getSizes, handleFullscreen, handleResize } from '../../common/common';

export const materials = (canvas: HTMLCanvasElement) => {
  const textureLoader = new THREE.TextureLoader();

  const doorColorTexture = textureLoader.load('../textures/door/color.jpg');
  const doorAmbientOcclusionTexture = textureLoader.load('../textures/door/ambient_occlusion.jpg');
  const doorHeightTexture = textureLoader.load('../textures/door/height.jpg');
  const doorMetallicTexture = textureLoader.load('../textures/door/height.jpg');
  const doorNormalTexture = textureLoader.load('../textures/door/normal.jpg');
  const doorOpacityTexture = textureLoader.load('../textures/door/opacity.jpg');
  const doorRoughnessTexture = textureLoader.load('../textures/door/roughness.jpg');
  const matcapTexture = textureLoader.load('../textures/matcaps/3.png');

  const gradientTexture = textureLoader.load('../textures/gradients/5.jpg');
  gradientTexture.minFilter = THREE.NearestFilter;
  gradientTexture.magFilter = THREE.NearestFilter;
  gradientTexture.generateMipmaps = false;

  const gui = new GUI({ width: 400, title: 'Tweak me' });

  const parameters = {
    rotate: false,
  };

  gui.add(parameters, 'rotate');

  const sizes = getSizes();

  const scene = new THREE.Scene();

  const background = new THREE.CubeTextureLoader()
    .setPath('../textures/environmentMaps/3/')
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
  scene.background = background;

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 2;
  camera.lookAt(new THREE.Vector3());
  scene.add(camera);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.5);
  pointLight.position.set(2, 3, 4);
  scene.add(pointLight);

  // const material = new THREE.MeshBasicMaterial({
  //   map: doorColorTexture,
  //   side: THREE.DoubleSide,
  //   transparent: true,
  //   alphaMap: doorOpacityTexture,
  // });

  // const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture, side: THREE.DoubleSide });

  // const material = new THREE.MeshDepthMaterial();

  // const material = new THREE.MeshLambertMaterial();

  // const material = new THREE.MeshPhongMaterial({ shininess: 100, specular: 0xff0000 });

  // const material = new THREE.MeshToonMaterial({ gradientMap: gradientTexture, side: THREE.DoubleSide });

  // const material = new THREE.MeshStandardMaterial({
  //   // color: 0x5eefff,
  //   // roughness: 0,
  //   // metalness: 0.2,
  //   side: THREE.DoubleSide,
  //   map: doorColorTexture,
  //   aoMap: doorAmbientOcclusionTexture,
  //   aoMapIntensity: 1,
  //   displacementMap: doorHeightTexture,
  //   displacementScale: 0.05,
  //   metalnessMap: doorMetallicTexture,
  //   roughnessMap: doorRoughnessTexture,
  //   normalMap: doorNormalTexture,
  //   alphaMap: doorOpacityTexture,
  //   // transparent: true,
  //   // alphaMap: doorOpacityTexture,
  // });

  const material = new THREE.MeshStandardMaterial({
    metalness: 0.7,
    roughness: 0.2,
    side: THREE.DoubleSide,
    envMap: background,
  });

  gui.add(material, 'roughness').min(0).max(1);
  gui.add(material, 'metalness').min(0).max(1);
  gui.add(material, 'wireframe');
  gui.add(material, 'transparent');
  // gui.add(material, 'displacementScale').min(0).max(1);
  // gui.add(material, 'aoMapIntensity').min(0).max(10);

  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
  scene.add(plane);

  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
  sphere.position.x = 1.5;
  scene.add(sphere);

  const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128), material);
  torus.position.x = -1.5;
  scene.add(torus);

  const meshes = [plane, sphere, torus];

  meshes.forEach((mesh) => {
    mesh.geometry.setAttribute(
      'uv2',
      new THREE.BufferAttribute(mesh.geometry.getAttribute('uv').array, 2)
    );
  });

  const renderer = new THREE.WebGLRenderer({ canvas });

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const clock = new THREE.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    meshes.forEach((mesh) => {
      if (parameters.rotate) {
        mesh.rotation.x = elapsedTime * 0.1;
        mesh.rotation.y = elapsedTime * 0.1;
      }
    });

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
