const body = document.body;

// My button to switch Light-Mode
const activeLightMode = document.querySelector("#sun");

// My button to switch Dark-Mode
const activeDarkMode = document.querySelector("#moon");

// My button to switch Dark-Mode
const preferenceQuery = window.matchMedia("(prefers-color-scheme: light)");

const currentTheme = localStorage.getItem("theme");


const addLightMode = () => {
    body.classList.add("light-mode");
    activeLightMode.disabled = true;
    activeDarkMode.disabled = false;
    let theme = "light";
    localStorage.setItem("theme", theme);
};

const addDarkMode = () => {
    body.classList.remove("light-mode");
    activeDarkMode.disabled = true;
    activeLightMode.disabled = false;
    let theme = "dark";
    localStorage.setItem("theme", theme);
};


const toggleTheme = () => {
    !body.classList.contains("light-mode") ? addLightMode() : addDarkMode();
};
    

const checkPreferenceOS = () => {
    preferenceQuery.matches ? addLightMode() : addDarkMode();
};

const checkLocalStorage = () => {
    if (currentTheme == "light") {
        addLightMode();
    } else {
        addDarkMode();
    }
};

function init() {
    if (activeLightMode && activeDarkMode) {
        activeLightMode.addEventListener("click", toggleTheme);
        activeDarkMode.addEventListener("click", toggleTheme);
    }
    
    preferenceQuery.addEventListener("change", checkPreferenceOS);
    window.addEventListener("DOMContentLoaded", checkPreferenceOS);
    window.addEventListener("DOMContentLoaded", checkLocalStorage);
}

init();