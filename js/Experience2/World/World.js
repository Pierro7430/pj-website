import * as THREE from "three";
import Experience2 from "../Experience2.js";
import Logo from "./Logo.js";
import Environment from "./Environments.js";

import { EventEmitter } from "events";

export default class World {
    constructor() {
        this.experience2 = new Experience2();
        this.sizes = this.experience2.sizes;
        this.scene = this.experience2.scene;
        this.canvas = this.experience2.canvas;
        this.camera = this.experience2.camera;
        this.resources = this.experience2.resources;
        this.theme = this.experience2.theme;

        this.resources.on("ready", () => {
            this.environment = new Environment();
            this.logo = new Logo();
        });

        this.theme.on("switch", (theme) => {
            this.switchTheme(theme);
        });

    }

    switchTheme(theme) {
        if (this.environment) {
            this.environment.switchThemeLights(theme);
            this.logo.switchThemeObjects(theme);
        } 
    }

    resize() {

    }


    update() {
        if (this.logo) {
            this.logo.update();
        }
    }
}