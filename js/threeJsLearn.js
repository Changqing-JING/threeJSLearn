function init_cube(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#FFFFFF");

    document.body.appendChild(renderer.domElement);

    var geometry = new THREE.CubeGeometry(2,2,2);
    var material = new THREE.MeshBasicMaterial({color:0xff0000});
    var cube = new THREE.Mesh(geometry, material);

    var axisHelper = new THREE.AxesHelper(4);

    //scene.add(axisHelper);

    //scene.add(cube);
    camera.position.z = 5;

    var objtotal = new THREE.Object3D();

    objtotal.add(cube);
    objtotal.add(axisHelper);
    scene.add(objtotal);

    
    var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.target = new THREE.Vector3(0, 0, 0);//控制焦点
    orbitControls.autoRotate = false;//将自动旋转关闭
    var clock = new THREE.Clock();

    function render_cube(){
        requestAnimationFrame(render_cube);
        objtotal.rotation.x+=0.005;
        
        
        var delta = clock.getDelta();//获取时间差
        orbitControls.update(delta);//更新时间
        renderer.render(scene, camera);
    }

    return render_cube;
}



