

function init_vector(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#FFFFFF");

    document.body.appendChild(renderer.domElement);


    var geometry = new THREE.Geometry();
    var material = new THREE.LineBasicMaterial({vertexColors:true});
    var color1 = new THREE.Color(0x444444);
    var color2 = new THREE.Color(0xFF0000);

    var p1 = new THREE.Vector3(-100,0,0);
    var p2 = new THREE.Vector3(100, 0, 0);

    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.colors.push(color1, color2);

    var line = new THREE.Line(geometry, material, THREE.LineSegments);

    scene.add(line);
    camera.position.z = 5;

    function render_vector(){
        requestAnimationFrame(render_vector);
        renderer.render(scene, camera);
    }

    return render_vector;
}



