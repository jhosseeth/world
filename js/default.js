import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';


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


/* ===========================================================================
** 				  				   RENDERER
** =========================================================================== */
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Show canvas

// Responsive
window.addEventListener('resize', () => {
	camera.position.z = (window.innerWidth < 600) ? 7 : 4;
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
});


/* ===========================================================================
** 								   LOADER
** =========================================================================== */
const manager = new THREE.LoadingManager(); //Handles and keeps track of loaded and pending data

// When each item is complete
manager.onProgress =  (url, itemsLoaded, itemsTotal) => {
	let percLoaded = parseInt((itemsLoaded / itemsTotal) * 100);
	document.getElementById("loadingTxt").innerHTML = `LOADING ${percLoaded}%`;
};

// When load is completed
manager.onLoad = () => {
	document.getElementById("loader").style.visibility = "hidden"; // hide loader animation
	document.getElementById("overCanvas").style.display  = "block"; // show button to orbit model
};


/* ===========================================================================
** 									MODEL
** =========================================================================== */
var text, earth;
const loader = new GLTFLoader(manager);
const modelURL = 'model/world.gltf';
const onload = gltf => {
	let model = gltf.scene;
	scene.add(model);
	text = model.getObjectByName('Text');
	earth = model.getObjectByName('Earth');
};

loader.load(modelURL, onload);


/* ===========================================================================
** 								ORBIT CONTROL
** =========================================================================== */
const btn = document.getElementById("toOrbit");
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();
controls.enabled = false; // the controls will not respond to user input

// Add event to orbit around the model
btn.addEventListener('click', event => {
	let btnTxt = document.getElementsByClassName("text")[0];
	controls.enabled = controls.enabled ? false : true;
	btnTxt.innerHTML = controls.enabled ? "Click to stop orbiting" : "Click to orbit"; 
	renderer.domElement.className =  controls.enabled ? "grab" : "";
});

// Add grabbing cursor style when an interaction was initiated. 
controls.addEventListener('start', event => {
	renderer.domElement.className = "grabbing";
});

// Add grab cursor style when an interaction has finished.
controls.addEventListener('end', event => {
	renderer.domElement.className = "grab";
});


/** Create a loop that causes the renderer to draw the scene every time the screen is refreshed
* @param { number } time - A timestamp number returned by requestAnimationFrame()
*/
const animate = time => {
	if (text) text.rotation.z += -0.001;
	if (earth) earth.rotation.y += -0.001;

	renderer.render(scene, camera);
	requestAnimationFrame(animate); // Animate loop
}

requestAnimationFrame(animate);