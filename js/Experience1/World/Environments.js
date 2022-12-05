import * as THREE from "three";
import Experience1 from "../Experience1.js";

import GSAP from "gsap";

const theme = localStorage.getItem('theme');

export default class Environment {
    constructor() {
        this.experience1 = new Experience1();
        this.scene = this.experience1.scene;
        this.resources = this.experience1.resources;

        this.ocean = this.resources.items.ocean;
        this.actualOcean = this.ocean.scene;

        this.setMainLight();
        this.setSecondaryLight();
        this.setFog();
        this.switchThemeLights(theme);
    }

    paramEnvironmentLights(environmentLight) {
        environmentLight.castShadow = true;
        environmentLight.shadow.camera.far = 20;
        environmentLight.shadow.mapSize.set(2048,2048);
        environmentLight.shadow.normalBias = 0.001;
        this.scene.add(environmentLight);

        // const helper = new THREE.CameraHelper( environmentLight.shadow.camera );
        // this.scene.add( helper );

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

    setFog() {
        this.scene.fog = new THREE.Fog(null, 5, 40);
    }

    switchThemeLights(theme) {
        if (theme === "light") {
            // console.log(this.mainLight);

            // GSAP.to(this.mainLight.position, { 
            //     keyframes: [
            //         {x: 0, y: 0, z: 10, duration: 1},
            //         {x: 20, y: 0, z: 10, duration: 0},
            //         {x: 10, y: 3, z: 10, duration: 1, ease: 'power3.out'}
            //     ]
            // }),
            // GSAP.to(this.mainLight.color, { r: 255 / 255, g: 55 / 255, b: 0 / 255, delay: 1, duration: 1, ease: 'power3.out' });
            // GSAP.to(this.mainLight, { intensity: 100, delay: 1, duration: 1, ease: 'power3.out' });


            // GSAP.to(this.mainLightAmbiant.color, { r: 37 / 255, g: 51 / 255, b: 176 / 255, delay: 1, duration: 1, ease: 'power3.out' });
            // GSAP.to(this.mainLightAmbiant, { intensity: 10, delay: 1, duration: 1, ease: 'power3.out' });

            // GSAP.to(this.secondaryLight.position, { 
            //     keyframes: [
            //         {x: -50, y: 0, z: 10, duration: 1},
            //         {x: 0, y: 0, z: 40, duration: 0},
            //         {x: -15, y: 20, z: 40, duration: 1, ease: 'power3.out'}
            //     ]
            // });
            // GSAP.to(this.secondaryLight.color, { r: 255 / 255, g: 72 / 255, b: 0 / 255, delay: 1, duration: 1, ease: 'power3.out' });
            // GSAP.to(this.secondaryLight, { intensity: 10, delay: 1, duration: 1, ease: 'power3.out' });

            
            this.mainLight.position.set(10, 3, 10);
            this.mainLight.intensity = 100;
            this.mainLight.color.set('#ff3700');
    
            this.mainLightAmbiant.intensity = 10;
            this.mainLightAmbiant.color.set('#2533b0');
            
    
            this.secondaryLight.position.set(-10, 25, 40);
            this.secondaryLight.intensity = 10;
            this.secondaryLight.color.set('#ff4800');

            this.scene.fog.color.set('#fef1d9');
            // this.scene.fog.color = { r: 254 / 255, g: 241 / 255, b: 217 / 255,};
            // GSAP.to(this.scene.fog.color, { r: 254 / 255, g: 241 / 255, b: 217 / 255, immediateRender: true, lazy: false,} );

        } else {

            // GSAP.to(this.mainLight.position, { x: 5, y: 2, z: 5, duration: 2 });
            // GSAP.to(this.mainLight.color, { r: 18 / 255, g: 29 / 255, b: 151 / 255, duration: 2 });
            // GSAP.to(this.mainLight, { intensity: 10, duration: 2 });


            // GSAP.to(this.mainLightAmbiant.color, { r: 50 / 255, g: 22 / 255, b: 114 / 255, duration: 2 });
            // GSAP.to(this.mainLightAmbiant, { intensity: 1.5, duration: 2 });

            // GSAP.to(this.secondaryLight.position, { x: -50, y: 30, z: 40, duration: 2 });
            // GSAP.to(this.secondaryLight.color, { r: 133 / 255, g: 143 / 255, b: 255 / 255, duration: 2 });
            // GSAP.to(this.secondaryLight, { intensity: 0.05, duration: 2 });



            // this.scene.fog.color.set('#2b335a');

            
    
            this.mainLight.position.set(10, 3, 10);
            this.mainLight.intensity = 10;
            this.mainLight.color.set('#121d97');
    
            this.mainLightAmbiant.color.set('#321672');
            this.mainLightAmbiant.intensity = 1.5;
    
    
            this.secondaryLight.position.set(-10, 20, 40);
            this.secondaryLight.intensity = 0.05;
            this.secondaryLight.color.set('#858fff');
            
    
            this.scene.fog.color.set('#2b335a');
        }        
    }


    // switchThemeLights(theme) {
    //     if (theme === "light") {
    //         this.mainLight.position.set(10, 3, 10);
    //         this.mainLight.intensity = 100;
    //         this.mainLight.color.set('#ff3700');

    //         this.mainLightAmbiant.intensity = 10;
    //         this.mainLightAmbiant.color.set('#2533b0');
            

    //         this.secondaryLight.position.set(-2, 3, 10);
    //         this.secondaryLight.intensity = 5;
    //         this.secondaryLight.color.set('#ff4800');
            

    //         this.scene.fog.color.set('#fef1d9');

    //     } else {
    //         this.mainLight.position.set(10, 3, 10);
    //         this.mainLight.intensity = 10;
    //         this.mainLight.color.set('#121d97');

    //         this.mainLightAmbiant.color.set('#321672');
    //         this.mainLightAmbiant.intensity = 1.5;


    //         this.secondaryLight.position.set(-10, 20, 40);
    //         this.secondaryLight.intensity = 0.05;
    //         this.secondaryLight.color.set('#858fff');
            

    //         this.scene.fog.color.set('#2b335a');
    //     }        
    // }
 

    resize() {

    }

    update() {

    }
}




            // GSAP.to(this.mainLight, {
            //     intensity: 10,
            //     duration: 2,
            // });

            // GSAP.to(this.mainLight.color.set('#121d97'), {
            //     duration: 2,
            // });

            // GSAP.to(this.mainLightAmbiant, {
            //     intensity: 1.5,
            //     duration: 2,
            // });

            // GSAP.to(this.mainLightAmbiant.color.set('#321672'), {
            //     duration: 2,
            // });

            // GSAP.to(this.secondaryLight, {
            //     intensity: 0.01,
            //     duration: 0,
            // });

            // GSAP.to(this.secondaryLight.color.set('#858fff'), {
            //     duration: 2,
            // });


            // GSAP.to( this.scene.fog.color.set('#2b335a'), {
            //     duration: 2,
            // });