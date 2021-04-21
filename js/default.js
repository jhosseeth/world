import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';

console.log("ThreeJS funciona: ", THREE);
console.log("GLTFLoader funciona: ", GLTFLoader);
console.log("OrbitControls funciona: ", OrbitControls);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const loader = new GLTFLoader();

loader.load(
	'model/world.gltf',
	gltf => {
		scene.add(gltf.scene);
	}
);

// Create a light
const light = new THREE.AmbientLight("white"); // soft white light
scene.add( light );


/** Create a loop that causes the renderer to draw the scene every time the screen is refreshed
* @param { number } time - A timestamp number returned by requestAnimationFrame()
*/
const animate = time => {
	renderer.render(scene, camera);
	requestAnimationFrame(animate); // Animate loop
}

requestAnimationFrame(animate);