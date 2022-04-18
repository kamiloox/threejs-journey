import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { getSizes, handleFullscreen, handleResize } from '../../common/common';

export const text3d = (canvas: HTMLCanvasElement) => {
  const fontLoader = new FontLoader();

  const textureLoader = new THREE.TextureLoader();
  const matcapTexture = textureLoader.load('../textures/matcaps/7.png');

  const sizes = getSizes();

  const scene = new THREE.Scene();

  const axesHelper = new THREE.AxesHelper(5);
  // scene.add(axesHelper);

  fontLoader.load('../fonts/Montserrat_Regular.json', (font) => {
    const textGeometry = new TextGeometry('Hello world!', {
      font,
      size: 0.3,
      height: 0.2,
      bevelEnabled: true,
      bevelSegments: 3,
      bevelSize: 0.02,
      bevelThickness: 0.03,
      // bevelOffset: 0.005,
      // height: 100,
      // curveSegments: 12,
      // bevelSize: 8,
      // bevelOffset: 0,
      // bevelSegments: 5,
    });
    // textGeometry.computeBoundingBox();
    // const { boundingBox } = textGeometry;
    // if (boundingBox) {
    //   textGeometry.translate(
    //     -(boundingBox.max.x + boundingBox.min.x) * 0.5,
    //     -boundingBox.max.y * 0.5,
    //     -boundingBox.max.z * 0.5
    //   );
    // }
    textGeometry.center();

    // const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
    const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    const torusGeometry = new THREE.TorusGeometry(0.2, 0.07, 12, 24);

    const text = new THREE.Mesh(textGeometry, material);
    scene.add(text);

    const toriCount = 200;
    Array.from({ length: toriCount }).forEach(() => {
      const torus = new THREE.Mesh(torusGeometry, material);

      torus.position.set(
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 7,
        (Math.random() - 0.5) * 7
      );

      torus.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      const scale = Math.random();
      torus.scale.set(scale, scale, scale);

      scene.add(torus);
    });
  });

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
  camera.position.z = 3;
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ canvas });

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

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
