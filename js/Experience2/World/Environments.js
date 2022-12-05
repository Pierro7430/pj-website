import * as THREE from "three";
import Experience2 from "../Experience2.js";

import GSAP from "gsap";

const theme = localStorage.getItem('theme');

export default class Environment {
    constructor() {
        this.experience2 = new Experience2();
        this.scene = this.experience2.scene;
        this.resources = this.experience2.resources;

        this.logo = this.resources.items.logo;
        this.actualLogo = this.logo.scene;

        this.setMainLight();
        // this.setSecondaryLight();
        this.switchThemeLights(theme);
    }

    paramEnvironmentLights(environmentLight) {
        environmentLight.castShadow = true;
        environmentLight.shadow.camera.far = 20;
        environmentLight.shadow.mapSize.set(2048,2048);
        environmentLight.shadow.normalBias = 0.001;
        this.scene.add(environmentLight);

    }
    
    setMainLight() {   
        this.mainLight = new THREE.DirectionalLight();
        this.paramEnvironmentLights(this.mainLight);
        this.mainLightAmbiant = new THREE.AmbientLight();
        this.scene.add(this.mainLightAmbiant);
    }

    setSecondaryLight() {
        this.secondaryLight = new THREE.DirectionalLight();
        this.paramEnvironmentLights(this.secondaryLight);
    }


    switchThemeLights(theme) {
        if (theme === "light") {
            
            this.mainLight.position.set(10, 3, 10);
            this.mainLight.intensity = 100;
            this.mainLight.color.set('#ff3700');
    
            this.mainLightAmbiant.intensity = 10;
            this.mainLightAmbiant.color.set('#2533b0');
            
    
            // this.secondaryLight.position.set(-10, 25, 40);
            // this.secondaryLight.intensity = 10;
            // this.secondaryLight.color.set('#ff4800');

        } else {
            
            this.mainLight.position.set(-10, 5, 10);
            this.mainLight.intensity = 10;
            this.mainLight.color.set('#121d97');
    
            this.mainLightAmbiant.color.set('#321672');
            this.mainLightAmbiant.intensity = 1.5;
    
    
            // this.secondaryLight.position.set(-10, 20, 40);
            // this.secondaryLight.intensity = 0.05;
            // this.secondaryLight.color.set('#858fff');
        }        
    }

 

    resize() {

    }

    update() {

    }
}
