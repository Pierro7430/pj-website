import * as THREE from "three";
import Experience from "../Experience.js";
import Ocean from "./Ocean.js";
import Environment from "./Environments.js";

export default class World {
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.ocean = new Ocean();
        });
    }



    resize() {

    }


    update() {
        if(this.ocean) {
            this.ocean.update();
        }
    }
}