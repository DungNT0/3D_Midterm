import * as THREE from 'three';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';


// const objLoader = new OBJLoader();
const MTL_loader = new MTLLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

MTL_loader.load("public/Christmas_tree.mtl", function (materials) {
    // const star_texture = new THREE.TextureLoader().load('public/Star.png');
    // const leaves_texture = new THREE.TextureLoader().load('public/Leaves.png');
    // const trunk_texture = new THREE.TextureLoader().load('public/Trunk.png');

    // const tree_mats = new THREE.MeshPhongMaterial({
    //     map: star_texture,
    //     bumpMap: leaves_texture,
    //     normalMap: trunk_texture
    // });
    materials.preload();
    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.load("public/Christmas_tree.obj", function (object) {
        // const tree = new THREE.Mesh(object, tree_mats);
        scene.add(object);
        object.position.y = -3;
        object.position.z = -8;
        object.toJSON("public/Christmas_tree.obj");

        function animate() {
            requestAnimationFrame(animate);


            object.rotateY(0.01);
        }
        animate();
    });

});


scene.background = new THREE.TextureLoader().load('public/christmas_background.jpg');

camera.position.z = 5;
//renderer.render(scene, camera);
function animate() {
    requestAnimationFrame(animate);


    // object.rotation.x += 0.01;
    // object.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

