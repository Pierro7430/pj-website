import * as THREE from "three";
import Experience1 from "../Experience1.js";

import GSAP from "gsap";

const theme = localStorage.getItem('theme');
const objects3d = [];

export default class Ocean {
    constructor() {
        this.experience1 = new Experience1();
        this.scene = this.experience1.scene;
        this.resources = this.experience1.resources;
        this.time = this.experience1.time;
        this.ocean = this.resources.items.ocean;
        this.actualOcean = this.ocean.scene;

        this.lerp = {
            currentX: 0,
            currentY: 0,
            targetX: 0,
            targetY: 0,
            ease: 0.1,
        };
        
        this.setModel();
        this.setModelLights();
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
        this.actualOcean.children.forEach((child) => {
            
            child.castShadow = true;
            child.receiveShadow = true;

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

        this.scene.add(this.actualOcean);

        // Gestion de la dimension de la scène
        this.actualOcean.scale.set(0.1, 0.1, 0.1);
        this.actualOcean.position.set(0,-1.5,0)
    }

    setModelLights() {
        this.actualOcean.children.forEach((child) => {
            
            if (child.name === "Lanterne_1") {
                child.children[0].material.color.set('#5b2344');
                this.lanternLight1 = new THREE.PointLight( 0xff279a, 0, 7);
                this.paramLightSpot(this.lanternLight1, child);
            }

            else if (child.name === "Lanterne_2") {
                child.children[0].material.color.set('#1a443c');             
                this.lanternLight2 = new THREE.PointLight( 0x00ffea, 0, 7);
                this.paramLightSpot(this.lanternLight2, child);
            }

            else if (child.name === "Lanterne_3") {
                child.children[0].material.color.set('#332b13');
                this.lanternLight3 = new THREE.PointLight( 0xff7b00, 0, 3);
                this.paramLightSpot(this.lanternLight3, child);
            }
        });

        
        
        this.scene.add(this.actualOcean);

        // Gestion de la dimension de la scène
        this.actualOcean.scale.set(0.1, 0.1, 0.1);
        this.actualOcean.position.set(0,-1.5,0)
    }


    switchThemeObjects(theme, object3d) {
        objects3d.forEach((child) => {
            if (theme === "light") {
                if (child.name === 'Sea_optimized') {
                    GSAP.to(child.material.color, {
                        r: 21 / 255,
                        g: 107 / 255,
                        b: 117 / 255,
                        duration: 2,
                    });
                    // child.material.color.set('#156b75');
                }
                else if (child.name === "Lanterne_1") {
                    GSAP.to(this.lanternLight1, {
                        intensity: 0,
                        duration: 2,
                    });
                    GSAP.to(child.children[0].material, {
                        emissiveIntensity: 0,
                        duration: 2,
                    });
                    // this.lanternLight1.intensity = 0;
                    // child.children[0].material.emissiveIntensity = 0;
                }
                else if (child.name === "Lanterne_2") {
                    GSAP.to(this.lanternLight2, {
                        intensity: 0,
                        duration: 2,
                    });
                    GSAP.to(child.children[0].material, {
                        emissiveIntensity: 0,
                        duration: 2,
                    });
                    // this.lanternLight2.intensity = 0;
                    // child.children[0].material.emissiveIntensity = 0;
                }
                else if (child.name === "Lanterne_3") {
                    GSAP.to(this.lanternLight3, {
                        intensity: 0,
                        duration: 2,
                    });
                    GSAP.to(child.children[0].material, {
                        emissiveIntensity: 0,
                        duration: 2,
                    });
                    // this.lanternLight3.intensity = 0;
                    // child.children[0].material.emissiveIntensity = 0;
                }
                
            } else {
                if (child.name === 'Sea_optimized') {
                    GSAP.to(child.material.color, {
                        r: 46 / 255,
                        g: 54 / 255,
                        b: 66 / 255,
                        duration: 2,
                    });
                    // child.material.color.set('#2e3642');
                }
                else if (child.name === "Lanterne_1") {
                    GSAP.to(this.lanternLight1, {
                        intensity: 5,
                        delay: 3,
                        duration: 5,
                        
                    });
                    GSAP.to(child.children[0].material, {
                        emissiveIntensity: 1,
                        delay: 3,
                        duration: 5,
                    });
                    GSAP.to(child.children[0].material.emissive, {
                        r: 255 / 255,
                        g: 94 / 255,
                        b: 188 / 255,
                        delay: 3,
                        duration: 5,
                    });
                    // this.lanternLight1.intensity = 5;
                    // child.children[0].material.emissiveIntensity = 1;
                    // child.children[0].material.emissive.set('#ff5ebc');
                }
                else if (child.name === "Lanterne_2") {
                    GSAP.to(this.lanternLight2, {
                        intensity: 5,
                        delay: 5.2,
                        duration: 5,
                    });
                    GSAP.to(child.children[0].material, {
                        emissiveIntensity: 1,
                        delay: 5.2,
                        duration: 5,
                    });
                    GSAP.to(child.children[0].material.emissive, {
                        r: 94 / 255,
                        g: 255 / 255,
                        b: 226 / 255,
                        delay: 5.2,
                        duration: 5,
                    });
                    // this.lanternLight2.intensity = 5;
                    // child.children[0].material.emissiveIntensity = 1;
                    // child.children[0].material.emissive.set('#5effe2');
                }
                else if (child.name === "Lanterne_3") {
                    GSAP.to(this.lanternLight3, {
                        intensity: 15,
                        delay: 5,
                        duration: 5,
                    });
                    GSAP.to(child.children[0].material, {
                        emissiveIntensity: 1,
                        delay: 5,
                        duration: 5,
                    });
                    GSAP.to(child.children[0].material.emissive, {
                        r: 255 / 255,
                        g: 223 / 255,
                        b: 94 / 255,
                        delay: 5,
                        duration: 5,
                    });
                    // this.lanternLight3.intensity = 15;
                    // child.children[0].material.emissiveIntensity = 1;
                    // child.children[0].material.emissive.set('#ffdf5e');
                }
            }
        })
            
    }

    
    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualOcean);

        this.ocean.animations.forEach((animation) => {
            this.animation = this.mixer.clipAction(animation)
            this.animation.play();
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
        this.actualOcean.rotation.y = this.lerp.currentX;

        this.lerp.currentY = GSAP.utils.interpolate(
            this.lerp.currentY,
            this.lerp.targetY,
            this.lerp.ease
        );
        this.actualOcean.rotation.x = this.lerp.currentY;
        this.actualOcean.rotation.z = this.lerp.currentY;

        this.mixer.update(this.time.delta * 0.001);
    }
}