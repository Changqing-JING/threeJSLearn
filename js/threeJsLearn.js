var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor("#FFFFFF");

document.body.appendChild(renderer.domElement);

var geometry = new THREE.CubeGeometry(2,2,2);
var material = new THREE.MeshBasicMaterial({color:0xff0000});
var cube = new THREE.Mesh(geometry, material);

scene.add(cube);
camera.position.z = 5;

function render(){
    requestAnimationFrame(render);
    cube.rotation.x+=0.005;
    renderer.render(scene, camera);
}

render();