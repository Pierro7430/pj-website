import * as THREE from "three";
import Experience from "../Experience.js";

export default class Ocean {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.ocean = this.resources.items.ocean;
        this.actualOcean = this.ocean.scene;
        this.setModel();

        this.setAnimation();
    }

    setModel() {
        // Gestion des ombres des éléments qui composent l'avion
        this.actualOcean.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true;

            child.traverse((object) => {
                if (object.isMesh) {
                    object.frustumCulled = false;  
                }
            });

            if(child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            // if (child.name === "Sea") {
            //     // child.material = new THREE.MeshPhysicalMaterial();
            //     // child.material.color.set(0xA6FBFF);
            //     // child.material.roughness = 0;
            //     // child.material.ior = 3;
            //     // child.material.transmission = 0.9;
            //     // child.material.specular = 0.5;
            //     // child.material.opacity = 0;
            //     // child.material.rotation = - Math.PI / 2;
            //     // console.log(child);
            // }
            


        });
        this.scene.add(this.actualOcean);
        console.log(this.actualOcean);

        // Gestion de la dimension de l'avion
        this.actualOcean.scale.set(0.1, 0.1, 0.1);
        
        
        
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualOcean);

        this.ocean.animations.forEach((animation) => {
            this.animation = this.mixer.clipAction(animation)
            this.animation.play();
        })

       

        console.log(this.ocean);
    }



    resize() {

    }

    update() {
        this.mixer.update(this.time.delta * 0.001);
    }
}



  