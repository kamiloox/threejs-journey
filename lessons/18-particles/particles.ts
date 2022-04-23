import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { getSizes, handleFullscreen, handleResize } from '../../common/common';

export const particles = (canvas: HTMLCanvasElement) => {
  const textureLoader = new THREE.TextureLoader().setPath('../textures/');

  const particleTexture = textureLoader.load('particles/2.png');

  // const gui = new GUI();

  const sizes = getSizes();

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 2;
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ canvas });

  // const particles = new THREE.Points(
  //   new THREE.SphereGeometry(1, 32, 32),
  //   new THREE.PointsMaterial({ size: 0.02, sizeAttenuation: true })
  // );
  // scene.add(particles);

  const particlesCount = 20000;

  const geometry = new THREE.BufferGeometry();

  const vertices = new Float32Array(
    Array.from({ length: particlesCount * 3 }).map(() => {
      return (Math.random() - 0.5) * 10;
    })
  );

  const colors = new Float32Array(Array.from({ length: particlesCount * 3 }).map(Math.random));

  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particles = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      size: 0.09,
      sizeAttenuation: true,
      map: particleTexture,
      alphaMap: particleTexture,
      transparent: true,
      alphaTest: 0.001,
      // depthTest: false,
      // depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    })
  );

  // gui.add(particles.material, 'alphaTest').min(0).max(1).step(0.001);

  scene.add(particles);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const clock = new THREE.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    renderer.render(scene, camera);

    controls.update();

    Array.from({ length: particlesCount }).forEach((_, i) => {
      const yIndex = i * 3 + 1;
      const xIndex = i * 3;
      const offsetX = particles.geometry.getAttribute('position').array[xIndex];
      // @ts-ignore
      particles.geometry.getAttribute('position').array[yIndex] = Math.sin(elapsedTime + offsetX);
    });

    particles.geometry.getAttribute('position').needsUpdate = true;

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
