import * as THREE from "three";
import Experience2 from "./Experience2.js";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
    constructor() {
        this.experience2 = new Experience2();
        this.sizes = this.experience2.sizes;
        this.scene = this.experience2.scene;
        this.canvas = this.experience2.canvas;
        
        this.createPerpectiveCamera();
        this.createOrthographicCamera();
        this.setOrbitControls();
    }

    createPerpectiveCamera() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(
            35, 
            this.sizes.aspect,
            0.1,
            100,
        );
        this.perspectiveCamera.position.z = 20;
        this.perspectiveCamera.position.y = 7;
        this.perspectiveCamera.position.x = 0;
        this.scene.add(this.perspectiveCamera);
    }

    createOrthographicCamera() {
        this.frustrum = 50;
        this.orthographicCamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2, 
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            -this.sizes.frustrum / 2,
            this.sizes.frustrum / 2,
            -100,
            100,
        );
        this.scene.add(this.orthographicCamera);

        // // Grid
        // const size = 50;
        // const divisions = 50;

        // const gridHelper = new THREE.GridHelper( size, divisions );
        // this.scene.add( gridHelper );
        
        // // Axes
        // const axesHelper = new THREE.AxesHelper( 5 );
        // this.scene.add( axesHelper );
        
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;  
        
    }

    resize() {
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
        this.orthographicCamera.top = this.sizes.frustrum / 2;
        this.orthographicCamera.bottom = -this.sizes.frustrum / 2;
        this.orthographicCamera.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
    }
}