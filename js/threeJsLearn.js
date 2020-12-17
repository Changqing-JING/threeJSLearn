class Point{
    constructor(x, y, z){
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

function surfaceMesh(p1, p2, p3){
    const geometry = new THREE.Geometry();

    geometry.vertices.push(
        new THREE.Vector3( p1.x,  p1.y, p1.z ),
        new THREE.Vector3( p2.x,  p2.y, p2.z ),
        new THREE.Vector3(  p3.x,  p3.y, p3.z )
    );

    geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );

    geometry.computeBoundingSphere();
    var material = new THREE.MeshBasicMaterial({color:0xff0000, side:THREE.DoubleSide});
    const shape_mesh = new THREE.Mesh( geometry, material ) ;
    return shape_mesh;
}

function cubeMesh(size){
    var geometry = new THREE.CubeGeometry(size,size,size);
    var material = new THREE.MeshBasicMaterial({color:0xffff00});
    var cube = new THREE.Mesh(geometry, material);
    return cube
}

function draw_house(size){
    var objtotal = new THREE.Object3D();
    var top_size_half = size/2 + size*0.3;
    var half_size = size/2;
    var p1 = new Point (top_size_half, top_size_half, half_size);
    var p2 = new Point (-top_size_half, top_size_half, half_size);
    var p3 = new Point (-top_size_half, -top_size_half, half_size);
    var p4 = new Point (top_size_half, -top_size_half, half_size);

    var p_top = new Point (0, 0, size);

    const shape_mesh1 = surfaceMesh(p1, p2, p_top);
    const shape_mesh2 = surfaceMesh(p2, p3, p_top);
    const shape_mesh3 = surfaceMesh(p3, p4, p_top);
    const shape_mesh4 = surfaceMesh(p4, p1, p_top);

    const shape_meshb1 = surfaceMesh(p1, p2, p3);
    const shape_meshb2 = surfaceMesh(p1, p3, p4);

    var cube = cubeMesh(size);
    objtotal.add(cube);

    objtotal.add(shape_mesh1);
    objtotal.add(shape_mesh2);
    objtotal.add(shape_mesh3);
    objtotal.add(shape_mesh4);
    objtotal.add(shape_meshb1);
    objtotal.add(shape_meshb2);

    return objtotal;
}


function init_cube(){
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor("#FFFFFF");

    document.body.appendChild(renderer.domElement);

    

    var axisHelper = new THREE.AxesHelper(4);

    scene.add(axisHelper);

    //scene.add(cube);
    camera.position.z = 5;

    objtotal = draw_house(10);
    scene.add(objtotal);

    
    var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.target = new THREE.Vector3(0, 0, 0);//控制焦点
    orbitControls.autoRotate = false;//将自动旋转关闭
    var clock = new THREE.Clock();


    function render_cube(){
        requestAnimationFrame(render_cube);
        //objtotal.rotation.x+=0.005;
        
        
        var delta = clock.getDelta();//获取时间差
        orbitControls.update(delta);//更新时间
        renderer.render(scene, camera);
    }

    return render_cube;
}



