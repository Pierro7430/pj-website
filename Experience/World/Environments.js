import * as THREE from "three";
import Experience from "../Experience.js";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setSunlight();
    }

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("#FFB56A", 50);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias = 0.001;
        this.sunLight.position.set(5, 7, 3);
        this.scene.add(this.sunLight);

        this.ambiantLight = new THREE.AmbientLight("#3578FE", 1.5);
        this.scene.add(this.ambiantLight);
    }

    resize() {

    }


    update() {

    }
}