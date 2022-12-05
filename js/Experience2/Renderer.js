import * as THREE from "three";
import Experience2 from "./Experience2.js";

export default class Renderer {
    constructor() {
        this.experience2 = new Experience2();
        this.sizes = this.experience2.sizes;
        this.scene = this.experience2.scene;
        this.canvas = this.experience2.canvas;
        this.camera = this.experience2.camera;

        this.setRenderer();
        
    }

    setRenderer() {
        this.renderer = new THREE.WebGL1Renderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true,
        });
        this.renderer.physicallyCorrectLights = true;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.CineonToneMapping;
        this.renderer.toneMappingExposure = 1;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    resize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }


    update() {
        this.renderer.render(this.scene, this.camera.perspectiveCamera);
        
    }
}