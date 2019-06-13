let camera, scene, renderer, controls;

let icos;
let icos2;
let torusK;

init();
animate();

function init(){
	let width = window.innerWidth;
	let height = window.innerHeight;

	//scene
	scene = new THREE.Scene();
	
	scene.background = new THREE.
	CubeTextureLoader()
		.setPath('images/HeroesSquare/')
		.load([
			'posx.jpg',
			'negx.jpg',
			'posy.jpg',
			'negy.jpg',
			'posz.jpg',
			'negz.jpg'
	]);
		

	//camera
	camera = new THREE.PerspectiveCamera( 45, width / height, 10, 25000 );
	camera.position.z = 700; 
	camera.position.y = 200;
	scene.add(camera);

	// lights
	let light = new THREE.DirectionalLight(0xFFFFFF, 1);
	light.position.set(1,1,1);
	scene.add(light);

	let spotlight = new THREE.SpotLight(0xFFFFFF, 0.8, 2000);
	spotlight.position.set(500,500,500);
	spotlight.castShadow = true; 

	spotlight.shadow.mapSize.width = 4096;
	spotlight.shadow.mapSize.height = 4096;

	spotlight.shadow.camera.near = 500;
	spotlight.shadow.camera.far = 2000;
	spotlight.shadow.camera.fov = 45;

	scene.add(spotlight);

	//material
	var texture = new THREE.TextureLoader().load("images/lavatile.jpg");
	let material1 = new THREE.MeshStandardMaterial({
		map: texture, 
		alphaTest: 0.5,
		side: THREE.DoubleSide
	});
	let material2 = new THREE.MeshBasicMaterial({
		envMap: scene.background,
		side: THREE.DoubleSide
	});

 	//object
	let TKGeometry = new THREE.TorusKnotBufferGeometry(50, 10, 50, 20);
	torusK = new THREE.Mesh(TKGeometry, material2);
	torusK.position.y = 0;
	torusK.castShadow = true;
	scene.add(torusK);

	let ICGeometry = new THREE.IcosahedronBufferGeometry(75, 1);
	icos = new THREE.Mesh(ICGeometry, material2);
	icos.position.y = -100;
	icos.castShadow = true;
	scene.add(icos);

	let ICGeometry2 = new THREE.IcosahedronBufferGeometry(75, 1);
	icos2 = new THREE.Mesh(ICGeometry2, material2);
	icos2.position.y = 100;
	icos2.castShadow = true;
	scene.add(icos2);

	let planeGeometry = new THREE.PlaneGeometry(200, 200, 10, 10);
	let planeMaterial = new THREE.MeshBasicMaterial({
		envMap: scene.background,
		side: THREE.DoubleSide
	});
	let plane = new THREE.Mesh(planeGeometry, material1);
	plane.position.y = -180;
	plane.rotation.x = Math.PI / 2; 
	plane.receiveShadow = true; 
	scene.add(plane);

	//renderer 
	renderer = new THREE.WebGLRenderer({
		alpha: 1, 
		antialias: true
	});
	renderer.setSize(width, height);
	renderer.shadowMap.enabled = true;

	//controls
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	document.body.appendChild(renderer.domElement);
}

function animate() {
	requestAnimationFrame( animate );

	torusK.rotation.x += 0.005; 
	torusK.rotation.y += 0.01;

	icos.rotation.x += 0.005; 
	icos.rotation.y += 0.01;

	icos2.rotation.x += 0.005; 
	icos2.rotation.y += 0.01;
	renderer.render(scene, camera);
	controls.update();
}