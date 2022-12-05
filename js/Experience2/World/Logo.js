import * as THREE from "three";
import Experience2 from "../Experience2.js";

import GSAP from "gsap";

const theme = localStorage.getItem('theme');
const objects3d = [];

export default class Logo {
    constructor() {
        this.experience2 = new Experience2();
        this.scene = this.experience2.scene;
        this.resources = this.experience2.resources;
        this.time = this.experience2.time;
        this.logo = this.resources.items.logo;
        this.actualLogo = this.logo.scene;

        this.lerp = {
            currentX: 0,
            currentY: 0,
            targetX: 0,
            targetY: 0,
            ease: 0.1,
        };
        
        this.setModel();
        this.setAnimation();
        this.onMouseMove();
        
    }
    

    paramLightSpot(lightSpot, lightObject) {
        lightSpot.castShadow = true;
        lightSpot.shadow.camera.far = 20;
        lightSpot.shadow.camera.near = 0.5;
        lightSpot.shadow.mapSize.set(2048,2048);
        lightSpot.shadow.normalBias = 0.001;
        lightObject.add(lightSpot);
        objects3d.push(lightObject);
        this.switchThemeObjects(theme, objects3d);
}

    setModel() {
        this.actualLogo.children.forEach((child) => {
            
            child.castShadow = true;
            child.receiveShadow = true;
            console.log(child);
            child.traverse((object) => {
                if (object.isMesh) {
                    object.frustumCulled = false;
                    object.castShadow = true;
                    object.receiveShadow = true;

                }
            });   
            
            if (child.name === "Sea_optimized") {
                child.castShadow = false;
                child.material.transmission = 0.95;
                child.material.roughness = 0.2;
                child.material.ior = 1.2;
                objects3d.push(child);
                this.switchThemeObjects(theme, objects3d)
            }

            if (child.name === "Sea_background") {
                const seaBackground = child;
                seaBackground.castShadow = false;
                seaBackground.receiveShadow = false;
                seaBackground.material.color.set(0x75b6a1);
            }

            if (child.name === "Sand") {
                const sand = child;
                sand.castShadow = false;
                sand.material.color.set(0x75b6a1);
            }
        });

        this.scene.add(this.actualLogo);

        // Gestion de la dimension de la scène
        // this.actualLogo.scale.set(0.1, 0.1, 0.1);
        // this.actualLogo.position.set(0,-1.5,0)
    }


    switchThemeObjects(theme, object3d) {
        objects3d.forEach((child) => {
            if (theme === "light") {
                if (child.name === 'Sea_optimized') { 
                    child.material.color.set('#156b75');
                }
                
            } else {
                if (child.name === 'Sea_optimized') {

                    child.material.color.set('#2e3642');
                }
            }
        })
            
    }

    
    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualLogo);

        this.logo.animations.forEach((animation) => {
            this.animation = this.mixer.clipAction(animation)
            this.animation.play();
            console.log(this.animation.play());
        })
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotationX =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.targetX = this.rotationX * 0.3;

            this.rotationY =
                ((e.clientY - window.innerHeight / 2) * 2) / window.innerHeight;
            this.lerp.targetY = this.rotationY * 0.1;
        });
    }


    resize() {

    }

    update() {
        this.lerp.currentX = GSAP.utils.interpolate(
            this.lerp.currentX,
            this.lerp.targetX,
            this.lerp.ease
        );
        this.actualLogo.rotation.y = this.lerp.currentX;

        this.lerp.currentY = GSAP.utils.interpolate(
            this.lerp.currentY,
            this.lerp.targetY,
            this.lerp.ease
        );
        this.actualLogo.rotation.x = this.lerp.currentY;
        this.actualLogo.rotation.z = this.lerp.currentY;

        this.mixer.update(this.time.delta * 0.001);
    }
}