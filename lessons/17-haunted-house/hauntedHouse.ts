import * as THREE from 'three';
import { BufferAttribute, BufferGeometry } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getSizes, handleFullscreen, handleResize } from '../../common/common';

export const hauntedHouse = (canvas: HTMLCanvasElement) => {
  /**
   * Textures
   */
  const textureLoader = new THREE.TextureLoader().setPath('../textures/');

  const doorColorTexture = textureLoader.load('door/color.jpg');
  const doorHeightTexture = textureLoader.load('door/height.jpg');
  const doorMetallnesTexture = textureLoader.load('door/metallic.jpg');
  const doorNormalTexture = textureLoader.load('door/normal.jpg');
  const doorOpacityTexture = textureLoader.load('door/opacity.jpg');
  const doorRoughnessTexture = textureLoader.load('door/roughness.jpg');
  const doorAmbientOcclusionTexture = textureLoader.load('door/ambient_occlusion.jpg');

  const bricksAmbientOcclusionTexture = textureLoader.load('bricks/ambient_occlusion.jpg');
  const bricksColorTexture = textureLoader.load('bricks/color.jpg');
  const bricksNormalTexture = textureLoader.load('bricks/normal.jpg');
  const bricksRoughnessTexture = textureLoader.load('bricks/roughness.jpg');

  const grassAmbientOcclusionTexture = textureLoader.load('grass/ambient_occlusion.jpg');
  const grassColorTexture = textureLoader.load('grass/color.jpg');
  const grassNormalTexture = textureLoader.load('grass/normal.jpg');
  const grassRoughnessTexture = textureLoader.load('grass/roughness.jpg');

  const grassTextures = [
    grassAmbientOcclusionTexture,
    grassColorTexture,
    grassNormalTexture,
    grassRoughnessTexture,
  ];

  grassTextures.forEach((texture) => {
    texture.repeat.set(8, 8);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
  });

  const sizes = getSizes();

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.set(2, 3, 7);
  scene.add(camera);

  /**
   * Lights
   */
  const ambientLight = new THREE.AmbientLight(0xb9d5ff, 0.12);
  ambientLight.castShadow = true;
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xb9d5ff, 0.12);
  directionalLight.castShadow = true;
  scene.add(directionalLight);

  /**
   * Ground
   */

  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(12, 12),
    new THREE.MeshStandardMaterial({
      map: grassColorTexture,
      aoMap: grassAmbientOcclusionTexture,
      normalMap: grassNormalTexture,
      roughnessMap: grassRoughnessTexture,
    })
  );
  ground.geometry.setAttribute('uv2', new BufferAttribute(ground.geometry.getAttribute('uv').array, 2));
  ground.rotateX(-Math.PI * 0.5);
  ground.receiveShadow = true;
  scene.add(ground);

  /**
   * House
   */

  const house = new THREE.Group();

  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
      color: 0x85616d,
      map: bricksColorTexture,
      aoMap: bricksAmbientOcclusionTexture,
      aoMapIntensity: 4,
      normalMap: bricksNormalTexture,
      roughnessMap: bricksRoughnessTexture,
    })
  );
  walls.geometry.setAttribute('uv2', new BufferAttribute(walls.geometry.getAttribute('uv').array, 2));
  walls.castShadow = true;
  house.add(walls);

  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: 0xe3ac5f })
  );
  roof.position.y = 2.5 * 0.5;
  roof.translateY(1 * 0.5);
  roof.rotateY(Math.PI * 0.25);
  house.add(roof);

  const doorGeometry = new THREE.PlaneGeometry(2, 2, 100, 100);

  const doorMaterial = new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    alphaMap: doorOpacityTexture,
    transparent: true,
    aoMap: doorAmbientOcclusionTexture,
    aoMapIntensity: 2,
    displacementMap: doorHeightTexture,
    displacementScale: 0.2,
    normalMap: doorNormalTexture,
    metalnessMap: doorMetallnesTexture,
    roughnessMap: doorRoughnessTexture,
  });

  const door = new THREE.Mesh(doorGeometry, doorMaterial);
  door.geometry.setAttribute(
    'uv2',
    new THREE.BufferAttribute(door.geometry.getAttribute('uv').array, 2)
  );
  door.position.z = 4 * 0.5 + 0.01;
  door.position.y = -(2.5 - 2 + 0.17) * 0.5;
  house.add(door);

  // bushes

  const bushGeometry = new THREE.SphereGeometry(0.5, 12, 12);
  const bushMaterial = new THREE.MeshStandardMaterial({ color: 0x64d13d });

  const BUSH_POSITION_Z = 4 * 0.5 + 0.25;
  const BUSH_POSITION_Y = -1;

  const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);

  bush1.position.set(-0.9, BUSH_POSITION_Y, BUSH_POSITION_Z);

  const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush2.position.set(0.8, BUSH_POSITION_Y + 0.05, BUSH_POSITION_Z);

  const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush3.position.set(1.3, BUSH_POSITION_Y - 0.2, BUSH_POSITION_Z - 0.2);
  bush3.scale.set(0.4, 0.4, 0.4);

  const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush4.position.set(-1.4, BUSH_POSITION_Y - 0.2, BUSH_POSITION_Z - 0.1);
  bush4.scale.set(0.4, 0.4, 0.4);

  const bush5 = new THREE.Mesh(bushGeometry, bushMaterial);
  bush5.position.set(0.9, BUSH_POSITION_Y - 0.1, BUSH_POSITION_Z + 0.5);
  bush5.scale.set(0.7, 0.7, 0.7);

  house.add(bush1, bush2, bush3, bush4, bush5);

  // graves

  const graveGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.2);
  const graveMaterial = new THREE.MeshStandardMaterial({ color: 0x808791 });

  const gravesCount = 30;

  Array.from({ length: gravesCount }).forEach(() => {
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    grave.castShadow = true;
    // const x = Math.sin(i) * 3.5;
    // const z = Math.cos(i) * 3.5;
    // grave.position.set(
    //   x > 0 ? x + Math.random() * 2 : x - Math.random() * 2,
    //   0.39,
    //   z > 0 ? z + Math.random() * 2 : z - Math.random() * 2
    // );

    const angle = Math.random() * Math.PI * 2;
    const radius = 3.5 + Math.random() * 2.4;

    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    grave.position.set(x, 0.3, z);

    grave.rotation.set(0, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.1);

    scene.add(grave);
  });

  // lights

  const doorLight = new THREE.PointLight(0xff7d46, 1, 7);
  doorLight.position.y = 0.8;
  doorLight.position.z = 4 * 0.5 + 1;
  house.add(doorLight);

  const pointLightHelper = new THREE.PointLightHelper(doorLight, 0.2);
  pointLightHelper.visible = false;
  scene.add(pointLightHelper);

  house.position.y = 2.5 * 0.5;
  scene.add(house);

  /**
   * Ghosts
   */

  const ghost1 = new THREE.PointLight(0xb5e48c, 2, 3);
  ghost1.castShadow = true;

  const ghost2 = new THREE.PointLight(0x8ecae6, 2, 3);
  ghost2.castShadow = true;

  const ghost3 = new THREE.PointLight(0xf72585, 2, 3);
  ghost3.castShadow = true;

  scene.add(ghost1, ghost2, ghost3);

  /**
   * Fog
   */

  const fog = new THREE.Fog(0x262837, 1, 15);
  scene.fog = fog;

  /**
   * Others
   */

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.shadowMap.enabled = true;
  renderer.setClearColor(0x262837);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const clock = new THREE.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    renderer.render(scene, camera);

    controls.update();

    ghost1.position.set(
      Math.sin(elapsedTime) * 4,
      Math.sin(elapsedTime) * 1.5,
      Math.cos(elapsedTime) * 4
    );
    ghost2.position.set(
      Math.sin(elapsedTime + Math.PI * 0.5) * 4,
      Math.sin(elapsedTime) * 1.5,
      Math.cos(elapsedTime + Math.PI * 0.5) * 4
    );
    ghost3.position.set(
      Math.sin(elapsedTime + Math.PI) * 4,
      Math.sin(elapsedTime) * 1.5,
      Math.cos(elapsedTime + Math.PI) * 4
    );

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
