import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';

console.log("ThreeJS funciona: ", THREE);
console.log("GLTFLoader funciona: ", GLTFLoader);
console.log("OrbitControls funciona: ", OrbitControls);

/* ===========================================================================
** 					 				SCENE
** =========================================================================== */
const scene = new THREE.Scene();
scene.background = new THREE.Color("black");

// Create a light
const light = new THREE.AmbientLight("white"); // soft white light
scene.add(light);


/* ===========================================================================
** 									CAMERA
** =========================================================================== */
const fov = 75;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = (window.innerWidth < 600) ? 7 : 4; // Responsive

// Responsive
window.addEventListener('resize', () => {
	camera.position.z = (window.innerWidth < 600) ? 7 : 4;
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});

/* ===========================================================================
** 				  				   RENDERER
** =========================================================================== */
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);


/** Create a loop that causes the renderer to draw the scene every time the screen is refreshed
* @param { number } time - A timestamp number returned by requestAnimationFrame()
*/
const animate = time => {
	renderer.render(scene, camera);
	requestAnimationFrame(animate); // Animate loop
}

requestAnimationFrame(animate);


/* ===========================================================================
** 									MODEL
** =========================================================================== */
const loader = new GLTFLoader();
loader.load(
	'model/world.gltf',
	gltf => {
		scene.add(gltf.scene);
	}
);


/* ===========================================================================
** 								ORBIT CONTROL
** =========================================================================== */
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
