import { EventEmitter } from "events";

export default class Theme extends EventEmitter {
    constructor() {
        super();

        this.theme = localStorage.getItem('theme');
        this.toggleButton = document.querySelector('#theme-toggle');


        this.setEventListeners();
    }

    setEventListeners() {
        this.toggleButton.addEventListener("click", () => {
            this.theme = this.theme === "light" ? "dark" : "light";

            this.emit("switch", this.theme);
        });
    }
}