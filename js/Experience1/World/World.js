import * as THREE from "three";
import Experience1 from "../Experience1.js";
import Ocean from "./Ocean.js";
import Environment from "./Environments.js";

import { EventEmitter } from "events";

export default class World {
    constructor() {
        this.experience1 = new Experience1();
        this.sizes = this.experience1.sizes;
        this.scene = this.experience1.scene;
        this.canvas = this.experience1.canvas;
        this.camera = this.experience1.camera;
        this.resources = this.experience1.resources;
        this.theme = this.experience1.theme;

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.ocean = new Ocean();
        });

        this.theme.on("switch", (theme) => {
            this.switchTheme(theme);
        });

    }

    switchTheme(theme) {
        if (this.environment) {
            this.environment.switchThemeLights(theme);
            this.ocean.switchThemeObjects(theme);
        } 
    }

    resize() {

    }


    update() {
        if (this.ocean) {
            this.ocean.update();
        }
    }
}